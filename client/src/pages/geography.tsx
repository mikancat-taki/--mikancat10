import { useState, useEffect } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Globe, Trophy, RefreshCw, ArrowRight, MapPin } from 'lucide-react';
import { geographyData, Country } from '@/data/geography-data';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface GeographyProps {
  language: Language;
}

type Continent = 'africa' | 'europe' | 'asia' | 'north-america' | 'south-america';

export default function Geography({ language }: GeographyProps) {
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [gameMode, setGameMode] = useState<'typing' | 'quiz'>('typing');
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameActive, setIsGameActive] = useState(false);

  const saveScoreMutation = useMutation({
    mutationFn: async (scoreData: { username: string; quizType: string; level: string; score: number; totalQuestions: number }) => {
      const response = await apiRequest('POST', '/api/quiz/score', scoreData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/leaderboard'] });
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isGameActive) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isGameActive]);

  const handleContinentSelect = (continent: Continent, mode: 'typing' | 'quiz') => {
    setSelectedContinent(continent);
    setGameMode(mode);
    const continentCountries = geographyData[continent];
    setCountries(shuffleArray([...continentCountries]));
    setCurrentCountryIndex(0);
    setScore(0);
    setUserAnswer('');
    setShowResult(false);
    setIsQuizComplete(false);
    setTimeLeft(30);
    setIsGameActive(true);
  };

  const shuffleArray = (array: Country[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) {
      toast({
        title: "回答を入力してください",
        description: "国名を入力してから送信してください",
        variant: "destructive",
      });
      return;
    }

    setIsGameActive(false);
    const currentCountry = countries[currentCountryIndex];
    const isCorrect = userAnswer.toLowerCase().trim() === currentCountry.name.toLowerCase() ||
                     userAnswer.trim() === currentCountry.nameJa;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentCountryIndex + 1 < countries.length) {
        setCurrentCountryIndex(currentCountryIndex + 1);
        setUserAnswer('');
        setShowResult(false);
        setTimeLeft(30);
        setIsGameActive(true);
      } else {
        setIsQuizComplete(true);
        // Save score to backend
        saveScoreMutation.mutate({
          username: 'Guest', // In production, get from authentication
          quizType: 'geography',
          level: selectedContinent!,
          score: isCorrect ? score + 1 : score,
          totalQuestions: countries.length
        });
      }
    }, 2000);
  };

  const handleTimeUp = () => {
    setIsGameActive(false);
    setShowResult(true);
    
    setTimeout(() => {
      if (currentCountryIndex + 1 < countries.length) {
        setCurrentCountryIndex(currentCountryIndex + 1);
        setUserAnswer('');
        setShowResult(false);
        setTimeLeft(30);
        setIsGameActive(true);
      } else {
        setIsQuizComplete(true);
        saveScoreMutation.mutate({
          username: 'Guest',
          quizType: 'geography',
          level: selectedContinent!,
          score: score,
          totalQuestions: countries.length
        });
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isGameActive) {
      handleSubmitAnswer();
    }
  };

  const resetQuiz = () => {
    setSelectedContinent(null);
    setCurrentCountryIndex(0);
    setScore(0);
    setUserAnswer('');
    setShowResult(false);
    setIsQuizComplete(false);
    setCountries([]);
    setIsGameActive(false);
    setTimeLeft(30);
  };

  const getContinentColor = (continent: Continent) => {
    switch (continent) {
      case 'africa': return 'bg-orange-500';
      case 'europe': return 'bg-blue-500';
      case 'asia': return 'bg-green-500';
      case 'north-america': return 'bg-purple-500';
      case 'south-america': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getContinentName = (continent: Continent) => {
    switch (continent) {
      case 'africa': return 'アフリカ';
      case 'europe': return 'ヨーロッパ';
      case 'asia': return 'アジア';
      case 'north-america': return '北アメリカ';
      case 'south-america': return '南アメリカ';
      default: return continent;
    }
  };

  if (!selectedContinent) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              {t('module.geography')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">大陸を選択してください</h2>
              <p className="text-gray-600">国名を覚えてタイピングやクイズで挑戦しよう！</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(geographyData).map(([continent, countries]) => (
                <div key={continent} className="space-y-3">
                  <div className={`${getContinentColor(continent as Continent)} text-white p-4 rounded-lg text-center`}>
                    <h3 className="text-lg font-semibold mb-2">
                      {getContinentName(continent as Continent)}
                    </h3>
                    <p className="text-sm opacity-90">{countries.length}カ国</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleContinentSelect(continent as Continent, 'typing')}
                      className="w-full"
                      variant="outline"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      タイピングゲーム
                    </Button>
                    
                    <Button
                      onClick={() => handleContinentSelect(continent as Continent, 'quiz')}
                      className="w-full"
                      variant="outline"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      クイズモード
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isQuizComplete) {
    const percentage = Math.round((score / countries.length) * 100);
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              ゲーム完了！
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-6xl">
                {percentage >= 80 ? '🌍' : percentage >= 60 ? '🗺️' : '🌎'}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {getContinentName(selectedContinent)}の結果
                </h2>
                <p className="text-lg text-gray-600">
                  {countries.length}カ国中{score}カ国正解
                </p>
                <p className="text-3xl font-bold text-green-500 mt-2">
                  {percentage}%
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">評価</p>
                <p className="text-lg font-semibold">
                  {percentage >= 80 ? '地理博士！' : 
                   percentage >= 60 ? '地理通！' : 
                   '地理を勉強しよう！'}
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => handleContinentSelect(selectedContinent, gameMode)}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  もう一度
                </Button>
                
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                >
                  大陸選択に戻る
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const currentCountry = countries[currentCountryIndex];
  const progress = ((currentCountryIndex + 1) / countries.length) * 100;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${getContinentColor(selectedContinent)} rounded-full flex items-center justify-center mr-4`}>
                <Globe className="h-6 w-6 text-white" />
              </div>
              {getContinentName(selectedContinent)} - {gameMode === 'typing' ? 'タイピング' : 'クイズ'}
            </div>
            <Button onClick={resetQuiz} variant="outline" size="sm">
              戻る
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Progress and Timer */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>国 {currentCountryIndex + 1} / {countries.length}</span>
                <span>スコア: {score}</span>
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
                  時間: {timeLeft}秒
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  この国の名前は何ですか？
                </h3>
                <div className="text-4xl mb-4">🏴‍☠️</div>
                <p className="text-lg text-gray-600">
                  首都: {currentCountry.capitalJa} ({currentCountry.capital})
                </p>
              </div>
              
              {!showResult ? (
                <div className="space-y-4">
                  <Input
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="国名を入力してください（英語または日本語）"
                    className="text-center text-lg"
                    disabled={!isGameActive}
                  />
                  
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!userAnswer.trim() || !isGameActive}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3"
                  >
                    回答する
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`text-2xl font-bold ${
                    userAnswer.toLowerCase().trim() === currentCountry.name.toLowerCase() ||
                    userAnswer.trim() === currentCountry.nameJa
                      ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {userAnswer.toLowerCase().trim() === currentCountry.name.toLowerCase() ||
                     userAnswer.trim() === currentCountry.nameJa
                      ? '正解！' : '不正解'}
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-lg font-semibold text-blue-800">
                      正解: {currentCountry.nameJa} ({currentCountry.name})
                    </p>
                    <p className="text-sm text-blue-600">
                      首都: {currentCountry.capitalJa} ({currentCountry.capital})
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
