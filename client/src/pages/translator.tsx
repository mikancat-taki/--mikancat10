import { useState } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages, ArrowRight } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface TranslatorProps {
  language: Language;
}

export default function Translator({ language }: TranslatorProps) {
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLang, setFromLang] = useState<Language>('ja');
  const [toLang, setToLang] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to translate",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/translate', {
        text: sourceText,
        from: fromLang,
        to: toLang
      });
      
      const data = await response.json();
      setTranslatedText(data.translation);
    } catch (error) {
      toast({
        title: "Translation Error",
        description: "Failed to translate text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-12 h-12 bg-cat-teal rounded-full flex items-center justify-center mr-4">
              <Languages className="h-6 w-6 text-white" />
            </div>
            {t('module.translator')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Language Selection */}
            <div className="flex items-center justify-center space-x-4">
              <Select value={fromLang} onValueChange={setFromLang}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                  <SelectItem value="zh">🇨🇳 中文</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                </SelectContent>
              </Select>
              
              <ArrowRight className="h-4 w-4 text-gray-400" />
              
              <Select value={toLang} onValueChange={setToLang}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                  <SelectItem value="zh">🇨🇳 中文</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Translation Areas */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  翻訳元
                </label>
                <Textarea
                  value={sourceText}
                  onChange={(e) => setSourceText(e.target.value)}
                  placeholder="ここにテキストを入力..."
                  className="h-40"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  翻訳結果
                </label>
                <div className="h-40 p-4 bg-gray-50 border border-gray-300 rounded-md overflow-y-auto">
                  {translatedText || (
                    <span className="text-gray-400">翻訳結果がここに表示されます</span>
                  )}
                </div>
              </div>
            </div>

            {/* Translate Button */}
            <div className="flex justify-center">
              <Button 
                onClick={handleTranslate} 
                disabled={isLoading}
                className="bg-cat-teal hover:bg-teal-600 text-white"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    翻訳中...
                  </>
                ) : (
                  <>
                    <Languages className="h-4 w-4 mr-2" />
                    {t('action.translate')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
