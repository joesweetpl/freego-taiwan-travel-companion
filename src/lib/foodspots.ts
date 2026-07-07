// 每週更新：IG／小紅書網路爆紅美食與咖啡廳
// 各區域精選 3 間。由每週排程重新搜尋後更新本檔。

export const foodUpdatedAt = "2026-07-07";

export type FoodRegionId =
  | "taipei"
  | "yilan"
  | "taoyuan"
  | "taichung"
  | "chiayi"
  | "tainan"
  | "kaohsiung"
  | "hualien";

export const foodRegions: Array<{ id: FoodRegionId; zh: string; en: string }> =
  [
    { id: "taipei", zh: "台北", en: "Taipei" },
    { id: "yilan", zh: "宜蘭", en: "Yilan" },
    { id: "taoyuan", zh: "桃園", en: "Taoyuan" },
    { id: "taichung", zh: "台中", en: "Taichung" },
    { id: "chiayi", zh: "嘉義", en: "Chiayi" },
    { id: "tainan", zh: "台南", en: "Tainan" },
    { id: "kaohsiung", zh: "高雄", en: "Kaohsiung" },
    { id: "hualien", zh: "花蓮", en: "Hualien" }
  ];

export type FoodSpot = {
  id: string;
  region: FoodRegionId;
  emoji: string;
  nameZh: string;
  nameEn: string;
  tagZh: string;
  tagEn: string;
  descZh: string;
  descEn: string;
};

export const foodSpots: FoodSpot[] = [
  // 台北
  {
    id: "beanu",
    region: "taipei",
    emoji: "🥣",
    nameZh: "BEAN U（松菸大巨蛋）",
    nameEn: "BEAN U (Songshan)",
    tagZh: "蔬食咖啡廳",
    tagEn: "Vegan Café",
    descZh: "獨創豆奶優格碗＋純白系空間，IG 洗版中的不限時網美咖啡廳。",
    descEn: "Signature soy yogurt bowls in a minimalist space — all over IG right now."
  },
  {
    id: "riceshine",
    region: "taipei",
    emoji: "🏮",
    nameZh: "稻舍食館（大稻埕）",
    nameEn: "Rice & Shine (Dadaocheng)",
    tagZh: "老宅台菜",
    tagEn: "Heritage Taiwanese",
    descZh: "百年紅磚米行老宅改建的排隊食館，復古巴洛克建築怎麼拍都美。",
    descEn: "A century-old rice shop turned restaurant — baroque brick beauty with a queue to match."
  },
  {
    id: "coffeesind",
    region: "taipei",
    emoji: "☕",
    nameZh: "Coffee Sind",
    nameEn: "Coffee Sind",
    tagZh: "世界百大咖啡館",
    tagEn: "World's Top 100 Café",
    descZh: "2026 世界百大咖啡館台灣入選店，甜點與手沖都是水準之上。",
    descEn: "Named one of the World's 100 Best Cafés 2026 — exceptional pour-overs and desserts."
  },
  // 宜蘭
  {
    id: "amaze",
    region: "yilan",
    emoji: "🌈",
    nameZh: "兔子迷宮 A.maze（員山）",
    nameEn: "A.maze Rabbit Café (Yuanshan)",
    tagZh: "景觀咖啡",
    tagEn: "View Café",
    descZh: "粉紅天空步道俯瞰蘭陽平原夜景，宜蘭打卡率最高的景觀餐廳。",
    descEn: "Pink skywalk over the Lanyang Plain — Yilan's most photographed view café."
  },
  {
    id: "maibashi",
    region: "yilan",
    emoji: "🏚️",
    nameZh: "賣捌所（宜蘭市）",
    nameEn: "Maibashi House (Yilan City)",
    tagZh: "日式老宅咖啡",
    tagEn: "Japanese-Era Café",
    descZh: "日治時期菸酒配售所改建，老屋控與文青的宜蘭必訪。",
    descEn: "A Japanese-era tobacco depot reborn as a café — a must for heritage lovers."
  },
  {
    id: "baishui",
    region: "yilan",
    emoji: "🍮",
    nameZh: "白水豆花（礁溪）",
    nameEn: "Baishui Douhua (Jiaoxi)",
    tagZh: "手作豆花",
    tagEn: "Artisan Tofu Pudding",
    descZh: "鹽滷豆花配麥芽花生糖粉，簡單卻讓人排隊也甘願的礁溪名店。",
    descEn: "Nigari tofu pudding with peanut brittle shavings — simple, and worth the line."
  },
  // 桃園
  {
    id: "butiaoshi",
    region: "taoyuan",
    emoji: "🥐",
    nameZh: "不挑食 butiaoshi（青埔）",
    nameEn: "Butiaoshi (Qingpu)",
    tagZh: "韓系早午餐",
    tagEn: "Korean-Style Brunch",
    descZh: "青埔特區新開韓風木質純白咖啡廳，早午餐盤擺盤超好拍。",
    descEn: "New Korean-style brunch café in Qingpu — wood-and-white interiors made for photos."
  },
  {
    id: "ahanthai",
    region: "taoyuan",
    emoji: "🌶️",
    nameZh: "阿含 Thai（忠貞市場）",
    nameEn: "Ahan Thai (Zhongzhen Market)",
    tagZh: "排隊泰式",
    tagEn: "Queue-Worthy Thai",
    descZh: "不接受訂位的市場泰式名店，開店前就排隊，酸辣道地。",
    descEn: "No reservations, lines before opening — fiercely authentic Thai in a market setting."
  },
  {
    id: "forestlake",
    region: "taoyuan",
    emoji: "🌲",
    nameZh: "森林水岸咖啡館（石門水庫）",
    nameEn: "Forest Waterfront Café (Shimen)",
    tagZh: "森林景觀咖啡",
    tagEn: "Forest View Café",
    descZh: "俯瞰石門水庫峽谷與新溪口吊橋，桃園最遼闊的咖啡視野。",
    descEn: "Overlooks the Shimen Reservoir gorge and suspension bridge — Taoyuan's widest café view."
  },
  // 台中
  {
    id: "mamonaku",
    region: "taichung",
    emoji: "🚃",
    nameZh: "Mamonaku Cafe（台中舊站）",
    nameEn: "Mamonaku Cafe (Old Station)",
    tagZh: "火車車廂咖啡",
    tagEn: "Train Car Café",
    descZh: "EMU100 自強號車廂改造，停靠舊站月台，鐵道迷與攝影控暴動。",
    descEn: "A retired express train car parked at the old platform — railfans' dream café."
  },
  {
    id: "bubuart",
    region: "taichung",
    emoji: "🎨",
    nameZh: "橘子布藝術咖啡",
    nameEn: "BUBU Art Café",
    tagZh: "藝術吐司",
    tagEn: "Art Toast",
    descZh: "把世界名畫做成可以吃的吐司，視覺系下午茶代表。",
    descEn: "World-famous paintings recreated on toast — edible art for your feed."
  },
  {
    id: "miyahara",
    region: "taichung",
    emoji: "🍦",
    nameZh: "宮原眼科",
    nameEn: "Miyahara",
    tagZh: "經典冰淇淋",
    tagEn: "Iconic Ice Cream",
    descZh: "日治眼科診所變身華麗甜點殿堂，冰淇淋與鳳梨酥的必訪地標。",
    descEn: "A Japanese-era eye clinic turned dessert palace — Taichung's essential stop."
  },
  // 嘉義
  {
    id: "linsm",
    region: "chiayi",
    emoji: "🐟",
    nameZh: "林聰明沙鍋魚頭",
    nameEn: "Lin Cong Ming Fish Head",
    tagZh: "排隊小吃",
    tagEn: "Legendary Casserole",
    descZh: "嘉義最強排隊王，沙鍋菜配鮮魚頭，網路聲量歷久不衰。",
    descEn: "Chiayi's longest queue — milkfish head casserole with cult status online."
  },
  {
    id: "frostair",
    region: "chiayi",
    emoji: "🤍",
    nameZh: "霜空咖啡",
    nameEn: "Frost Air Café",
    tagZh: "純白系咖啡廳",
    tagEn: "Minimal White Café",
    descZh: "極簡純白空間配季節甜點，嘉義文青咖啡代表作。",
    descEn: "Pure-white minimalism and seasonal desserts — Chiayi's most artful café."
  },
  {
    id: "taocheng",
    region: "chiayi",
    emoji: "🍧",
    nameZh: "桃城豆花",
    nameEn: "Taocheng Douhua",
    tagZh: "老宅豆花",
    tagEn: "Heritage Tofu Pudding",
    descZh: "老宅裡的手作豆花與復古花磚，甜點與空間都值得慢慢拍。",
    descEn: "Handmade tofu pudding in a vintage-tiled old house — dessert and decor both shine."
  },
  // 台南
  {
    id: "shuangsheng",
    region: "tainan",
    emoji: "🥤",
    nameZh: "双生綠豆沙牛奶",
    nameEn: "Shuangsheng Mung Bean Milk",
    tagZh: "排隊飲品",
    tagEn: "Viral Drink",
    descZh: "要抽號碼牌的綠豆沙牛奶，台南飲料界的頂流。",
    descEn: "Take a number for this mung bean smoothie — Tainan's most viral drink."
  },
  {
    id: "ninao",
    region: "tainan",
    emoji: "🍦",
    nameZh: "蜷尾家甘味處（正興街）",
    nameEn: "NINAO Gelato (Zhengxing St)",
    tagZh: "散步甜食",
    tagEn: "Artisan Gelato",
    descZh: "帶起正興街散步甜食風潮的霜淇淋名店，口味天天輪替。",
    descEn: "The soft-serve pioneer of Zhengxing Street, with rotating daily flavors."
  },
  {
    id: "fusheng",
    region: "tainan",
    emoji: "🍚",
    nameZh: "富盛號碗粿（國華街）",
    nameEn: "Fusheng Wagui (Guohua St)",
    tagZh: "百年小吃",
    tagEn: "Century-Old Snack",
    descZh: "國華街小吃巡禮起點，碗粿＋魚羹是台南人的日常儀式。",
    descEn: "The starting point of any Guohua Street food crawl — savory rice pudding perfection."
  },
  // 高雄
  {
    id: "keepcoffee",
    region: "kaohsiung",
    emoji: "🏆",
    nameZh: "Keep Coffee Roastery",
    nameEn: "Keep Coffee Roastery",
    tagZh: "世界百大咖啡館",
    tagEn: "World's Top 50 Café",
    descZh: "2026 世界百大咖啡館第 46 名，高雄自家烘焙的驕傲。",
    descEn: "No. 46 on the World's 100 Best Cafés 2026 — Kaohsiung's roasting pride."
  },
  {
    id: "huada",
    region: "kaohsiung",
    emoji: "🧋",
    nameZh: "樺達奶茶（鹽埕總店）",
    nameEn: "Huada Milk Tea (Yancheng)",
    tagZh: "手搖始祖",
    tagEn: "OG Milk Tea",
    descZh: "南台灣奶茶始祖總店，觀光客與在地人都排的經典。",
    descEn: "The original southern-Taiwan milk tea shop — locals and tourists queue alike."
  },
  {
    id: "popoice",
    region: "kaohsiung",
    emoji: "🍧",
    nameZh: "高雄婆婆冰（鹽埕）",
    nameEn: "Popo Ice (Yancheng)",
    tagZh: "老字號冰品",
    tagEn: "Classic Shaved Ice",
    descZh: "近百年冰果室，新鮮水果切盤與招牌李鹹冰的懷舊滋味。",
    descEn: "A near-century-old ice parlor famous for fresh fruit platters and preserved plum ice."
  },
  // 花蓮
  {
    id: "langhuawan",
    region: "hualien",
    emoji: "🍨",
    nameZh: "浪花丸 かき氷",
    nameEn: "Namihana Kakigori",
    tagZh: "日式刨冰",
    tagEn: "Japanese Shaved Ice",
    descZh: "海洋系日式刨冰，藍白漸層配可愛造型，花蓮 IG 屠版常客。",
    descEn: "Ocean-inspired kakigori in dreamy blue gradients — a Hualien IG staple."
  },
  {
    id: "giocare",
    region: "hualien",
    emoji: "🐈",
    nameZh: "Giocare 義式手沖咖啡",
    nameEn: "Giocare Coffee",
    tagZh: "庭院老宅咖啡",
    tagEn: "Garden House Café",
    descZh: "老屋庭院、貓店長與手沖咖啡，花蓮慢步調的完美縮影。",
    descEn: "Old house, garden seats, resident cats, and pour-over coffee — Hualien in a nutshell."
  },
  {
    id: "gongzheng",
    region: "hualien",
    emoji: "🥟",
    nameZh: "公正包子",
    nameEn: "Gongzheng Baozi",
    tagZh: "排隊小吃",
    tagEn: "Queue-Worthy Buns",
    descZh: "24 小時營業的花蓮傳奇小籠包，銅板價征服所有旅人。",
    descEn: "Hualien's legendary 24-hour steamed buns at pocket-change prices."
  }
];
