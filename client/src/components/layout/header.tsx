import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTranslation, Language } from '@/lib/i18n';
import { LanguageSelector } from '@/components/ui/language-selector';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function Header({ language, onLanguageChange }: HeaderProps) {
  const { t } = useTranslation(language);
  const [location] = useLocation();
  const isHome = location === '/';

  return (
    <header className="bg-white shadow-lg border-b-4 border-cat-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            {!isHome && (
              <Link href="/">
                <Button variant="ghost" size="sm" className="mr-2">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  {t('nav.back')}
                </Button>
              </Link>
            )}
            <div className="w-10 h-10 bg-cat-pink rounded-full flex items-center justify-center">
              🐱
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t('app.title')}</h1>
              <span className="text-sm text-gray-600">{t('app.subtitle')}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cat-purple rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
