// 每條路線的兩個建議行程版本
// 依熱門旅遊部落客攻略與在地司機推薦路線整理，客人可再客製調整。

export type ItineraryOption = {
  id: string;
  nameZh: string;
  nameEn: string;
  stopsZh: string[];
  stopsEn: string[];
};

export const itineraries: Record<string, ItineraryOption[]> = {
  "yehliu-jiufen-shifen": [
    {
      id: "classic",
      nameZh: "🅰️ 經典打卡版",
      nameEn: "A. Classic Highlights",
      stopsZh: [
        "09:00 飯店出發",
        "10:00 野柳地質公園・女王頭",
        "12:00 金瓜石黃金博物館・祈堂老街",
        "13:30 九份老街午餐・阿妹茶樓喝茶",
        "16:00 十分老街放天燈",
        "16:50 十分瀑布",
        "18:00 返回台北"
      ],
      stopsEn: [
        "09:00 Hotel pickup",
        "10:00 Yehliu Geopark & Queen's Head",
        "12:00 Gold Museum & Qitang Old Street",
        "13:30 Lunch & teahouse at Jiufen Old Street",
        "16:00 Sky lantern at Shifen Old Street",
        "16:50 Shifen Waterfall",
        "18:00 Return to Taipei"
      ]
    },
    {
      id: "secret",
      nameZh: "🅱️ 秘境深度版",
      nameEn: "B. Hidden Gems",
      stopsZh: [
        "09:00 飯店出發",
        "09:50 陰陽海・十三層遺址",
        "10:30 黃金瀑布",
        "11:00 報時山步道（360° 山海景）",
        "12:30 九份老街午餐・茶館",
        "15:00 猴硐貓村",
        "16:00 平溪老街放天燈",
        "17:00 十分瀑布",
        "18:30 返回台北"
      ],
      stopsEn: [
        "09:00 Hotel pickup",
        "09:50 Yin-Yang Sea & 13-Layer Ruins",
        "10:30 Golden Waterfall",
        "11:00 Baoshishan Trail (360° views)",
        "12:30 Lunch & teahouse at Jiufen",
        "15:00 Houtong Cat Village",
        "16:00 Sky lantern at Pingxi",
        "17:00 Shifen Waterfall",
        "18:30 Return to Taipei"
      ]
    }
  ],
  "taipei-city-classic": [
    {
      id: "culture",
      nameZh: "🅰️ 經典文化版",
      nameEn: "A. Culture Classic",
      stopsZh: [
        "09:00 飯店出發",
        "09:30 中正紀念堂・衛兵交接",
        "10:30 龍山寺・剝皮寮老街",
        "12:00 永康街午餐（小籠包/牛肉麵）",
        "14:00 國立故宮博物院",
        "16:30 大稻埕迪化街・碼頭夕陽",
        "18:30 士林夜市晚餐",
        "20:00 返回飯店"
      ],
      stopsEn: [
        "09:00 Hotel pickup",
        "09:30 CKS Memorial Hall guard ceremony",
        "10:30 Longshan Temple & Bopiliao",
        "12:00 Lunch at Yongkang St (xiaolongbao)",
        "14:00 National Palace Museum",
        "16:30 Dadaocheng & wharf sunset",
        "18:30 Shilin Night Market dinner",
        "20:00 Return to hotel"
      ]
    },
    {
      id: "photo",
      nameZh: "🅱️ 網美攝影版",
      nameEn: "B. Instagram Route",
      stopsZh: [
        "09:00 飯店出發",
        "09:30 象山步道拍台北101",
        "11:00 四四南村文青拍照",
        "12:00 台北101觀景台＋午餐",
        "14:30 松山文創園區",
        "16:00 華山1914文創園區",
        "17:30 大稻埕碼頭夕陽",
        "19:00 寧夏夜市晚餐"
      ],
      stopsEn: [
        "09:00 Hotel pickup",
        "09:30 Elephant Mountain 101 viewpoint",
        "11:00 Four Four South Village",
        "12:00 Taipei 101 Observatory + lunch",
        "14:30 Songshan Cultural Park",
        "16:00 Huashan 1914 Creative Park",
        "17:30 Dadaocheng wharf sunset",
        "19:00 Ningxia Night Market dinner"
      ]
    }
  ],
  "yangmingshan-beitou": [
    {
      id: "onsen",
      nameZh: "🅰️ 湯泉療癒版",
      nameEn: "A. Hot Spring Relax",
      stopsZh: [
        "09:00 飯店出發",
        "09:40 陽明山小油坑硫磺口",
        "10:40 擎天崗大草原",
        "12:00 竹子湖野菜餐廳午餐",
        "14:00 北投地熱谷",
        "14:40 溫泉博物館・綠建築圖書館",
        "15:30 溫泉會館泡湯",
        "18:00 返回飯店"
      ],
      stopsEn: [
        "09:00 Hotel pickup",
        "09:40 Xiaoyoukeng fumaroles",
        "10:40 Qingtiangang Grassland",
        "12:00 Zhuzihu farm-style lunch",
        "14:00 Beitou Thermal Valley",
        "14:40 Hot Spring Museum & Library",
        "15:30 Hot spring bath",
        "18:00 Return to hotel"
      ]
    },
    {
      id: "flower",
      nameZh: "🅱️ 花季山林版",
      nameEn: "B. Blossom & Trails",
      stopsZh: [
        "09:00 飯店出發",
        "09:40 陽明公園花鐘（花季限定）",
        "10:40 冷水坑・牛奶湖",
        "12:00 竹子湖海芋田＋午餐",
        "14:00 硫磺谷步道",
        "15:00 北投老街・免費泡腳池",
        "17:00 返回飯店"
      ],
      stopsEn: [
        "09:00 Hotel pickup",
        "09:40 Yangming Park Flower Clock",
        "10:40 Lengshuikeng & Milk Lake",
        "12:00 Zhuzihu calla lily fields + lunch",
        "14:00 Sulfur Valley Trail",
        "15:00 Beitou Old Street & foot bath",
        "17:00 Return to hotel"
      ]
    }
  ],
  "north-coast": [
    {
      id: "classic",
      nameZh: "🅰️ 經典海岸版",
      nameEn: "A. Coast Classic",
      stopsZh: [
        "09:00 飯店出發",
        "09:50 野柳地質公園",
        "11:00 金山老街午餐（鴨肉）",
        "13:00 獅頭山公園・燭台雙嶼",
        "14:30 老梅綠石槽",
        "15:10 富貴角燈塔",
        "16:00 淺水灣海景咖啡",
        "18:00 返回台北"
      ],
      stopsEn: [
        "09:00 Hotel pickup",
        "09:50 Yehliu Geopark",
        "11:00 Jinshan Old Street lunch",
        "13:00 Candlestick Islets viewpoint",
        "14:30 Laomei Green Reef",
        "15:10 Fuguijiao Lighthouse",
        "16:00 Seaside café at Qianshuiwan",
        "18:00 Return to Taipei"
      ]
    },
    {
      id: "keelung",
      nameZh: "🅱️ 基隆秘境版",
      nameEn: "B. Keelung Hidden Coast",
      stopsZh: [
        "09:30 飯店出發",
        "10:00 正濱漁港彩色屋",
        "11:00 和平島地質公園",
        "12:30 八斗子潮境公園＋海鮮午餐",
        "14:00 深澳象鼻岩",
        "15:30 南雅奇岩",
        "16:30 九份黃昏茶館",
        "18:30 返回台北"
      ],
      stopsEn: [
        "09:30 Hotel pickup",
        "10:00 Zhengbin colorful harbor",
        "11:00 Heping Island Geopark",
        "12:30 Chaojing Park + seafood lunch",
        "14:00 Elephant Trunk Rock",
        "15:30 Nanya Rock formations",
        "16:30 Jiufen teahouse at dusk",
        "18:30 Return to Taipei"
      ]
    }
  ],
  "yilan-day": [
    {
      id: "family",
      nameZh: "🅰️ 親子同樂版",
      nameEn: "A. Family Fun",
      stopsZh: [
        "08:30 台北出發（雪隧）",
        "09:40 蘭陽博物館",
        "11:00 頭城老街",
        "12:00 礁溪甕窯雞午餐",
        "13:30 幾米公園・丟丟噹森林",
        "15:00 梅花湖環湖（電動車）",
        "16:30 羅東夜市",
        "19:00 返回台北"
      ],
      stopsEn: [
        "08:30 Depart Taipei",
        "09:40 Lanyang Museum",
        "11:00 Toucheng Old Street",
        "12:00 Jiaoxi roast chicken lunch",
        "13:30 Jimmy Park & art installations",
        "15:00 Meihua Lake ride",
        "16:30 Luodong Night Market",
        "19:00 Return to Taipei"
      ]
    },
    {
      id: "nature",
      nameZh: "🅱️ 山林溫泉版",
      nameEn: "B. Forest & Springs",
      stopsZh: [
        "08:00 台北出發",
        "09:30 太平山見晴懷古步道",
        "12:30 山產午餐",
        "14:00 清水地熱煮蛋",
        "15:30 龍潭湖大碗公溜滑梯",
        "16:30 礁溪溫泉泡湯",
        "18:30 返回台北"
      ],
      stopsEn: [
        "08:00 Depart Taipei",
        "09:30 Jianqing Historic Trail, Taipingshan",
        "12:30 Mountain cuisine lunch",
        "14:00 Qingshui Geothermal egg-boiling",
        "15:30 Longtan Lake slide park",
        "16:30 Jiaoxi hot spring bath",
        "18:30 Return to Taipei"
      ]
    }
  ],
  "sun-moon-lake": [
    {
      id: "lake",
      nameZh: "🅰️ 湖光經典版",
      nameEn: "A. Lake Classic",
      stopsZh: [
        "08:30 台中出發",
        "10:00 向山遊客中心",
        "11:00 日月潭遊湖（水社→玄光寺→伊達邵）",
        "12:30 伊達邵老街午餐",
        "14:00 日月潭纜車",
        "15:30 文武廟",
        "17:30 高美濕地看夕陽",
        "19:30 返回台中"
      ],
      stopsEn: [
        "08:30 Depart Taichung",
        "10:00 Xiangshan Visitor Center",
        "11:00 Lake cruise (Shuishe → Xuanguang → Ita Thao)",
        "12:30 Ita Thao street food lunch",
        "14:00 Sun Moon Lake Ropeway",
        "15:30 Wenwu Temple",
        "17:30 Gaomei Wetlands sunset",
        "19:30 Return to Taichung"
      ]
    },
    {
      id: "tea",
      nameZh: "🅱️ 茶香慢遊版",
      nameEn: "B. Tea Country",
      stopsZh: [
        "08:30 台中出發",
        "09:30 埔里造紙龍手創館",
        "11:00 鹿篙咖啡莊園（山景咖啡）",
        "12:30 魚池紅茶料理午餐",
        "14:00 貓囒山步道（茶園湖景）",
        "15:30 水社碼頭・涵碧步道",
        "17:00 彩虹眷村",
        "18:30 返回台中"
      ],
      stopsEn: [
        "08:30 Depart Taichung",
        "09:30 Puli paper craft workshop",
        "11:00 Lugao Coffee Estate",
        "12:30 Yuchi black tea cuisine lunch",
        "14:00 Maolan Mountain tea trail",
        "15:30 Shuishe Pier & Hanbi Trail",
        "17:00 Rainbow Village",
        "18:30 Return to Taichung"
      ]
    }
  ],
  "cingjing-hehuan-2d": [
    {
      id: "sunrise",
      nameZh: "🅰️ 高山日出版",
      nameEn: "A. Alpine Sunrise",
      stopsZh: [
        "Day1 09:00 台中出發",
        "Day1 10:00 埔里酒廠・紙教堂",
        "Day1 12:00 埔里午餐",
        "Day1 14:30 清境農場綿羊秀・天空步道",
        "Day1 夜宿清境（高山觀星）",
        "Day2 05:00 合歡山武嶺看日出",
        "Day2 09:00 清境小瑞士花園",
        "Day2 11:00 老英格蘭莊園下午茶",
        "Day2 14:00 中台禪寺",
        "Day2 17:30 返回台中"
      ],
      stopsEn: [
        "Day1 09:00 Depart Taichung",
        "Day1 10:00 Puli Winery & Paper Dome",
        "Day1 12:00 Lunch in Puli",
        "Day1 14:30 Cingjing sheep show & Skywalk",
        "Day1 Overnight at Cingjing (stargazing)",
        "Day2 05:00 Wuling sunrise at Hehuanshan",
        "Day2 09:00 Swiss Garden",
        "Day2 11:00 Old England Manor tea",
        "Day2 14:00 Chung Tai Chan Monastery",
        "Day2 17:30 Return to Taichung"
      ]
    },
    {
      id: "family",
      nameZh: "🅱️ 親子慢遊版",
      nameEn: "B. Family Pace",
      stopsZh: [
        "Day1 09:30 台中出發",
        "Day1 10:30 大黑松小倆口元首館",
        "Day1 12:00 埔里午餐・18度C巧克力",
        "Day1 14:30 清境農場餵綿羊",
        "Day1 16:00 步步高升步道",
        "Day1 夜宿民宿 BBQ",
        "Day2 09:00 清境高空觀景步道",
        "Day2 10:30 合歡山武嶺拍照",
        "Day2 12:30 霧社午餐",
        "Day2 15:00 敲敲木音樂盒 DIY",
        "Day2 18:00 返回台中"
      ],
      stopsEn: [
        "Day1 09:30 Depart Taichung",
        "Day1 10:30 Yuanshou Mansion",
        "Day1 12:00 Puli lunch & 18°C chocolate",
        "Day1 14:30 Feed sheep at Cingjing Farm",
        "Day1 16:00 Green Green Grassland trail",
        "Day1 B&B overnight with BBQ",
        "Day2 09:00 Cingjing Skywalk",
        "Day2 10:30 Wuling photo stop",
        "Day2 12:30 Wushe lunch",
        "Day2 15:00 Music box DIY workshop",
        "Day2 18:00 Return to Taichung"
      ]
    }
  ],
  "alishan-2d": [
    {
      id: "sunrise",
      nameZh: "🅰️ 日出雲海版",
      nameEn: "A. Sunrise & Clouds",
      stopsZh: [
        "Day1 09:00 嘉義出發",
        "Day1 09:30 檜意森活村・北門驛",
        "Day1 12:00 火雞肉飯午餐",
        "Day1 14:00 奮起湖老街・鐵路便當",
        "Day1 16:00 上阿里山・夜宿山上",
        "Day2 04:30 祝山觀日平台看日出",
        "Day2 07:00 神木群步道・姊妹潭",
        "Day2 11:00 下山",
        "Day2 13:00 觸口天長地久橋",
        "Day2 15:00 送嘉義高鐵/市區"
      ],
      stopsEn: [
        "Day1 09:00 Depart Chiayi",
        "Day1 09:30 Hinoki Village & Beimen Station",
        "Day1 12:00 Turkey rice lunch",
        "Day1 14:00 Fenqihu Old Street & bento",
        "Day1 16:00 Up to Alishan, overnight",
        "Day2 04:30 Zhushan sunrise platform",
        "Day2 07:00 Giant Trees Trail & Sister Ponds",
        "Day2 11:00 Descend the mountain",
        "Day2 13:00 Tianchang-Dijiu Bridges",
        "Day2 15:00 Drop-off at Chiayi HSR"
      ]
    },
    {
      id: "tea",
      nameZh: "🅱️ 茶園部落版",
      nameEn: "B. Tea & Tribe",
      stopsZh: [
        "Day1 09:00 嘉義出發",
        "Day1 10:00 梅山太平雲梯",
        "Day1 12:00 太平老街午餐",
        "Day1 14:30 隙頂二延平步道（茶園雲海）",
        "Day1 夜宿石棹茶莊",
        "Day2 08:00 阿里山森林遊樂區・神木群",
        "Day2 12:00 奮起湖便當午餐",
        "Day2 14:00 優遊吧斯鄒族文化部落",
        "Day2 16:30 返回嘉義"
      ],
      stopsEn: [
        "Day1 09:00 Depart Chiayi",
        "Day1 10:00 Taiping Suspension Bridge",
        "Day1 12:00 Taiping Old Street lunch",
        "Day1 14:30 Eryanping Trail (tea & clouds)",
        "Day1 Overnight at Shizhuo tea lodge",
        "Day2 08:00 Alishan Forest & Giant Trees",
        "Day2 12:00 Fenqihu bento lunch",
        "Day2 14:00 YuYuPas Tsou Cultural Park",
        "Day2 16:30 Return to Chiayi"
      ]
    }
  ],
  "tainan-heritage": [
    {
      id: "heritage",
      nameZh: "🅰️ 古都經典版",
      nameEn: "A. Heritage Classic",
      stopsZh: [
        "09:00 台南出發",
        "09:30 赤崁樓",
        "10:30 祀典武廟・大天后宮",
        "11:30 國華街小吃巡禮",
        "13:30 安平古堡",
        "14:30 安平樹屋",
        "15:30 四草綠色隧道搭船",
        "17:00 神農街散步",
        "18:00 大東夜市（或花園夜市）"
      ],
      stopsEn: [
        "09:00 Depart Tainan",
        "09:30 Chihkan Tower",
        "10:30 Wu Temple & Matsu Temple",
        "11:30 Guohua Street food crawl",
        "13:30 Anping Old Fort",
        "14:30 Anping Tree House",
        "15:30 Sicao Green Tunnel boat ride",
        "17:00 Shennong Street stroll",
        "18:00 Night market dinner"
      ]
    },
    {
      id: "foodie",
      nameZh: "🅱️ 巷弄美食版",
      nameEn: "B. Foodie Lanes",
      stopsZh: [
        "09:30 台南出發",
        "10:00 蝸牛巷・永樂市場",
        "11:00 國華街必吃清單（碗粿/春捲/布丁）",
        "13:00 林百貨（日治百貨）",
        "14:00 藍晒圖文創園區",
        "15:30 奇美博物館（外觀＋園區）",
        "17:30 漁光島看夕陽",
        "19:00 返回市區"
      ],
      stopsEn: [
        "09:30 Depart Tainan",
        "10:00 Snail Alley & Yongle Market",
        "11:00 Guohua Street must-eats",
        "13:00 Hayashi Department Store",
        "14:00 Blueprint Culture Park",
        "15:30 Chimei Museum & grounds",
        "17:30 Yuguang Island sunset",
        "19:00 Return to city"
      ]
    }
  ],
  "kenting-3d": [
    {
      id: "classic",
      nameZh: "🅰️ 經典玩水版",
      nameEn: "A. Beach Classic",
      stopsZh: [
        "Day1 高雄出發 → 駁二藝術特區",
        "Day1 旗津渡輪・海產午餐",
        "Day1 15:00 南下墾丁 → 關山夕陽",
        "Day1 墾丁大街夜市",
        "Day2 09:00 南灣水上活動（香蕉船/浮潛）",
        "Day2 12:00 恆春老街午餐",
        "Day2 14:00 鵝鑾鼻燈塔・台灣最南點",
        "Day2 16:00 龍磐草原・風吹沙",
        "Day3 09:00 白沙灣（少年PI沙灘）",
        "Day3 10:30 貓鼻頭 → 後壁湖海鮮午餐",
        "Day3 13:30 國立海洋生物博物館",
        "Day3 16:00 返回高雄"
      ],
      stopsEn: [
        "Day1 Kaohsiung → Pier-2 Art Center",
        "Day1 Cijin ferry & seafood lunch",
        "Day1 15:00 Drive south → Guanshan sunset",
        "Day1 Kenting Street night market",
        "Day2 09:00 Nanwan water sports",
        "Day2 12:00 Hengchun Old Street lunch",
        "Day2 14:00 Eluanbi Lighthouse & southernmost point",
        "Day2 16:00 Longpan Grassland & Fengchuisha",
        "Day3 09:00 Baishawan (Life of Pi beach)",
        "Day3 10:30 Maobitou → Houbihu seafood",
        "Day3 13:30 National Museum of Marine Biology",
        "Day3 16:00 Return to Kaohsiung"
      ]
    },
    {
      id: "slow",
      nameZh: "🅱️ 秘境慢活版",
      nameEn: "B. Hidden & Slow",
      stopsZh: [
        "Day1 高雄出發 → 東港華僑市場海鮮",
        "Day1 大鵬灣環灣",
        "Day1 15:00 恆春 3000 啤酒博物館",
        "Day1 夜宿海景民宿",
        "Day2 08:30 佳樂水・港口吊橋",
        "Day2 12:00 滿州午餐",
        "Day2 14:00 鹿境梅花鹿生態園",
        "Day2 16:00 船帆石・小灣沙灘",
        "Day2 墾丁大街晚餐",
        "Day3 07:00 龍磐大草原看日出",
        "Day3 09:30 南灣浮潛（或 SUP）",
        "Day3 12:00 後壁湖生魚片",
        "Day3 14:00 四重溪溫泉泡腳",
        "Day3 17:00 返回高雄"
      ],
      stopsEn: [
        "Day1 Kaohsiung → Donggang seafood market",
        "Day1 Dapeng Bay loop",
        "Day1 15:00 Hengchun 3000 Beer Museum",
        "Day1 Ocean-view B&B overnight",
        "Day2 08:30 Jialeshuei & Gangkou Bridge",
        "Day2 12:00 Manzhou lunch",
        "Day2 14:00 Paradise of Deer park",
        "Day2 16:00 Sail Rock & Little Bay beach",
        "Day2 Kenting Street dinner",
        "Day3 07:00 Longpan Grassland sunrise",
        "Day3 09:30 Snorkeling or SUP at Nanwan",
        "Day3 12:00 Houbihu sashimi lunch",
        "Day3 14:00 Sichongxi hot spring foot bath",
        "Day3 17:00 Return to Kaohsiung"
      ]
    }
  ],
  "taroko-hualien": [
    {
      id: "gorge",
      nameZh: "🅰️ 峽谷經典版",
      nameEn: "A. Gorge Classic",
      stopsZh: [
        "08:30 花蓮出發",
        "09:10 清水斷崖觀景台",
        "10:00 太魯閣遊客中心",
        "10:40 砂卡礑步道",
        "12:30 天祥午餐",
        "14:00 燕子口・九曲洞",
        "15:30 長春祠",
        "16:30 七星潭",
        "18:00 東大門夜市"
      ],
      stopsEn: [
        "08:30 Depart Hualien",
        "09:10 Qingshui Cliff viewpoint",
        "10:00 Taroko Visitor Center",
        "10:40 Shakadang Trail",
        "12:30 Lunch at Tianxiang",
        "14:00 Swallow Grotto & Nine Turns",
        "15:30 Eternal Spring Shrine",
        "16:30 Qixingtan Beach",
        "18:00 Dongdamen Night Market"
      ]
    },
    {
      id: "valley",
      nameZh: "🅱️ 山海縱谷版",
      nameEn: "B. Sea & Valley Mix",
      stopsZh: [
        "08:30 花蓮出發",
        "09:00 七星潭晨光",
        "10:00 崇德瑩農場（海景草原）",
        "12:00 午餐",
        "13:30 雲山水夢幻湖",
        "15:00 林田山林業文化園區",
        "16:30 瑞穗牧場下午茶",
        "18:30 返回花蓮市區"
      ],
      stopsEn: [
        "08:30 Depart Hualien",
        "09:00 Morning at Qixingtan",
        "10:00 Chongde Ying Farm (sea meadow)",
        "12:00 Lunch",
        "13:30 Yunshanshui Dream Lake",
        "15:00 Lintianshan Forestry Village",
        "16:30 Ruisui Ranch afternoon tea",
        "18:30 Return to Hualien"
      ]
    }
  ],
  "east-valley-3d": [
    {
      id: "valley",
      nameZh: "🅰️ 縱谷經典版",
      nameEn: "A. Valley Classic",
      stopsZh: [
        "Day1 花蓮出發 → 雲山水",
        "Day1 林田山林業園區",
        "Day1 瑞穗牧場 → 夜宿瑞穗溫泉",
        "Day2 08:30 赤科山/六十石山（金針花季）",
        "Day2 12:00 玉里麵午餐",
        "Day2 13:30 伯朗大道騎單車・金城武樹",
        "Day2 15:30 池上飯包文化故事館",
        "Day2 夜宿鹿野/知本溫泉",
        "Day3 08:30 鹿野高台",
        "Day3 10:30 多良車站（最美車站）",
        "Day3 13:00 台東市鐵花村・海濱公園",
        "Day3 15:00 送台東車站/機場"
      ],
      stopsEn: [
        "Day1 Hualien → Yunshanshui",
        "Day1 Lintianshan Forestry Village",
        "Day1 Ruisui Ranch → hot spring overnight",
        "Day2 08:30 Liushishi Mountain (daylily season)",
        "Day2 12:00 Yuli noodles lunch",
        "Day2 13:30 Cycling Mr. Brown Avenue",
        "Day2 15:30 Chishang Bento Museum",
        "Day2 Overnight at Zhiben hot springs",
        "Day3 08:30 Luye Highland",
        "Day3 10:30 Duoliang Station",
        "Day3 13:00 Tiehua Village, Taitung",
        "Day3 15:00 Drop-off at Taitung station/airport"
      ]
    },
    {
      id: "coast",
      nameZh: "🅱️ 海線風光版",
      nameEn: "B. Coastline Route",
      stopsZh: [
        "Day1 花蓮出發 → 石梯坪",
        "Day1 親不知子天空步道",
        "Day1 北回歸線標誌塔 → 夜宿成功",
        "Day2 07:00 三仙台看日出",
        "Day2 09:30 都歷海灘（天空之鏡）",
        "Day2 11:00 東河包子・金樽咖啡",
        "Day2 14:00 加路蘭遊憩區・小野柳",
        "Day2 夜宿知本溫泉",
        "Day3 08:30 知本森林遊樂區",
        "Day3 11:00 初鹿牧場",
        "Day3 14:00 台東市區伴手禮",
        "Day3 15:00 送台東車站/機場"
      ],
      stopsEn: [
        "Day1 Hualien → Shitiping terraces",
        "Day1 Qinbuzhizi Skywalk",
        "Day1 Tropic of Cancer marker → Chenggong",
        "Day2 07:00 Sanxiantai sunrise",
        "Day2 09:30 Duli Beach (mirror of the sky)",
        "Day2 11:00 Donghe buns & Jinzun coffee",
        "Day2 14:00 Jialulan & Xiaoyeliu",
        "Day2 Zhiben hot spring overnight",
        "Day3 08:30 Zhiben Forest Recreation Area",
        "Day3 11:00 Chulu Ranch",
        "Day3 14:00 Taitung souvenirs",
        "Day3 15:00 Drop-off at station/airport"
      ]
    }
  ],
  "round-island-5d": [
    {
      id: "clockwise",
      nameZh: "🅰️ 順時針經典版",
      nameEn: "A. Clockwise Classic",
      stopsZh: [
        "Day1 台北出發 → 日月潭遊湖 → 夜宿日月潭",
        "Day2 阿里山神木群 → 奮起湖 → 夜宿台南（夜市）",
        "Day3 台南古蹟半日 → 高雄駁二 → 墾丁關山夕陽",
        "Day4 墾丁鵝鑾鼻 → 南迴多良車站 → 池上伯朗大道 → 夜宿瑞穗溫泉",
        "Day5 太魯閣峽谷 → 清水斷崖 → 蘇花公路 → 返回台北"
      ],
      stopsEn: [
        "Day1 Taipei → Sun Moon Lake cruise, overnight",
        "Day2 Alishan Giant Trees → Fenqihu → Tainan night market",
        "Day3 Tainan heritage → Pier-2 → Kenting sunset",
        "Day4 Eluanbi → Duoliang Station → Mr. Brown Avenue → Ruisui hot springs",
        "Day5 Taroko Gorge → Qingshui Cliff → back to Taipei"
      ]
    },
    {
      id: "mountain-sea",
      nameZh: "🅱️ 山海精華版",
      nameEn: "B. Mountains & Sea",
      stopsZh: [
        "Day1 台北 → 九份十分 → 夜宿礁溪溫泉",
        "Day2 太平山（或清水地熱）→ 蘇花公路 → 清水斷崖 → 夜宿花蓮",
        "Day3 太魯閣 → 縱谷雲山水・伯朗大道 → 夜宿台東",
        "Day4 南迴 → 墾丁鵝鑾鼻・龍磐草原 → 夜宿高雄",
        "Day5 台南古蹟與小吃 → 日月潭 → 返回台北"
      ],
      stopsEn: [
        "Day1 Taipei → Jiufen & Shifen → Jiaoxi hot springs",
        "Day2 Taipingshan → Suhua Highway → Qingshui Cliff → Hualien",
        "Day3 Taroko → Valley highlights → Taitung",
        "Day4 South Link → Kenting & Longpan → Kaohsiung",
        "Day5 Tainan heritage & eats → Sun Moon Lake → Taipei"
      ]
    }
  ]
};
