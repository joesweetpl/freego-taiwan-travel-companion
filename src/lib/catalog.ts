// FreeGO 行程型錄與報價引擎
// 車型與價格依車隊提供之正式價目表（8 小時制）。

export type VehicleId =
  | "suv"
  | "mpv7"
  | "mpv9"
  | "mpvlux"
  | "vipvan"
  | "minibus";
export type Region = "north" | "central" | "south" | "east" | "island";

export type Vehicle = {
  id: VehicleId;
  nameZh: string;
  nameEn: string;
  emoji: string;
  maxPax: number;
  luggage: number;
  dayRate: number; // NT$ / 8 小時
  overtime: number; // NT$ / 小時
  tagZh?: string;
  tagEn?: string;
  descZh: string;
  descEn: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "suv",
    nameZh: "豪華 SUV",
    nameEn: "Luxury SUV",
    emoji: "🚙",
    maxPax: 4,
    luggage: 4,
    dayRate: 5500,
    overtime: 400,
    descZh: "小家庭與情侶首選，乘坐舒適、上下車輕鬆。",
    descEn: "Ideal for couples and small families — comfortable and easy to board."
  },
  {
    id: "mpv7",
    nameZh: "七人座 MPV",
    nameEn: "7-Seater MPV",
    emoji: "🚐",
    maxPax: 6,
    luggage: 4,
    dayRate: 6000,
    overtime: 500,
    descZh: "空間與價格的黃金平衡，家庭出遊熱門款。",
    descEn: "The sweet spot of space and value — a family favorite."
  },
  {
    id: "mpv9",
    nameZh: "九人座 MPV",
    nameEn: "9-Seater MPV",
    emoji: "🚌",
    maxPax: 8,
    luggage: 7,
    dayRate: 6500,
    overtime: 600,
    descZh: "大空間大行李量，多人同遊最實惠的選擇。",
    descEn: "Big space, big luggage capacity — best value for groups."
  },
  {
    id: "mpvlux",
    nameZh: "豪華版 MPV",
    nameEn: "Luxury MPV",
    emoji: "✨",
    maxPax: 8,
    luggage: 7,
    dayRate: 7000,
    overtime: 700,
    descZh: "升級內裝與乘坐質感，商務接待有面子。",
    descEn: "Upgraded cabin and ride quality — impressive for business hosting."
  },
  {
    id: "vipvan",
    nameZh: "明星版保母車",
    nameEn: "VIP Celebrity Van",
    emoji: "🌟",
    maxPax: 8,
    luggage: 7,
    dayRate: 14000,
    overtime: 1300,
    tagZh: "明星首選",
    tagEn: "Celebrity Choice",
    descZh: "獨立座椅、頭等艙級隱私與舒適，藝人與貴賓指定款。",
    descEn: "Captain seats and first-class privacy — the choice of celebrities and VIPs."
  },
  {
    id: "minibus",
    nameZh: "中型巴士",
    nameEn: "Mini Bus",
    emoji: "🚍",
    maxPax: 20,
    luggage: 15,
    dayRate: 14000,
    overtime: 1300,
    descZh: "適合團體旅遊、企業出遊與大型接待。",
    descEn: "Perfect for group tours, company trips, and large receptions."
  }
];

export type TourPackage = {
  id: string;
  region: Region;
  days: number;
  hoursPerDay: number;
  emoji: string;
  titleZh: string;
  titleEn: string;
  highlightsZh: string[];
  highlightsEn: string[];
  descZh: string;
  descEn: string;
  popular?: boolean;
};

export const regionsMeta: Record<Region, { zh: string; en: string }> = {
  north: { zh: "北部", en: "North" },
  central: { zh: "中部", en: "Central" },
  south: { zh: "南部", en: "South" },
  east: { zh: "東部", en: "East" },
  island: { zh: "環島", en: "Round Island" }
};

export const packages: TourPackage[] = [
  {
    id: "yehliu-jiufen-shifen",
    region: "north",
    days: 1,
    hoursPerDay: 8,
    emoji: "⛰️",
    titleZh: "野柳・九份・十分 經典一日遊",
    titleEn: "Yehliu, Jiufen & Shifen Classic Day Tour",
    highlightsZh: ["野柳女王頭", "九份老街茶香", "十分瀑布", "平溪放天燈"],
    highlightsEn: [
      "Yehliu Queen's Head",
      "Jiufen Old Street",
      "Shifen Waterfall",
      "Sky lantern at Pingxi"
    ],
    descZh:
      "北台灣最經典路線：奇岩海岸、山城茶樓、瀑布與天燈一次收齊，第一次來台灣必走。",
    descEn:
      "The most classic route in northern Taiwan — sea rocks, mountain teahouses, waterfalls, and sky lanterns in one day.",
    popular: true
  },
  {
    id: "taipei-city-classic",
    region: "north",
    days: 1,
    hoursPerDay: 8,
    emoji: "🏙️",
    titleZh: "台北市區 文化經典一日遊",
    titleEn: "Taipei City Culture Day Tour",
    highlightsZh: ["國立故宮博物院", "龍山寺", "台北101", "大稻埕夕陽", "士林夜市"],
    highlightsEn: [
      "National Palace Museum",
      "Longshan Temple",
      "Taipei 101",
      "Dadaocheng sunset",
      "Shilin Night Market"
    ],
    descZh:
      "一天看懂台北：從故宮國寶到廟宇香火，傍晚在大稻埕看夕陽，晚上夜市收尾。",
    descEn:
      "Taipei in one day — imperial treasures, temples, riverside sunset, and a night market finale."
  },
  {
    id: "yangmingshan-beitou",
    region: "north",
    days: 1,
    hoursPerDay: 8,
    emoji: "♨️",
    titleZh: "陽明山・北投溫泉 療癒一日遊",
    titleEn: "Yangmingshan & Beitou Hot Spring Day Tour",
    highlightsZh: ["陽明山國家公園", "小油坑", "北投地熱谷", "溫泉體驗", "北投圖書館"],
    highlightsEn: [
      "Yangmingshan National Park",
      "Xiaoyoukeng",
      "Beitou Thermal Valley",
      "Hot spring bath",
      "Beitou Library"
    ],
    descZh: "山嵐、硫磺谷與百年溫泉鄉，適合想放慢腳步的旅人與長輩同行。",
    descEn:
      "Mountain mist, sulfur valleys, and a century-old hot spring town — perfect for a slower pace."
  },
  {
    id: "north-coast",
    region: "north",
    days: 1,
    hoursPerDay: 8,
    emoji: "🌊",
    titleZh: "北海岸 山海一日遊",
    titleEn: "North Coast Scenic Day Tour",
    highlightsZh: ["金山老街", "燭台雙嶼", "老梅綠石槽", "富貴角燈塔", "海景咖啡"],
    highlightsEn: [
      "Jinshan Old Street",
      "Candlestick Islets",
      "Laomei Green Reef",
      "Fuguijiao Lighthouse",
      "Seaside café"
    ],
    descZh: "沿著台灣最美海岸線慢行，海景咖啡配海鮮餐廳，拍照吃飯都滿足。",
    descEn:
      "Cruise Taiwan's most beautiful coastline with sea-view cafés and fresh seafood."
  },
  {
    id: "yilan-day",
    region: "north",
    days: 1,
    hoursPerDay: 8,
    emoji: "🚂",
    titleZh: "台北出發 宜蘭一日遊",
    titleEn: "Yilan Day Tour from Taipei",
    highlightsZh: ["蘭陽博物館", "幾米公園", "梅花湖", "羅東夜市", "礁溪溫泉"],
    highlightsEn: [
      "Lanyang Museum",
      "Jimmy Park",
      "Meihua Lake",
      "Luodong Night Market",
      "Jiaoxi hot springs"
    ],
    descZh: "雪隧直達蘭陽平原：龜山島海景、童話公園與最好逛的羅東夜市。",
    descEn:
      "Through the tunnel to Yilan — Guishan Island views, storybook parks, and Luodong Night Market."
  },
  {
    id: "sun-moon-lake",
    region: "central",
    days: 1,
    hoursPerDay: 8,
    emoji: "🛶",
    titleZh: "台中・日月潭 湖光一日遊",
    titleEn: "Taichung & Sun Moon Lake Day Tour",
    highlightsZh: ["日月潭遊湖", "向山遊客中心", "伊達邵老街", "高美濕地夕陽"],
    highlightsEn: [
      "Sun Moon Lake cruise",
      "Xiangshan Visitor Center",
      "Ita Thao Old Street",
      "Gaomei Wetlands sunset"
    ],
    descZh: "台灣最美高山湖泊，傍晚趕上高美濕地的世界級夕陽。",
    descEn:
      "Taiwan's most beautiful alpine lake, capped with a world-class sunset at Gaomei Wetlands.",
    popular: true
  },
  {
    id: "cingjing-hehuan-2d",
    region: "central",
    days: 2,
    hoursPerDay: 8,
    emoji: "🐑",
    titleZh: "清境農場・合歡山 二日遊",
    titleEn: "Cingjing Farm & Hehuanshan 2-Day Tour",
    highlightsZh: ["清境農場綿羊秀", "合歡山武嶺", "高山星空", "紙箱王", "埔里酒廠"],
    highlightsEn: [
      "Cingjing sheep show",
      "Wuling at Hehuanshan",
      "Alpine stargazing",
      "Carton King",
      "Puli Winery"
    ],
    descZh: "台灣公路最高點武嶺＋歐風農場，夜宿清境看銀河，親子與長輩都愛。",
    descEn:
      "Taiwan's highest road pass plus a European-style farm, with an alpine night under the Milky Way."
  },
  {
    id: "alishan-2d",
    region: "central",
    days: 2,
    hoursPerDay: 8,
    emoji: "🌄",
    titleZh: "嘉義・阿里山 日出二日遊",
    titleEn: "Alishan Sunrise 2-Day Tour",
    highlightsZh: ["阿里山日出雲海", "神木群步道", "奮起湖老街便當", "檜意森活村"],
    highlightsEn: [
      "Alishan sunrise & sea of clouds",
      "Giant tree trails",
      "Fenqihu bento old street",
      "Hinoki Village"
    ],
    descZh: "台灣八景之首：小火車、千年神木與日出雲海，一生必看一次的風景。",
    descEn:
      "Taiwan's most iconic scenery — forest railway, millennia-old trees, and a sunrise above the clouds.",
    popular: true
  },
  {
    id: "tainan-heritage",
    region: "south",
    days: 1,
    hoursPerDay: 8,
    emoji: "🏯",
    titleZh: "台南古蹟巡禮 美食一日遊",
    titleEn: "Tainan Heritage & Food Day Tour",
    highlightsZh: ["赤崁樓", "安平古堡・樹屋", "四草綠色隧道", "神農街", "國華街小吃"],
    highlightsEn: [
      "Chihkan Tower",
      "Anping Fort & Tree House",
      "Sicao Green Tunnel",
      "Shennong Street",
      "Guohua Street eats"
    ],
    descZh: "四百年古都一日精華：坐船穿越綠色隧道，巷弄小吃一路吃到晚。",
    descEn:
      "The 400-year-old capital in one day — mangrove boat rides and legendary street food."
  },
  {
    id: "kenting-3d",
    region: "south",
    days: 3,
    hoursPerDay: 8,
    emoji: "🏖️",
    titleZh: "高雄・墾丁玩水 三日遊",
    titleEn: "Kaohsiung & Kenting Beach 3-Day Tour",
    highlightsZh: [
      "駁二藝術特區",
      "旗津海產",
      "墾丁大街",
      "鵝鑾鼻燈塔",
      "水上活動",
      "龍磐草原"
    ],
    highlightsEn: [
      "Pier-2 Art Center",
      "Cijin seafood",
      "Kenting Street",
      "Eluanbi Lighthouse",
      "Water sports",
      "Longpan Grassland"
    ],
    descZh: "南國陽光三日：港都文青景點暖身，直奔國境之南玩水看海。",
    descEn:
      "Three days of southern sunshine — Kaohsiung's art harbor, then beaches at Taiwan's southern tip.",
    popular: true
  },
  {
    id: "taroko-hualien",
    region: "east",
    days: 1,
    hoursPerDay: 8,
    emoji: "🏞️",
    titleZh: "花蓮・太魯閣 峽谷一日遊",
    titleEn: "Hualien & Taroko Gorge Day Tour",
    highlightsZh: ["太魯閣峽谷", "清水斷崖", "七星潭", "東大門夜市"],
    highlightsEn: [
      "Taroko Gorge",
      "Qingshui Cliffs",
      "Qixingtan Beach",
      "Dongdamen Night Market"
    ],
    descZh: "大理石峽谷與太平洋斷崖，台灣最震撼的地景一日看盡。",
    descEn:
      "Marble gorges and Pacific cliffs — Taiwan's most dramatic landscapes in a single day."
  },
  {
    id: "east-valley-3d",
    region: "east",
    days: 3,
    hoursPerDay: 8,
    emoji: "🌾",
    titleZh: "花東縱谷 慢旅三日遊",
    titleEn: "East Rift Valley Slow Travel 3-Day Tour",
    highlightsZh: ["雲山水", "瑞穗牧場", "伯朗大道", "多良車站", "知本溫泉"],
    highlightsEn: [
      "Yunshanshui",
      "Ruisui Ranch",
      "Mr. Brown Avenue",
      "Duoliang Station",
      "Zhiben hot springs"
    ],
    descZh: "台灣最療癒的一段路：稻浪、牧場與最美車站，夜宿溫泉放空。",
    descEn:
      "Taiwan's most soothing road — rice waves, ranches, seaside stations, and hot spring nights."
  },
  {
    id: "round-island-5d",
    region: "island",
    days: 5,
    hoursPerDay: 8,
    emoji: "🗺️",
    titleZh: "環島精華 五日遊",
    titleEn: "Round-Island Highlights 5-Day Tour",
    highlightsZh: ["日月潭", "阿里山", "墾丁", "花東海岸", "太魯閣", "九份"],
    highlightsEn: [
      "Sun Moon Lake",
      "Alishan",
      "Kenting",
      "East Coast",
      "Taroko",
      "Jiufen"
    ],
    descZh:
      "一次擁有整個台灣：山、海、湖、峽谷與夜市，專屬司機陪你順時針玩一圈。",
    descEn:
      "All of Taiwan in one loop — mountains, lakes, beaches, gorges, and night markets with your private driver.",
    popular: true
  }
];

// ---- 報價引擎 ----

export const DEPOSIT_RATE = 0.3;
export const DRIVER_LODGING_PER_NIGHT = 1000; // 多日遊司機外宿津貼

export type Quote = {
  dayRate: number;
  days: number;
  carSubtotal: number;
  lodging: number;
  total: number;
  deposit: number;
  balance: number;
};

export function getQuote(pkg: TourPackage, vehicleId: VehicleId): Quote {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const dayRate = vehicle ? vehicle.dayRate : 0;
  const carSubtotal = dayRate * pkg.days;
  const lodging = pkg.days > 1 ? DRIVER_LODGING_PER_NIGHT * (pkg.days - 1) : 0;
  const total = carSubtotal + lodging;
  const deposit = Math.ceil((total * DEPOSIT_RATE) / 100) * 100;
  return {
    dayRate,
    days: pkg.days,
    carSubtotal,
    lodging,
    total,
    deposit,
    balance: total - deposit
  };
}

export function minDayRate(): number {
  return Math.min(...vehicles.map((v) => v.dayRate));
}

export function formatNTD(amount: number): string {
  return `NT$${amount.toLocaleString("en-US")}`;
}

export function makeOrderNo(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
    now.getDate()
  )}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FG${stamp}${rand}`.slice(0, 20);
}
