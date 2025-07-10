import { Language } from '@/lib/i18n';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  return (
    <Select value={language} onValueChange={onLanguageChange}>
      <SelectTrigger className="w-32 bg-cat-yellow border-cat-yellow hover:bg-yellow-300">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ja">🇯🇵 日本語</SelectItem>
        <SelectItem value="zh">🇨🇳 中文</SelectItem>
        <SelectItem value="en">🇺🇸 English</SelectItem>
      </SelectContent>
    </Select>
  );
}
