import { useState } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Leaf, Trophy, RefreshCw, ArrowRight, Target } from 'lucide-react';
import { sdgsQuizData, SDGQuestion } from '@/data/sdgs-data';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface SDGsQuizProps {
  language: Language;
}

export default function SDGsQuiz({ language }: SDGsQuizProps) {
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [questions] = useState<SDGQuestion[]>(shuffleQuestions(shuffleArray([...sdgsQuizData])));

  const saveScoreMutation = useMutation({
    mutationFn: async (scoreData: { username: string; quizType: string; level: string; score: number; totalQuestions: number }) => {
      const response = await apiRequest('POST', '/api/quiz/score', scoreData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/leaderboard'] });
    },
  });

  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  const shuffleQuestions = (questions: SDGQuestion[]) => {
    return questions.map(q => {
      const options = [...q.options];
      const correctText = options[q.correctAnswer];
      
      // Shuffle options
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      
      // Find new correct answer index
      const newCorrectAnswer = options.findIndex(opt => opt === correctText);
      
      return {
        ...q,
        options,
        correctAnswer: newCorrectAnswer
      };
    });
  };

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsQuizComplete(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast({
        title: "回答を選択してください",
        description: "答えを選んでから次に進んでください",
        variant: "destructive",
      });
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsQuizComplete(true);
        // Save score to backend
        saveScoreMutation.mutate({
          username: 'Guest', // In production, get from authentication
          quizType: 'sdgs',
          level: 'general',
          score: isCorrect ? score + 1 : score,
          totalQuestions: questions.length
        });
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsQuizComplete(false);
    setIsQuizStarted(false);
  };

  const getSDGIcon = (goalNumber: number) => {
    const icons = {
      1: '🏚️', 2: '🍚', 3: '🏥', 4: '🎓', 5: '⚖️',
      6: '💧', 7: '⚡', 8: '💼', 9: '🏭', 10: '🤝',
      11: '🏙️', 12: '♻️', 13: '🌡️', 14: '🌊', 15: '🌳',
      16: '⚖️', 17: '🤝'
    };
    return icons[goalNumber as keyof typeof icons] || '🎯';
  };

  if (!isQuizStarted) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              {t('module.sdgs-quiz')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-6xl">🌍</div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  SDGs（持続可能な開発目標）クイズ
                </h2>
                <p className="text-gray-600 mb-6">
                  SDGsの17の目標について学びながらクイズに挑戦しよう！
                </p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">SDGsとは？</h3>
                <p className="text-sm text-purple-700 mb-4">
                  持続可能な開発目標（SDGs）は、2030年までに持続可能でよりよい世界を目指す国際目標です。
                  17のゴール・169のターゲットから構成され、地球上の「誰一人取り残さない」ことを誓っています。
                </p>
                
                <div className="grid grid-cols-6 gap-2 text-2xl">
                  {Array.from({length: 17}, (_, i) => (
                    <div key={i} title={`目標${i + 1}`}>
                      {getSDGIcon(i + 1)}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>クイズ内容:</strong> {questions.length}問（ランダム出題）
                  </p>
                </div>
                
                <Button
                  onClick={handleStartQuiz}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 text-lg"
                >
                  <Target className="h-5 w-5 mr-2" />
                  クイズを開始
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (isQuizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              クイズ完了！
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-6xl">
                {percentage >= 80 ? '🌟' : percentage >= 60 ? '🌱' : '🌍'}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  SDGsクイズの結果
                </h2>
                <p className="text-lg text-gray-600">
                  {questions.length}問中{score}問正解
                </p>
                <p className="text-3xl font-bold text-purple-500 mt-2">
                  {percentage}%
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">SDGsレベル</p>
                <p className="text-lg font-semibold">
                  {percentage >= 80 ? 'SDGsエキスパート！' : 
                   percentage >= 60 ? 'SDGs理解者！' : 
                   'SDGsを学ぼう！'}
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-700">
                  SDGsについてもっと学んで、持続可能な社会づくりに貢献しましょう！
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={handleStartQuiz}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  もう一度
                </Button>
                
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                >
                  トップに戻る
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              {t('module.sdgs-quiz')}
            </div>
            <Button onClick={resetQuiz} variant="outline" size="sm">
              戻る
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>問題 {currentQuestionIndex + 1} / {questions.length}</span>
                <span>スコア: {score}</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                {currentQuestion.goal > 0 && (
                  <div className="text-4xl mr-4">
                    {getSDGIcon(currentQuestion.goal)}
                  </div>
                )}
                <div className="text-center">
                  {currentQuestion.goal > 0 && (
                    <p className="text-sm text-purple-600 font-medium">
                      SDGs目標{currentQuestion.goal}
                    </p>
                  )}
                  <h3 className="text-xl font-semibold">
                    {currentQuestion.question}
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`p-4 h-auto text-left justify-start transition-all ${
                      selectedAnswer === index
                        ? showResult
                          ? index === currentQuestion.correctAnswer
                            ? 'bg-green-500 hover:bg-green-500 text-white'
                            : 'bg-red-500 hover:bg-red-500 text-white'
                          : 'bg-cat-yellow hover:bg-cat-yellow text-gray-800'
                        : showResult && index === currentQuestion.correctAnswer
                          ? 'bg-green-500 hover:bg-green-500 text-white'
                          : 'bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-gray-400 text-gray-800'
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              
              {showResult && (
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-800">
                    {currentQuestion.explanation}
                  </p>
                  {currentQuestion.goal > 0 && (
                    <p className="text-xs text-purple-600 mt-2">
                      関連目標: {currentQuestion.goalTitle}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Next Button */}
            {!showResult && (
              <div className="flex justify-center">
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3"
                >
                  {currentQuestionIndex + 1 === questions.length ? '結果を見る' : '次の問題'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
