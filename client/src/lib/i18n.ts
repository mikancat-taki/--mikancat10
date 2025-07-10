export type Language = 'ja' | 'zh' | 'en';

export interface Translations {
  [key: string]: {
    ja: string;
    zh: string;
    en: string;
  };
}

export const translations: Translations = {
  // Header
  'app.title': {
    ja: '勉強ねこ',
    zh: '学习猫',
    en: 'Study Cat'
  },
  'app.subtitle': {
    ja: 'Study Cat',
    zh: 'Study Cat',
    en: 'Study Cat'
  },
  
  // Navigation
  'nav.home': {
    ja: 'ホーム',
    zh: '首页',
    en: 'Home'
  },
  'nav.back': {
    ja: '戻る',
    zh: '返回',
    en: 'Back'
  },
  
  // Modules
  'module.translator': {
    ja: '翻訳ツール',
    zh: '翻译工具',
    en: 'Translator'
  },
  'module.clock': {
    ja: '時計',
    zh: '时钟',
    en: 'Clock'
  },
  'module.calculator': {
    ja: '電卓',
    zh: '计算器',
    en: 'Calculator'
  },
  'module.memo': {
    ja: 'メモ帳',
    zh: '记事本',
    en: 'Memo'
  },
  'module.drawing': {
    ja: 'お絵描き',
    zh: '绘画',
    en: 'Drawing'
  },
  'module.chat': {
    ja: 'チャット',
    zh: '聊天',
    en: 'Chat'
  },
  'module.math-quiz': {
    ja: '算数クイズ',
    zh: '数学测验',
    en: 'Math Quiz'
  },
  'module.english-quiz': {
    ja: '英語クイズ',
    zh: '英语测验',
    en: 'English Quiz'
  },
  'module.geography': {
    ja: '地理タイピング',
    zh: '地理打字',
    en: 'Geography Typing'
  },
  'module.sdgs-quiz': {
    ja: 'SDGsクイズ',
    zh: 'SDGs测验',
    en: 'SDGs Quiz'
  },
  
  // Welcome
  'welcome.title': {
    ja: 'ようこそ、勉強ねこへ！',
    zh: '欢迎来到学习猫！',
    en: 'Welcome to Study Cat!'
  },
  'welcome.subtitle': {
    ja: '楽しく学習しましょう',
    zh: '让我们快乐学习吧',
    en: 'Let\'s learn together!'
  },
  
  // Quiz levels
  'level.elementary': {
    ja: '小学生',
    zh: '小学',
    en: 'Elementary'
  },
  'level.middle': {
    ja: '中学生',
    zh: '中学',
    en: 'Middle School'
  },
  'level.high': {
    ja: '高校生',
    zh: '高中',
    en: 'High School'
  },
  'level.university': {
    ja: '大学生',
    zh: '大学',
    en: 'University'
  },
  
  // Actions
  'action.translate': {
    ja: '翻訳',
    zh: '翻译',
    en: 'Translate'
  },
  'action.clear': {
    ja: 'クリア',
    zh: '清除',
    en: 'Clear'
  },
  'action.save': {
    ja: '保存',
    zh: '保存',
    en: 'Save'
  },
  'action.send': {
    ja: '送信',
    zh: '发送',
    en: 'Send'
  },
  
  // Common
  'common.score': {
    ja: 'スコア',
    zh: '分数',
    en: 'Score'
  },
  'common.question': {
    ja: '問題',
    zh: '问题',
    en: 'Question'
  },
  'common.correct': {
    ja: '正解',
    zh: '正确',
    en: 'Correct'
  },
  'common.incorrect': {
    ja: '不正解',
    zh: '错误',
    en: 'Incorrect'
  }
};

export function useTranslation(language: Language) {
  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };
  
  return { t };
}
