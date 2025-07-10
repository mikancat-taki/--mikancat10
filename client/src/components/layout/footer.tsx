import { useTranslation, Language } from '@/lib/i18n';
import { Github } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export function Footer({ language }: FooterProps) {
  const { t } = useTranslation(language);

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-cat-pink rounded-full flex items-center justify-center">
              🐱
            </div>
            <span className="text-gray-600 text-sm">© 2024 {t('app.title')}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Github className="h-4 w-4 mr-2" />
              Deploy Ready: Glitch・Render
            </span>
            <div className="flex space-x-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Multi-Language</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Responsive</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
