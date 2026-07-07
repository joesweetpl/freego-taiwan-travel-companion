// 全台熱門景點資料庫與 AI 行程天數估算引擎
// 停留時間（hours）與縣市環島路線車程（loopPos，累計小時）為估算值。

export type ZoneId = "north" | "central" | "south" | "east";

export const zonesMeta: Record<ZoneId, { zh: string; en: string }> = {
  north: { zh: "北部", en: "North" },
  central: { zh: "中部", en: "Central" },
  south: { zh: "南部", en: "South" },
  east: { zh: "東部", en: "East" }
};

export type County = {
  id: string;
  zh: string;
  en: string;
  zone: ZoneId;
  // 沿環島路線（台北順時針）之累計車程小時，用於估算跨縣市交通
  loopPos: number;
};

// 由北到南（西部），再由南迴接東部北上
export const counties: County[] = [
  { id: "taipei", zh: "台北", en: "Taipei", zone: "north", loopPos: 0 },
  { id: "keelung", zh: "基隆", en: "Keelung", zone: "north", loopPos: 0.6 },
  { id: "newtaipei", zh: "新北", en: "New Taipei", zone: "north", loopPos: 0.9 },
  { id: "taoyuan", zh: "桃園", en: "Taoyuan", zone: "north", loopPos: 1.4 },
  { id: "hsinchu", zh: "新竹", en: "Hsinchu", zone: "north", loopPos: 2.0 },
  { id: "miaoli", zh: "苗栗", en: "Miaoli", zone: "north", loopPos: 2.6 },
  { id: "taichung", zh: "台中", en: "Taichung", zone: "central", loopPos: 3.4 },
  { id: "changhua", zh: "彰化", en: "Changhua", zone: "central", loopPos: 3.9 },
  { id: "nantou", zh: "南投", en: "Nantou", zone: "central", loopPos: 4.4 },
  { id: "yunlin", zh: "雲林", en: "Yunlin", zone: "central", loopPos: 4.8 },
  { id: "chiayi", zh: "嘉義", en: "Chiayi", zone: "south", loopPos: 5.3 },
  { id: "tainan", zh: "台南", en: "Tainan", zone: "south", loopPos: 6.0 },
  { id: "kaohsiung", zh: "高雄", en: "Kaohsiung", zone: "south", loopPos: 6.6 },
  { id: "pingtung", zh: "屏東", en: "Pingtung", zone: "south", loopPos: 7.5 },
  { id: "taitung", zh: "台東", en: "Taitung", zone: "east", loopPos: 9.6 },
  { id: "hualien", zh: "花蓮", en: "Hualien", zone: "east", loopPos: 11.6 },
  { id: "yilan", zh: "宜蘭", en: "Yilan", zone: "east", loopPos: 13.2 }
];

export const LOOP_TOTAL = 14.2; // 宜蘭回台北約 1 小時（雪隧）

export type Attraction = {
  id: string;
  county: string;
  zh: string;
  en: string;
  hours: number; // 建議停留時間
  hot?: boolean; // IG／小紅書高聲量
};

export const attractions: Attraction[] = [
  // 台北
  { id: "taipei101", county: "taipei", zh: "台北101", en: "Taipei 101", hours: 2, hot: true },
  { id: "npm", county: "taipei", zh: "故宮博物院", en: "Palace Museum", hours: 2.5 },
  { id: "ximending", county: "taipei", zh: "西門町", en: "Ximending", hours: 2, hot: true },
  { id: "shilin", county: "taipei", zh: "士林夜市", en: "Shilin Night Market", hours: 2 },
  { id: "beitou", county: "taipei", zh: "北投溫泉", en: "Beitou Hot Springs", hours: 2.5 },
  { id: "yangmingshan", county: "taipei", zh: "陽明山", en: "Yangmingshan", hours: 3 },
  { id: "dadaocheng", county: "taipei", zh: "大稻埕迪化街", en: "Dadaocheng", hours: 2, hot: true },
  // 基隆
  { id: "zhengbin", county: "keelung", zh: "正濱漁港彩色屋", en: "Zhengbin Harbor", hours: 1.5, hot: true },
  { id: "hepingdao", county: "keelung", zh: "和平島公園", en: "Heping Island", hours: 2 },
  { id: "miaokou", county: "keelung", zh: "基隆廟口夜市", en: "Miaokou Night Market", hours: 2 },
  // 新北
  { id: "jiufen", county: "newtaipei", zh: "九份老街", en: "Jiufen Old Street", hours: 2.5, hot: true },
  { id: "shifen", county: "newtaipei", zh: "十分放天燈・瀑布", en: "Shifen Lanterns & Falls", hours: 2.5, hot: true },
  { id: "yehliu", county: "newtaipei", zh: "野柳女王頭", en: "Yehliu Geopark", hours: 2 },
  { id: "tamsui", county: "newtaipei", zh: "淡水老街・漁人碼頭", en: "Tamsui & Fisherman's Wharf", hours: 2.5 },
  { id: "wulai", county: "newtaipei", zh: "烏來溫泉老街", en: "Wulai Hot Springs", hours: 3 },
  // 桃園
  { id: "daxi", county: "taoyuan", zh: "大溪老街", en: "Daxi Old Street", hours: 2 },
  { id: "xpark", county: "taoyuan", zh: "Xpark 水族館", en: "Xpark Aquarium", hours: 2.5, hot: true },
  { id: "shimen", county: "taoyuan", zh: "石門水庫", en: "Shimen Reservoir", hours: 2 },
  // 新竹
  { id: "neiwan", county: "hsinchu", zh: "內灣老街", en: "Neiwan Old Street", hours: 2 },
  { id: "leofoo", county: "hsinchu", zh: "六福村主題樂園", en: "Leofoo Village", hours: 5 },
  // 苗栗
  { id: "shengxing", county: "miaoli", zh: "勝興車站・龍騰斷橋", en: "Shengxing Station", hours: 2.5 },
  { id: "nanzhuang", county: "miaoli", zh: "南庄老街", en: "Nanzhuang Old Street", hours: 2 },
  // 台中
  { id: "shenji", county: "taichung", zh: "審計新村", en: "Shen Ji New Village", hours: 1.5, hot: true },
  { id: "secondmarket", county: "taichung", zh: "第二市場", en: "Second Market", hours: 1.5 },
  { id: "gaomei", county: "taichung", zh: "高美濕地", en: "Gaomei Wetlands", hours: 2, hot: true },
  { id: "miyaharatc", county: "taichung", zh: "宮原眼科", en: "Miyahara", hours: 1 },
  { id: "fengjia", county: "taichung", zh: "逢甲夜市", en: "Fengjia Night Market", hours: 2.5 },
  { id: "rainbowvillage", county: "taichung", zh: "彩虹眷村", en: "Rainbow Village", hours: 1 },
  // 彰化
  { id: "lukang", county: "changhua", zh: "鹿港老街・天后宮", en: "Lukang Old Street", hours: 2.5 },
  { id: "bagua", county: "changhua", zh: "八卦山大佛", en: "Bagua Mountain Buddha", hours: 1.5 },
  // 南投
  { id: "sunmoonlake", county: "nantou", zh: "日月潭", en: "Sun Moon Lake", hours: 4, hot: true },
  { id: "cingjing", county: "nantou", zh: "清境農場", en: "Cingjing Farm", hours: 4, hot: true },
  { id: "jiji", county: "nantou", zh: "集集小鎮", en: "Jiji Town", hours: 2 },
  { id: "xitou", county: "nantou", zh: "溪頭妖怪村", en: "Xitou Monster Village", hours: 3 },
  { id: "hehuanshan", county: "nantou", zh: "合歡山武嶺", en: "Hehuanshan Wuling", hours: 4 },
  // 雲林
  { id: "beigang", county: "yunlin", zh: "北港朝天宮", en: "Beigang Temple", hours: 2 },
  { id: "gukeng", county: "yunlin", zh: "古坑綠色隧道", en: "Gukeng Green Tunnel", hours: 1.5 },
  // 嘉義
  { id: "alishan", county: "chiayi", zh: "阿里山", en: "Alishan", hours: 6, hot: true },
  { id: "fenqihu", county: "chiayi", zh: "奮起湖老街", en: "Fenqihu", hours: 2.5 },
  { id: "hinoki", county: "chiayi", zh: "檜意森活村", en: "Hinoki Village", hours: 1.5 },
  { id: "npmsouth", county: "chiayi", zh: "故宮南院", en: "NPM Southern Branch", hours: 2 },
  // 台南
  { id: "anping", county: "tainan", zh: "安平古堡・樹屋", en: "Anping Fort & Tree House", hours: 2.5 },
  { id: "chihkan", county: "tainan", zh: "赤崁樓", en: "Chihkan Tower", hours: 1.5 },
  { id: "guohua", county: "tainan", zh: "國華街小吃", en: "Guohua Street Eats", hours: 2, hot: true },
  { id: "sicao", county: "tainan", zh: "四草綠色隧道", en: "Sicao Green Tunnel", hours: 1.5, hot: true },
  { id: "chimei", county: "tainan", zh: "奇美博物館", en: "Chimei Museum", hours: 2.5 },
  // 高雄
  { id: "pier2", county: "kaohsiung", zh: "駁二藝術特區", en: "Pier-2 Art Center", hours: 2, hot: true },
  { id: "cijin", county: "kaohsiung", zh: "旗津半島", en: "Cijin Island", hours: 3 },
  { id: "fgs", county: "kaohsiung", zh: "佛光山佛陀紀念館", en: "Fo Guang Shan", hours: 2.5 },
  { id: "liuhe", county: "kaohsiung", zh: "六合/瑞豐夜市", en: "Kaohsiung Night Markets", hours: 2 },
  { id: "lotus", county: "kaohsiung", zh: "蓮池潭龍虎塔", en: "Lotus Pond", hours: 1.5 },
  // 屏東
  { id: "kenting", county: "pingtung", zh: "墾丁大街・沙灘", en: "Kenting Beach & Street", hours: 3, hot: true },
  { id: "eluanbi", county: "pingtung", zh: "鵝鑾鼻・龍磐草原", en: "Eluanbi & Longpan", hours: 2.5 },
  { id: "aquarium", county: "pingtung", zh: "屏東海生館", en: "Marine Biology Museum", hours: 3, hot: true },
  { id: "donggang", county: "pingtung", zh: "東港海鮮・大鵬灣", en: "Donggang & Dapeng Bay", hours: 2.5 },
  // 台東
  { id: "brownave", county: "taitung", zh: "池上伯朗大道", en: "Mr. Brown Avenue", hours: 2, hot: true },
  { id: "sanxiantai", county: "taitung", zh: "三仙台", en: "Sanxiantai", hours: 1.5 },
  { id: "zhiben", county: "taitung", zh: "知本溫泉", en: "Zhiben Hot Springs", hours: 2.5 },
  { id: "luye", county: "taitung", zh: "鹿野高台", en: "Luye Highland", hours: 2 },
  { id: "duoliang", county: "taitung", zh: "多良車站", en: "Duoliang Station", hours: 1 },
  // 花蓮
  { id: "taroko", county: "hualien", zh: "太魯閣峽谷", en: "Taroko Gorge", hours: 4, hot: true },
  { id: "qixingtan", county: "hualien", zh: "七星潭", en: "Qixingtan Beach", hours: 1.5 },
  { id: "qingshui", county: "hualien", zh: "清水斷崖", en: "Qingshui Cliff", hours: 1 },
  { id: "yunshanshui", county: "hualien", zh: "雲山水", en: "Yunshanshui", hours: 1.5, hot: true },
  { id: "dongdamen", county: "hualien", zh: "東大門夜市", en: "Dongdamen Night Market", hours: 2 },
  // 宜蘭
  { id: "jiaoxi", county: "yilan", zh: "礁溪溫泉", en: "Jiaoxi Hot Springs", hours: 2.5, hot: true },
  { id: "lanyangmuseum", county: "yilan", zh: "蘭陽博物館", en: "Lanyang Museum", hours: 2 },
  { id: "zooyilan", county: "yilan", zh: "蘭陽動植物王國", en: "Lanyang Zoo Kingdom", hours: 2.5, hot: true },
  { id: "luodong", county: "yilan", zh: "羅東夜市", en: "Luodong Night Market", hours: 2.5 },
  { id: "qingshuigeo", county: "yilan", zh: "清水地熱", en: "Qingshui Geothermal", hours: 1.5, hot: true },
  { id: "taipingshan", county: "yilan", zh: "太平山", en: "Taipingshan", hours: 5 },
  { id: "jimmypark", county: "yilan", zh: "幾米公園", en: "Jimmy Park", hours: 1 }
];

// 想怎麼玩（玩法標籤，整理自 IG／小紅書熱門主題）
export const playStyles: Array<{ id: string; zh: string; en: string }> = [
  { id: "water", zh: "玩水・浮潛", en: "Beach & Snorkel" },
  { id: "hotspring", zh: "溫泉", en: "Hot Springs" },
  { id: "oldstreet", zh: "老街", en: "Old Streets" },
  { id: "nightmarket", zh: "夜市", en: "Night Markets" },
  { id: "shopping", zh: "逛街購物", en: "Shopping" },
  { id: "cafe", zh: "咖啡廳・甜點", en: "Cafés & Desserts" },
  { id: "zoo", zh: "動物園・農場", en: "Zoos & Farms" },
  { id: "themepark", zh: "主題樂園", en: "Theme Parks" },
  { id: "hiking", zh: "登山・步道", en: "Hiking & Trails" },
  { id: "culture", zh: "文化古蹟", en: "Culture & Heritage" },
  { id: "photo", zh: "網美打卡", en: "Instagram Spots" },
  { id: "food", zh: "在地小吃", en: "Local Eats" },
  { id: "seaview", zh: "海景兜風", en: "Coastal Drives" },
  { id: "stargazing", zh: "高山星空", en: "Alpine Stargazing" }
];

// ---- AI 行程天數估算 ----

export type TripEstimate = {
  stayHours: number; // 景點停留總時數
  travelHours: number; // 預估車程總時數
  days: number; // 建議天數（每日 8 小時含車程）
  nights: number;
};

export function estimateTrip(selectedIds: string[]): TripEstimate | null {
  const selected = attractions.filter((a) => selectedIds.includes(a.id));
  if (selected.length === 0) return null;

  const stayHours = selected.reduce((sum, a) => sum + a.hours, 0);

  // 同縣市內移動：每多一個點約 0.4 小時
  const byCounty = new Map<string, number>();
  for (const a of selected) {
    byCounty.set(a.county, (byCounty.get(a.county) || 0) + 1);
  }
  let intraHours = 0;
  byCounty.forEach((count) => {
    intraHours += 0.4 * Math.max(0, count - 1);
  });

  // 跨縣市：以環島路線最小覆蓋弧估算
  const positions = Array.from(byCounty.keys())
    .map((id) => counties.find((c) => c.id === id)?.loopPos ?? 0)
    .sort((a, b) => a - b);
  let arcHours = 0;
  if (positions.length > 1) {
    let largestGap = 0;
    for (let i = 0; i < positions.length; i += 1) {
      const next = i === positions.length - 1 ? positions[0] + LOOP_TOTAL : positions[i + 1];
      largestGap = Math.max(largestGap, next - positions[i]);
    }
    arcHours = LOOP_TOTAL - largestGap;
  }

  // 出發／返程與接送基礎緩衝
  const travelHours = Math.round((arcHours + intraHours + 1) * 10) / 10;

  // 每日 8 小時，含每日約 1 小時用餐休息，反覆收斂
  let days = 1;
  for (let i = 0; i < 5; i += 1) {
    const needed = stayHours + travelHours + days * 1;
    const nextDays = Math.max(1, Math.ceil(needed / 8));
    if (nextDays === days) break;
    days = nextDays;
  }
  days = Math.min(days, 8);

  return {
    stayHours: Math.round(stayHours * 10) / 10,
    travelHours,
    days,
    nights: Math.max(0, days - 1)
  };
}
