"""
Ingress 广州非遗卡：低清实拍原图 -> 高清 WebP 重制脚本。

流程：保边降噪 -> FSRCNN x2 超分 -> 温和 USM 锐化 -> 正反面等高横向合并 -> WebP。
用法：
    python tools/build_cards.py <原图目录> <输出目录> [合并后目标高度，0 表示不缩放]

依赖：
    pip install opencv-contrib-python==4.10.0.84 numpy
模型（FSRCNN_x2.pb，约 39KB）首次运行会自动从 GitHub 下载到 models/：
    https://github.com/Saafke/FSRCNN_Tensorflow/raw/master/models/FSRCNN_x2.pb

原图命名约定：<名称>.jpg 为正面，<名称> (2).jpg 为背面，成对出现。
输出按编号 01.webp、02.webp ...，正面在左、背面在右，各占 50% 宽。
"""
import glob
import os
import sys
import urllib.request

import cv2
import numpy as np
from cv2 import dnn_superres

MODEL_URL = "https://raw.githubusercontent.com/Saafke/FSRCNN_Tensorflow/master/models/FSRCNN_x2.pb"
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")


def ensure_model():
    os.makedirs(MODEL_DIR, exist_ok=True)
    path = os.path.join(MODEL_DIR, "FSRCNN_x2.pb")
    if not os.path.exists(path) or os.path.getsize(path) < 10000:
        print("下载 FSRCNN_x2 模型…")
        urllib.request.urlretrieve(MODEL_URL, path)
    return path


def restore(sr, path):
    """单面重制：保边降噪 -> 超分 2x -> 温和锐化。"""
    img = cv2.imread(path, cv2.IMREAD_COLOR)
    den = cv2.bilateralFilter(img, d=5, sigmaColor=18, sigmaSpace=18)
    up = sr.upsample(den)
    blur = cv2.GaussianBlur(up, (0, 0), 1.6)
    return cv2.addWeighted(up, 1.35, blur, -0.35, 0)


def main():
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    src_dir, out_dir = sys.argv[1], sys.argv[2]
    target_h = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    os.makedirs(out_dir, exist_ok=True)

    sr = dnn_superres.DnnSuperResImpl_create()
    sr.readModel(ensure_model())
    sr.setModel("fsrcnn", 2)

    fronts = sorted(f for f in glob.glob(os.path.join(src_dir, "*.jpg")) if "(2)" not in f)
    print(f"共 {len(fronts)} 对卡片")
    for idx, fp in enumerate(fronts, 1):
        bp = fp[:-4] + " (2).jpg"
        front, back = restore(sr, fp), restore(sr, bp)
        h = min(front.shape[0], back.shape[0])
        front = cv2.resize(front, (round(front.shape[1] * h / front.shape[0]), h), interpolation=cv2.INTER_AREA)
        back = cv2.resize(back, (round(back.shape[1] * h / back.shape[0]), h), interpolation=cv2.INTER_AREA)
        if target_h and h != target_h:
            front = cv2.resize(front, (round(front.shape[1] * target_h / h), target_h), interpolation=cv2.INTER_AREA)
            back = cv2.resize(back, (round(back.shape[1] * target_h / h), target_h), interpolation=cv2.INTER_AREA)
        merged = np.hstack([front, back])
        out = os.path.join(out_dir, f"{idx:02d}.webp")
        cv2.imwrite(out, merged, [int(cv2.IMWRITE_WEBP_QUALITY), 88])
        print(f"[{idx:02d}] {os.path.basename(out)}  {merged.shape[1]}x{merged.shape[0]}  "
              f"{os.path.getsize(out)/1024:.0f}KB")


if __name__ == "__main__":
    main()
