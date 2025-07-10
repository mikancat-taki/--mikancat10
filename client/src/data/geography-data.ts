export interface Country {
  name: string;
  continent: string;
  capital: string;
  nameJa: string;
  capitalJa: string;
}

export const geographyData: Record<string, Country[]> = {
  africa: [
    { name: "Nigeria", continent: "Africa", capital: "Abuja", nameJa: "ナイジェリア", capitalJa: "アブジャ" },
    { name: "Egypt", continent: "Africa", capital: "Cairo", nameJa: "エジプト", capitalJa: "カイロ" },
    { name: "South Africa", continent: "Africa", capital: "Cape Town", nameJa: "南アフリカ", capitalJa: "ケープタウン" },
    { name: "Kenya", continent: "Africa", capital: "Nairobi", nameJa: "ケニア", capitalJa: "ナイロビ" },
    { name: "Morocco", continent: "Africa", capital: "Rabat", nameJa: "モロッコ", capitalJa: "ラバト" },
    { name: "Ethiopia", continent: "Africa", capital: "Addis Ababa", nameJa: "エチオピア", capitalJa: "アディスアベバ" },
    { name: "Ghana", continent: "Africa", capital: "Accra", nameJa: "ガーナ", capitalJa: "アクラ" },
    { name: "Tunisia", continent: "Africa", capital: "Tunis", nameJa: "チュニジア", capitalJa: "チュニス" },
    { name: "Algeria", continent: "Africa", capital: "Algiers", nameJa: "アルジェリア", capitalJa: "アルジェ" },
    { name: "Tanzania", continent: "Africa", capital: "Dodoma", nameJa: "タンザニア", capitalJa: "ドドマ" }
  ],
  europe: [
    { name: "Germany", continent: "Europe", capital: "Berlin", nameJa: "ドイツ", capitalJa: "ベルリン" },
    { name: "France", continent: "Europe", capital: "Paris", nameJa: "フランス", capitalJa: "パリ" },
    { name: "Italy", continent: "Europe", capital: "Rome", nameJa: "イタリア", capitalJa: "ローマ" },
    { name: "Spain", continent: "Europe", capital: "Madrid", nameJa: "スペイン", capitalJa: "マドリード" },
    { name: "United Kingdom", continent: "Europe", capital: "London", nameJa: "イギリス", capitalJa: "ロンドン" },
    { name: "Netherlands", continent: "Europe", capital: "Amsterdam", nameJa: "オランダ", capitalJa: "アムステルダム" },
    { name: "Sweden", continent: "Europe", capital: "Stockholm", nameJa: "スウェーデン", capitalJa: "ストックホルム" },
    { name: "Norway", continent: "Europe", capital: "Oslo", nameJa: "ノルウェー", capitalJa: "オスロ" },
    { name: "Switzerland", continent: "Europe", capital: "Bern", nameJa: "スイス", capitalJa: "ベルン" },
    { name: "Poland", continent: "Europe", capital: "Warsaw", nameJa: "ポーランド", capitalJa: "ワルシャワ" }
  ],
  asia: [
    { name: "Japan", continent: "Asia", capital: "Tokyo", nameJa: "日本", capitalJa: "東京" },
    { name: "China", continent: "Asia", capital: "Beijing", nameJa: "中国", capitalJa: "北京" },
    { name: "India", continent: "Asia", capital: "New Delhi", nameJa: "インド", capitalJa: "ニューデリー" },
    { name: "South Korea", continent: "Asia", capital: "Seoul", nameJa: "韓国", capitalJa: "ソウル" },
    { name: "Thailand", continent: "Asia", capital: "Bangkok", nameJa: "タイ", capitalJa: "バンコク" },
    { name: "Vietnam", continent: "Asia", capital: "Hanoi", nameJa: "ベトナム", capitalJa: "ハノイ" },
    { name: "Indonesia", continent: "Asia", capital: "Jakarta", nameJa: "インドネシア", capitalJa: "ジャカルタ" },
    { name: "Malaysia", continent: "Asia", capital: "Kuala Lumpur", nameJa: "マレーシア", capitalJa: "クアラルンプール" },
    { name: "Philippines", continent: "Asia", capital: "Manila", nameJa: "フィリピン", capitalJa: "マニラ" },
    { name: "Singapore", continent: "Asia", capital: "Singapore", nameJa: "シンガポール", capitalJa: "シンガポール" }
  ],
  "north-america": [
    { name: "United States", continent: "North America", capital: "Washington D.C.", nameJa: "アメリカ", capitalJa: "ワシントンD.C." },
    { name: "Canada", continent: "North America", capital: "Ottawa", nameJa: "カナダ", capitalJa: "オタワ" },
    { name: "Mexico", continent: "North America", capital: "Mexico City", nameJa: "メキシコ", capitalJa: "メキシコシティ" },
    { name: "Guatemala", continent: "North America", capital: "Guatemala City", nameJa: "グアテマラ", capitalJa: "グアテマラシティ" },
    { name: "Cuba", continent: "North America", capital: "Havana", nameJa: "キューバ", capitalJa: "ハバナ" },
    { name: "Jamaica", continent: "North America", capital: "Kingston", nameJa: "ジャマイカ", capitalJa: "キングストン" },
    { name: "Costa Rica", continent: "North America", capital: "San José", nameJa: "コスタリカ", capitalJa: "サンホセ" },
    { name: "Panama", continent: "North America", capital: "Panama City", nameJa: "パナマ", capitalJa: "パナマシティ" },
    { name: "Honduras", continent: "North America", capital: "Tegucigalpa", nameJa: "ホンジュラス", capitalJa: "テグシガルパ" },
    { name: "Nicaragua", continent: "North America", capital: "Managua", nameJa: "ニカラグア", capitalJa: "マナグア" }
  ],
  "south-america": [
    { name: "Brazil", continent: "South America", capital: "Brasília", nameJa: "ブラジル", capitalJa: "ブラジリア" },
    { name: "Argentina", continent: "South America", capital: "Buenos Aires", nameJa: "アルゼンチン", capitalJa: "ブエノスアイレス" },
    { name: "Chile", continent: "South America", capital: "Santiago", nameJa: "チリ", capitalJa: "サンティアゴ" },
    { name: "Peru", continent: "South America", capital: "Lima", nameJa: "ペルー", capitalJa: "リマ" },
    { name: "Colombia", continent: "South America", capital: "Bogotá", nameJa: "コロンビア", capitalJa: "ボゴタ" },
    { name: "Venezuela", continent: "South America", capital: "Caracas", nameJa: "ベネズエラ", capitalJa: "カラカス" },
    { name: "Ecuador", continent: "South America", capital: "Quito", nameJa: "エクアドル", capitalJa: "キト" },
    { name: "Uruguay", continent: "South America", capital: "Montevideo", nameJa: "ウルグアイ", capitalJa: "モンテビデオ" },
    { name: "Paraguay", continent: "South America", capital: "Asunción", nameJa: "パラグアイ", capitalJa: "アスンシオン" },
    { name: "Bolivia", continent: "South America", capital: "La Paz", nameJa: "ボリビア", capitalJa: "ラパス" }
  ]
};
