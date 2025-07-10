import { useTranslation, Language } from '@/lib/i18n';
import { ModuleCard } from '@/components/ui/module-card';
import { 
  Languages, 
  Clock, 
  Calculator, 
  StickyNote, 
  Paintbrush, 
  MessageCircle, 
  SquareRadical, 
  SpellCheck, 
  Globe, 
  Leaf 
} from 'lucide-react';

interface HomeProps {
  language: Language;
}

export default function Home({ language }: HomeProps) {
  const { t } = useTranslation(language);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cat-pink to-cat-purple text-white rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">{t('welcome.title')}</h2>
          <p className="text-lg opacity-90">{t('welcome.subtitle')}</p>
        </div>
        <div className="absolute right-8 top-4 w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
          🐱
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <ModuleCard
          title={t('module.translator')}
          description="日本語・中国語・英語の翻訳"
          icon={Languages}
          href="/translator"
          color="border-cat-teal"
          tags={['多言語対応']}
        />
        
        <ModuleCard
          title={t('module.clock')}
          description="現在時刻の確認"
          icon={Clock}
          href="/clock"
          color="border-cat-blue"
        />
        
        <ModuleCard
          title={t('module.calculator')}
          description="計算機能"
          icon={Calculator}
          href="/calculator"
          color="border-cat-mint"
          tags={['基本計算']}
        />
        
        <ModuleCard
          title={t('module.memo')}
          description="ノート機能"
          icon={StickyNote}
          href="/memo"
          color="border-cat-yellow"
          tags={['保存・読込']}
        />
        
        <ModuleCard
          title={t('module.drawing')}
          description="絵を描く"
          icon={Paintbrush}
          href="/drawing"
          color="border-cat-purple"
          tags={['描画ツール']}
        />
        
        <ModuleCard
          title={t('module.chat')}
          description="オンライン会話"
          icon={MessageCircle}
          href="/chat"
          color="border-cat-pink"
          tags={['リアルタイム']}
        />

        {/* Quiz Section Header */}
        <div className="col-span-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-3">🎓</span>
            クイズ・学習ゲーム
          </h2>
        </div>

        <ModuleCard
          title={t('module.math-quiz')}
          description="数学問題"
          icon={SquareRadical}
          href="/math-quiz"
          color="border-red-500"
          tags={[t('level.elementary'), t('level.middle'), t('level.high'), t('level.university')]}
        />
        
        <ModuleCard
          title={t('module.english-quiz')}
          description="英語学習"
          icon={SpellCheck}
          href="/english-quiz"
          color="border-blue-500"
          tags={[t('level.elementary'), t('level.middle'), t('level.high'), t('level.university')]}
        />
        
        <ModuleCard
          title={t('module.geography')}
          description="国名クイズ"
          icon={Globe}
          href="/geography"
          color="border-green-500"
          tags={['アフリカ', 'ヨーロッパ', 'アジア', 'アメリカ']}
        />
        
        <ModuleCard
          title={t('module.sdgs-quiz')}
          description="持続可能な開発目標"
          icon={Leaf}
          href="/sdgs-quiz"
          color="border-purple-500"
          tags={['17の目標']}
        />
      </div>
    </main>
  );
}
