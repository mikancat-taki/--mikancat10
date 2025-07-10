export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizData {
  elementary: QuizQuestion[];
  middle: QuizQuestion[];
  high: QuizQuestion[];
  university: QuizQuestion[];
}

export const mathQuizData: QuizData = {
  elementary: [
    {
      id: 1,
      question: "5 + 3 = ?",
      options: ["8", "7", "9", "6"],
      correctAnswer: 0,
      explanation: "5 + 3 = 8"
    },
    {
      id: 2,
      question: "12 - 4 = ?",
      options: ["8", "7", "9", "6"],
      correctAnswer: 0,
      explanation: "12 - 4 = 8"
    },
    {
      id: 3,
      question: "3 × 4 = ?",
      options: ["12", "10", "14", "16"],
      correctAnswer: 0,
      explanation: "3 × 4 = 12"
    },
    {
      id: 4,
      question: "15 ÷ 3 = ?",
      options: ["5", "4", "6", "3"],
      correctAnswer: 0,
      explanation: "15 ÷ 3 = 5"
    },
    {
      id: 5,
      question: "7 + 6 = ?",
      options: ["13", "12", "14", "11"],
      correctAnswer: 0,
      explanation: "7 + 6 = 13"
    }
  ],
  middle: [
    {
      id: 1,
      question: "2x + 5 = 13 のとき、x = ?",
      options: ["4", "3", "5", "6"],
      correctAnswer: 0,
      explanation: "2x = 13 - 5 = 8, x = 4"
    },
    {
      id: 2,
      question: "3² + 4² = ?",
      options: ["25", "24", "26", "23"],
      correctAnswer: 0,
      explanation: "9 + 16 = 25"
    },
    {
      id: 3,
      question: "√64 = ?",
      options: ["8", "7", "9", "6"],
      correctAnswer: 0,
      explanation: "8 × 8 = 64"
    },
    {
      id: 4,
      question: "角ABCが90°のとき、この角は何角？",
      options: ["直角", "鋭角", "鈍角", "平角"],
      correctAnswer: 0,
      explanation: "90°は直角"
    },
    {
      id: 5,
      question: "円の半径が5cmのとき、直径は？",
      options: ["10cm", "15cm", "20cm", "25cm"],
      correctAnswer: 0,
      explanation: "直径 = 半径 × 2 = 10cm"
    }
  ],
  high: [
    {
      id: 1,
      question: "sin(30°) = ?",
      options: ["1/2", "√3/2", "1", "0"],
      correctAnswer: 0,
      explanation: "sin(30°) = 1/2"
    },
    {
      id: 2,
      question: "x² - 5x + 6 = 0 の解は？",
      options: ["x = 2, 3", "x = 1, 4", "x = 1, 6", "x = 2, 4"],
      correctAnswer: 0,
      explanation: "(x - 2)(x - 3) = 0"
    },
    {
      id: 3,
      question: "log₂(8) = ?",
      options: ["3", "2", "4", "1"],
      correctAnswer: 0,
      explanation: "2³ = 8"
    },
    {
      id: 4,
      question: "微分: d/dx(x³) = ?",
      options: ["3x²", "2x", "x²", "3x"],
      correctAnswer: 0,
      explanation: "べき乗の微分法則"
    },
    {
      id: 5,
      question: "∫x dx = ?",
      options: ["x²/2 + C", "x + C", "x³/3 + C", "2x + C"],
      correctAnswer: 0,
      explanation: "べき乗の積分法則"
    }
  ],
  university: [
    {
      id: 1,
      question: "ラプラス変換: L{e^(at)} = ?",
      options: ["1/(s-a)", "1/(s+a)", "s/(s-a)", "a/(s-a)"],
      correctAnswer: 0,
      explanation: "指数関数のラプラス変換"
    },
    {
      id: 2,
      question: "フーリエ級数の基本周期が2πの場合、第n次の係数は？",
      options: ["aₙ, bₙ", "cₙ", "fₙ", "gₙ"],
      correctAnswer: 0,
      explanation: "フーリエ級数の係数"
    },
    {
      id: 3,
      question: "行列Aの固有値がλのとき、det(A - λI) = ?",
      options: ["0", "1", "λ", "det(A)"],
      correctAnswer: 0,
      explanation: "固有値の定義"
    },
    {
      id: 4,
      question: "複素数z = a + biの共役複素数は？",
      options: ["a - bi", "a + bi", "-a + bi", "-a - bi"],
      correctAnswer: 0,
      explanation: "共役複素数の定義"
    },
    {
      id: 5,
      question: "ベクトルの外積 a × b の結果は？",
      options: ["ベクトル", "スカラー", "行列", "複素数"],
      correctAnswer: 0,
      explanation: "外積の結果はベクトル"
    }
  ]
};

export const englishQuizData: QuizData = {
  elementary: [
    {
      id: 1,
      question: "What is the English word for '猫'?",
      options: ["Cat", "Dog", "Bird", "Fish"],
      correctAnswer: 0,
      explanation: "猫 = Cat"
    },
    {
      id: 2,
      question: "How do you say 'Hello' in English?",
      options: ["Hello", "Goodbye", "Thank you", "Please"],
      correctAnswer: 0,
      explanation: "こんにちは = Hello"
    },
    {
      id: 3,
      question: "What color is the sun?",
      options: ["Yellow", "Blue", "Red", "Green"],
      correctAnswer: 0,
      explanation: "太陽は黄色 (Yellow)"
    },
    {
      id: 4,
      question: "I ___ a student.",
      options: ["am", "is", "are", "be"],
      correctAnswer: 0,
      explanation: "I am a student."
    },
    {
      id: 5,
      question: "What is the opposite of 'big'?",
      options: ["Small", "Large", "Huge", "Giant"],
      correctAnswer: 0,
      explanation: "big (大きい) の反対は small (小さい)"
    }
  ],
  middle: [
    {
      id: 1,
      question: "She ___ to school every day.",
      options: ["goes", "go", "going", "gone"],
      correctAnswer: 0,
      explanation: "三人称単数現在形"
    },
    {
      id: 2,
      question: "What is the past tense of 'eat'?",
      options: ["ate", "eaten", "eating", "eats"],
      correctAnswer: 0,
      explanation: "eat の過去形は ate"
    },
    {
      id: 3,
      question: "Which is correct? 'I have ___ books.'",
      options: ["many", "much", "a lot", "few"],
      correctAnswer: 0,
      explanation: "可算名詞には many を使う"
    },
    {
      id: 4,
      question: "What does 'beautiful' mean?",
      options: ["美しい", "大きい", "速い", "強い"],
      correctAnswer: 0,
      explanation: "beautiful = 美しい"
    },
    {
      id: 5,
      question: "If it ___ tomorrow, we will stay home.",
      options: ["rains", "rain", "raining", "rained"],
      correctAnswer: 0,
      explanation: "If節では現在形を使う"
    }
  ],
  high: [
    {
      id: 1,
      question: "Which sentence uses the subjunctive mood?",
      options: ["If I were you, I would go.", "I am going to the store.", "She has finished her homework.", "They will arrive soon."],
      correctAnswer: 0,
      explanation: "仮定法過去"
    },
    {
      id: 2,
      question: "What is the meaning of 'procrastinate'?",
      options: ["To delay or postpone", "To hurry up", "To complete quickly", "To forget"],
      correctAnswer: 0,
      explanation: "procrastinate = 先延ばしする"
    },
    {
      id: 3,
      question: "Choose the correct phrase: 'I wish I ___ more time.'",
      options: ["had", "have", "will have", "having"],
      correctAnswer: 0,
      explanation: "wish の後は仮定法"
    },
    {
      id: 4,
      question: "What is a synonym for 'enormous'?",
      options: ["Huge", "Tiny", "Average", "Normal"],
      correctAnswer: 0,
      explanation: "enormous = huge = 巨大な"
    },
    {
      id: 5,
      question: "Which is the correct passive voice? 'The book ___ by many people.'",
      options: ["was read", "read", "is reading", "reads"],
      correctAnswer: 0,
      explanation: "受動態の過去形"
    }
  ],
  university: [
    {
      id: 1,
      question: "What is the etymology of the word 'philosophy'?",
      options: ["Love of wisdom", "Study of nature", "Art of speaking", "Science of numbers"],
      correctAnswer: 0,
      explanation: "philosophy = philo (愛) + sophia (知恵)"
    },
    {
      id: 2,
      question: "Which literary device is used in 'The stars danced in the sky'?",
      options: ["Personification", "Metaphor", "Simile", "Hyperbole"],
      correctAnswer: 0,
      explanation: "星に人間の動作を与える擬人法"
    },
    {
      id: 3,
      question: "What is the meaning of 'ubiquitous'?",
      options: ["Present everywhere", "Very rare", "Extremely large", "Completely hidden"],
      correctAnswer: 0,
      explanation: "ubiquitous = 至る所にある"
    },
    {
      id: 4,
      question: "In linguistics, what is a 'morpheme'?",
      options: ["The smallest meaningful unit", "A type of sentence", "A sound pattern", "A grammar rule"],
      correctAnswer: 0,
      explanation: "morpheme = 最小の意味単位"
    },
    {
      id: 5,
      question: "What does 'cogent' mean in academic writing?",
      options: ["Logical and convincing", "Confusing and unclear", "Emotional and biased", "Simple and basic"],
      correctAnswer: 0,
      explanation: "cogent = 論理的で説得力のある"
    }
  ]
};
