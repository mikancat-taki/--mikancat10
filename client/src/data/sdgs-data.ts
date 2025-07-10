export interface SDGQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  goal: number;
  goalTitle: string;
}

export const sdgsQuizData: SDGQuestion[] = [
  {
    id: 1,
    question: "SDGsの目標1は何ですか？",
    options: ["貧困をなくそう", "飢餓をゼロに", "すべての人に健康と福祉を", "質の高い教育をみんなに"],
    correctAnswer: 0,
    explanation: "SDGs目標1は「貧困をなくそう」です。",
    goal: 1,
    goalTitle: "貧困をなくそう"
  },
  {
    id: 2,
    question: "SDGsの目標2は何ですか？",
    options: ["貧困をなくそう", "飢餓をゼロに", "すべての人に健康と福祉を", "質の高い教育をみんなに"],
    correctAnswer: 1,
    explanation: "SDGs目標2は「飢餓をゼロに」です。",
    goal: 2,
    goalTitle: "飢餓をゼロに"
  },
  {
    id: 3,
    question: "SDGsの目標3は何ですか？",
    options: ["貧困をなくそう", "飢餓をゼロに", "すべての人に健康と福祉を", "質の高い教育をみんなに"],
    correctAnswer: 2,
    explanation: "SDGs目標3は「すべての人に健康と福祉を」です。",
    goal: 3,
    goalTitle: "すべての人に健康と福祉を"
  },
  {
    id: 4,
    question: "SDGsの目標4は何ですか？",
    options: ["貧困をなくそう", "飢餓をゼロに", "すべての人に健康と福祉を", "質の高い教育をみんなに"],
    correctAnswer: 3,
    explanation: "SDGs目標4は「質の高い教育をみんなに」です。",
    goal: 4,
    goalTitle: "質の高い教育をみんなに"
  },
  {
    id: 5,
    question: "SDGsの目標5は何ですか？",
    options: ["ジェンダー平等を実現しよう", "安全な水とトイレを世界中に", "エネルギーをみんなに そしてクリーンに", "働きがいも経済成長も"],
    correctAnswer: 0,
    explanation: "SDGs目標5は「ジェンダー平等を実現しよう」です。",
    goal: 5,
    goalTitle: "ジェンダー平等を実現しよう"
  },
  {
    id: 6,
    question: "SDGsの目標6は何ですか？",
    options: ["ジェンダー平等を実現しよう", "安全な水とトイレを世界中に", "エネルギーをみんなに そしてクリーンに", "働きがいも経済成長も"],
    correctAnswer: 1,
    explanation: "SDGs目標6は「安全な水とトイレを世界中に」です。",
    goal: 6,
    goalTitle: "安全な水とトイレを世界中に"
  },
  {
    id: 7,
    question: "SDGsの目標7は何ですか？",
    options: ["ジェンダー平等を実現しよう", "安全な水とトイレを世界中に", "エネルギーをみんなに そしてクリーンに", "働きがいも経済成長も"],
    correctAnswer: 2,
    explanation: "SDGs目標7は「エネルギーをみんなに そしてクリーンに」です。",
    goal: 7,
    goalTitle: "エネルギーをみんなに そしてクリーンに"
  },
  {
    id: 8,
    question: "SDGsの目標8は何ですか？",
    options: ["ジェンダー平等を実現しよう", "安全な水とトイレを世界中に", "エネルギーをみんなに そしてクリーンに", "働きがいも経済成長も"],
    correctAnswer: 3,
    explanation: "SDGs目標8は「働きがいも経済成長も」です。",
    goal: 8,
    goalTitle: "働きがいも経済成長も"
  },
  {
    id: 9,
    question: "SDGsの目標13は何ですか？",
    options: ["気候変動に具体的な対策を", "海の豊かさを守ろう", "陸の豊かさも守ろう", "平和と公正をすべての人に"],
    correctAnswer: 0,
    explanation: "SDGs目標13は「気候変動に具体的な対策を」です。",
    goal: 13,
    goalTitle: "気候変動に具体的な対策を"
  },
  {
    id: 10,
    question: "SDGsの目標14は何ですか？",
    options: ["気候変動に具体的な対策を", "海の豊かさを守ろう", "陸の豊かさも守ろう", "平和と公正をすべての人に"],
    correctAnswer: 1,
    explanation: "SDGs目標14は「海の豊かさを守ろう」です。",
    goal: 14,
    goalTitle: "海の豊かさを守ろう"
  },
  {
    id: 11,
    question: "SDGsの目標15は何ですか？",
    options: ["気候変動に具体的な対策を", "海の豊かさを守ろう", "陸の豊かさも守ろう", "平和と公正をすべての人に"],
    correctAnswer: 2,
    explanation: "SDGs目標15は「陸の豊かさも守ろう」です。",
    goal: 15,
    goalTitle: "陸の豊かさも守ろう"
  },
  {
    id: 12,
    question: "SDGsの目標16は何ですか？",
    options: ["気候変動に具体的な対策を", "海の豊かさを守ろう", "陸の豊かさも守ろう", "平和と公正をすべての人に"],
    correctAnswer: 3,
    explanation: "SDGs目標16は「平和と公正をすべての人に」です。",
    goal: 16,
    goalTitle: "平和と公正をすべての人に"
  },
  {
    id: 13,
    question: "SDGsの目標17は何ですか？",
    options: ["パートナーシップで目標を達成しよう", "住み続けられるまちづくりを", "つくる責任 つかう責任", "人や国の不平等をなくそう"],
    correctAnswer: 0,
    explanation: "SDGs目標17は「パートナーシップで目標を達成しよう」です。",
    goal: 17,
    goalTitle: "パートナーシップで目標を達成しよう"
  },
  {
    id: 14,
    question: "SDGsはいつまでに達成する目標ですか？",
    options: ["2030年", "2025年", "2035年", "2040年"],
    correctAnswer: 0,
    explanation: "SDGsは2030年までに達成する目標です。",
    goal: 0,
    goalTitle: "全体目標"
  },
  {
    id: 15,
    question: "SDGsの正式名称は何ですか？",
    options: ["持続可能な開発目標", "持続可能な発展目標", "持続可能な成長目標", "持続可能な環境目標"],
    correctAnswer: 0,
    explanation: "SDGsは「持続可能な開発目標」の略です。",
    goal: 0,
    goalTitle: "全体目標"
  }
];
