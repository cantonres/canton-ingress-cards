// Ingress Mission Day 广州（2016.07.30）非遗主题收藏卡资料。
// 卡片名称与简介转录自卡片背面文字；romanizedName 用于检索与副标题展示。
// *En 字段为对应的英文展示文案，由 i18n 层按当前语言选择。
const cardInfo = {
  '粤剧': {
    romanizedName: 'YUE JU',
    nameEn: 'Cantonese Opera',
    category: '传统戏剧',
    categoryEn: 'Traditional Opera',
    region: '国家级非遗',
    regionEn: 'National Intangible Cultural Heritage',
    introduction: '粤剧源自南戏，自明朝嘉靖年间开始在广东、广西出现，是糅合唱做念打、乐师配乐、戏台服饰、抽象形体等的表演艺术，是广东省最大的地方戏曲剧种。2006 年 5 月列入第一批国家级非物质文化遗产名录，2009 年列入人类非物质文化遗产名录。',
    introductionEn: 'Originating from southern Chinese opera, Cantonese Opera appeared in Guangdong and Guangxi during the Ming dynasty. It blends singing, acting, speech and acrobatics with live music, costume and stylised movement, and was inscribed on UNESCO’s Intangible Cultural Heritage list in 2009.',
  },
  '饮茶 / 早茶': {
    romanizedName: 'YIN CHA',
    nameEn: 'Dim Sum / Morning Tea',
    category: '饮食文化',
    categoryEn: 'Food Culture',
    region: '广府习俗',
    regionEn: 'Cantonese Custom',
    introduction: '饮茶是广府人的传统，主要包括喝茶和吃点心，自清朝开始在广州盛行，而后在广东乃至世界各地传播，成为粤菜饮食文化中最具代表性的部分。粤语中形容饮茶为“一盅两件”（一盅茶加两件点心）。',
    introductionEn: 'Morning tea with dim sum is a cherished Cantonese tradition of drinking tea alongside small plates. Popularised in Qing-dynasty Guangzhou, it spread worldwide and became the signature of Cantonese cuisine — locally described as “one pot, two pieces”.',
  },
  '行花街 / 行花市': {
    romanizedName: 'XING HUA JIE',
    nameEn: 'Flower Market',
    category: '传统民俗',
    categoryEn: 'Folk Custom',
    region: '省级非遗',
    regionEn: 'Provincial Intangible Cultural Heritage',
    introduction: '广州花市起源于明朝万历年间，后逐渐发展为一年一度的迎春花市。每年春节前三天至除夕，广州各区均会设立迎春花市，“行花街”也成为了广州人迎接春节的习俗。2007 年 6 月，广州花市入选广东省第二批非物质文化遗产。',
    introductionEn: 'Guangzhou’s flower market dates back to the Ming dynasty and grew into an annual Lunar New Year fair. In the days before the festival, every district sets up a market, and “walking the flower street” has become a local custom for welcoming the new year.',
  },
  '扒龙舟': {
    romanizedName: 'PA LONG ZHOU',
    nameEn: 'Dragon Boat Racing',
    category: '传统民俗',
    categoryEn: 'Folk Custom',
    region: '端午习俗',
    regionEn: 'Dragon Boat Festival Custom',
    introduction: '每逢端午节，广州各地的村落都会举办热闹的扒龙舟比赛。这一中国传统端午节习俗活动，目前已经发展成了一项闻名世界的水上运动项目。在 2010 年广州主办的亚洲运动会上，扒龙舟首次成为了正式比赛项目。',
    introductionEn: 'Every Dragon Boat Festival, villages across Guangzhou hold lively dragon boat races. Once a traditional festival custom, it has grown into a world-famous water sport and became an official event at the 2010 Asian Games held in Guangzhou.',
  },
  '飘色': {
    romanizedName: 'PIAO SE',
    nameEn: 'Floating Pageant',
    category: '传统民俗',
    categoryEn: 'Folk Custom',
    region: '民间艺术',
    regionEn: 'Folk Art',
    introduction: '飘色是一种融戏剧、魔术、杂技、音乐、舞蹈等于一体的汉族传统民俗艺术，起源于明末清初的广东。演员们站在被称为“色柜”的小舞台上，通过经过精心伪装的钢枝凌空而立，利用巧妙的力学原理，营造出“飘”的效果。',
    introductionEn: 'Floating Pageant is a folk art blending drama, magic, acrobatics, music and dance, originating in Guangdong in the late Ming and early Qing periods. Performers stand on a small decorated stage, supported by concealed metal braces that create the illusion of floating in mid-air.',
  },
  '粤绣': {
    romanizedName: 'YUE XIU',
    nameEn: 'Cantonese Embroidery',
    category: '传统工艺',
    categoryEn: 'Traditional Craft',
    region: '国家级非遗',
    regionEn: 'National Intangible Cultural Heritage',
    introduction: '粤绣是国家级非物质文化遗产，包括广绣与潮绣两派，属中国四大民间刺绣之一。形成于唐，成熟于明清，至今已有一千多年的历史。粤绣最大的特点就是布局满，往往少有空隙，显得热闹而紧凑。绣工多为男性，世所罕见。',
    introductionEn: 'Cantonese Embroidery covers the Guangzhou and Chaozhou schools and ranks among China’s four great folk embroidery traditions. Developed over a thousand years, it is known for dense, lively compositions with little empty space and is unusually often worked by male artisans.',
  },
  '广彩': {
    romanizedName: 'GUANG CAI',
    nameEn: 'Canton Famille Rose',
    category: '传统工艺',
    categoryEn: 'Traditional Craft',
    region: '国家级非遗',
    regionEn: 'National Intangible Cultural Heritage',
    introduction: '广彩，全称“广州织金彩瓷”，是指在各种白瓷器皿上彩绘并烧制而成的工艺品，以色彩绚丽、金碧辉煌、构图严谨、绘工精细而著称，为中国四大名瓷之一，已有 300 多年的历史。',
    introductionEn: 'Canton Famille Rose, literally “Guangzhou gold-woven polychrome porcelain”, is hand-painted and fired on white ware. Renowned for brilliant colours, gold decoration, rigorous composition and fine detail, it is one of China’s four great porcelains with over 300 years of history.',
  },
  '灰塑': {
    romanizedName: 'HUI SU',
    nameEn: 'Lime Sculpture',
    category: '传统工艺',
    categoryEn: 'Traditional Craft',
    region: '国家级非遗',
    regionEn: 'National Intangible Cultural Heritage',
    introduction: '灰塑，古称灰批，是岭南地区汉族传统建筑装饰工艺。材料以石灰为主，其作品主要依附于建筑墙壁上沿和屋脊上，或是其他建筑工艺上。2008 年，灰塑列入第二批国家级非物质文化遗产名录。',
    introductionEn: 'Lime Sculpture is a traditional Lingnan architectural decoration craft made mainly from lime. Artisans work along wall tops and roof ridges to create vivid reliefs; it was added to China’s national intangible cultural heritage list in 2008.',
  },
  '骑楼': {
    romanizedName: 'QI LOU',
    nameEn: 'Arcade Buildings',
    category: '建筑文化',
    categoryEn: 'Architectural Culture',
    region: '广州风貌',
    regionEn: 'Guangzhou Streetscape',
    introduction: '骑楼是一种外廊式建筑设计。建筑物一楼临近街道的部分建成行人走廊，走廊上方则为二楼的楼层，犹如二楼“骑”在一楼之上，故称为“骑楼”。广州市区内现存的骑楼街总计有 36 条，长度达 20 多公里，集中分布在老城区里。',
    introductionEn: 'Arcade Buildings (qilou) are covered walkways whose upper storeys “ride” above a shaded ground-floor colonnade. Guangzhou preserves 36 such arcade streets stretching over 20 kilometres, mostly concentrated in its old city.',
  },
  '榄雕': {
    romanizedName: 'LAN DIAO',
    nameEn: 'Olive Pit Carving',
    category: '传统工艺',
    categoryEn: 'Traditional Craft',
    region: '国家级非遗',
    regionEn: 'National Intangible Cultural Heritage',
    introduction: '广州榄雕属立体微雕类，材料为乌榄核，技法以浮雕、圆雕、镂空雕为主，制作时不着意人工上色，而注重保持榄核的天然原色，显得分外古朴典雅。2008 年，广州榄雕列入第二批国家级非物质文化遗产名录。',
    introductionEn: 'Guangzhou Olive Pit Carving is a miniature sculpture art carved from olive stones using relief, round and openwork techniques. Leaving the pit’s natural colour untouched gives each piece a rustic, elegant look; it entered the national heritage list in 2008.',
  },
  '舞狮': {
    romanizedName: 'WU SHI',
    nameEn: 'Lion Dance',
    category: '传统民俗',
    categoryEn: 'Folk Custom',
    region: '民间艺术',
    regionEn: 'Folk Art',
    introduction: '舞狮是我国优秀的民间艺术之一，有南北之分。南狮流行于广府文化地区，与北狮注重灵活不同，南狮注重于展现狮子的威猛，又称醒狮。狮子由彩布条制作而成，每头狮子由两位表演者合作，一人舞头一人舞尾。',
    introductionEn: 'Lion Dance is a celebrated Chinese folk art with northern and southern styles. The southern lion, popular in Cantonese culture, stresses power and is also called the “awakening lion”; two performers share each brightly coloured costume, one leading the head and one the tail.',
  },
  '煲汤': {
    romanizedName: 'BAO TANG',
    nameEn: 'Double-boiled Soup',
    category: '饮食文化',
    categoryEn: 'Food Culture',
    region: '粤菜特色',
    regionEn: 'Cantonese Cuisine',
    introduction: '煲汤，即老火汤，是粤菜的特色之一。由于岭南地区天气炎热潮湿，根据气候变化，取不同种类的原材料，花费数小时熬制而成的老火靓汤既滋补又美味，深受广府人的欢迎。身处异乡的他们，必定时常怀念妈妈煲的“老火靓汤”。',
    introductionEn: 'Double-boiled soup, or “old-fire soup”, is a hallmark of Cantonese cuisine. In Lingnan’s hot, humid climate, ingredients are simmered for hours into a nourishing, flavourful broth — a taste of home that Cantonese people far from home fondly remember.',
  },
  '南国 · 广州': {
    romanizedName: 'GUANGZHOU',
    nameEn: 'South China · Guangzhou',
    category: '城市序卡',
    categoryEn: 'City Prologue',
    region: 'MISSION DAY',
    regionEn: 'MISSION DAY',
    introduction: '广州，又称羊城、花城，为广东省省会，是华南地区的经济、文化、科技、教育中心，交通枢纽，中国南方最大的、历史最悠久的对外通商口岸。广州有美景，也有美食，既有岭南风格的古建筑，也有繁华的中心商务区。',
    introductionEn: 'Guangzhou, also known as the City of Rams and the City of Flowers, is the capital of Guangdong and the economic, cultural and transport hub of South China, as well as its oldest and largest trading port. It pairs scenic beauty and celebrated food with historic Lingnan architecture and a thriving central business district.',
  },
}

// 与 hd/01.webp ~ 13.webp 一一对应
const order = [
  '粤剧', '饮茶 / 早茶', '行花街 / 行花市', '扒龙舟', '飘色', '粤绣', '广彩',
  '灰塑', '骑楼', '榄雕', '舞狮', '煲汤', '南国 · 广州',
]

export const cards = order.map((name, index) => {
  const info = cardInfo[name]
  const number = index + 1
  const fileName = String(number).padStart(2, '0')
  return {
    id: String(number).padStart(3, '0'),
    displayId: fileName,
    number,
    name,
    ...info,
    // 类别/属性是卡片的类型元信息，不是文化主题。
    // 本批 13 张均为 Mission Day 城市卡；未来新增 Agent / Biocard 时，
    // 只需在对应卡片数据里设置 kind / kindEn / subtype / subtypeEn 即可覆盖。
    nickname: info.kind ?? 'Mission Day',
    star: info.subtype ?? '城市卡',
    category: info.kind ?? 'Mission Day',
    categoryEn: info.kindEn ?? 'Mission Day',
    region: info.subtype ?? '城市卡',
    regionEn: info.subtypeEn ?? 'City Card',
    theme: info.category,
    themeEn: info.categoryEn,
    themeRegion: info.region,
    themeRegionEn: info.regionEn,
    images: {
      source: `${import.meta.env.BASE_URL}assets/heritage/${fileName}.webp`,
      layout: 'heritage',
    },
  }
})
