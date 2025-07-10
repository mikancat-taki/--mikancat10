import { useState, useEffect } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SpellCheck, Trophy, RefreshCw, ArrowRight } from 'lucide-react';
import { englishQuizData, QuizQuestion } from '@/data/quiz-data';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface EnglishQuizProps {
  language: Language;
}

type Level = 'elementary' | 'middle' | 'high' | 'university';

export default function EnglishQuiz({ language }: EnglishQuizProps) {
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const saveScoreMutation = useMutation({
    mutationFn: async (scoreData: { username: string; quizType: string; level: string; score: number; totalQuestions: number }) => {
      const response = await apiRequest('POST', '/api/quiz/score', scoreData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/leaderboard'] });
    },
  });

  const shuffleQuestions = (questions: QuizQuestion[]) => {
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

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
    setQuestions(shuffleQuestions(englishQuizData[level]));
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
          quizType: 'english',
          level: selectedLevel!,
          score: isCorrect ? score + 1 : score,
          totalQuestions: questions.length
        });
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setSelectedLevel(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsQuizComplete(false);
    setQuestions([]);
  };

  const getLevelColor = (level: Level) => {
    switch (level) {
      case 'elementary': return 'bg-blue-100 hover:bg-blue-200 text-blue-800';
      case 'middle': return 'bg-blue-200 hover:bg-blue-300 text-blue-800';
      case 'high': return 'bg-blue-300 hover:bg-blue-400 text-blue-800';
      case 'university': return 'bg-blue-400 hover:bg-blue-500 text-white';
      default: return 'bg-gray-100 hover:bg-gray-200';
    }
  };

  const getLevelTitle = (level: Level) => {
    switch (level) {
      case 'elementary': return t('level.elementary');
      case 'middle': return t('level.middle');
      case 'high': return t('level.high');
      case 'university': return t('level.university');
      default: return level;
    }
  };

  if (!selectedLevel) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <SpellCheck className="h-6 w-6 text-white" />
              </div>
              {t('module.english-quiz')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">レベルを選択してください</h2>
              <p className="text-gray-600">あなたの英語学習レベルに合わせて問題を選んでください</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => handleLevelSelect('elementary')}
                className={`p-6 h-auto flex-col ${getLevelColor('elementary')}`}
              >
                <div className="text-lg font-semibold mb-2">{getLevelTitle('elementary')}</div>
                <div className="text-sm opacity-80">基本的な単語・文法</div>
              </Button>
              
              <Button
                onClick={() => handleLevelSelect('middle')}
                className={`p-6 h-auto flex-col ${getLevelColor('middle')}`}
              >
                <div className="text-lg font-semibold mb-2">{getLevelTitle('middle')}</div>
                <div className="text-sm opacity-80">文法・語彙の拡張</div>
              </Button>
              
              <Button
                onClick={() => handleLevelSelect('high')}
                className={`p-6 h-auto flex-col ${getLevelColor('high')}`}
              >
                <div className="text-lg font-semibold mb-2">{getLevelTitle('high')}</div>
                <div className="text-sm opacity-80">高度な文法・表現</div>
              </Button>
              
              <Button
                onClick={() => handleLevelSelect('university')}
                className={`p-6 h-auto flex-col ${getLevelColor('university')}`}
              >
                <div className="text-lg font-semibold mb-2">{getLevelTitle('university')}</div>
                <div className="text-sm opacity-80">学術的な英語</div>
              </Button>
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
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              クイズ完了！
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-6xl">
                {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {getLevelTitle(selectedLevel)}の結果
                </h2>
                <p className="text-lg text-gray-600">
                  {questions.length}問中{score}問正解
                </p>
                <p className="text-3xl font-bold text-blue-500 mt-2">
                  {percentage}%
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">評価</p>
                <p className="text-lg font-semibold">
                  {percentage >= 80 ? 'Excellent!' : 
                   percentage >= 60 ? 'Good job!' : 
                   'Keep practicing!'}
                </p>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => handleLevelSelect(selectedLevel)}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  もう一度
                </Button>
                
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                >
                  レベル選択に戻る
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
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <SpellCheck className="h-6 w-6 text-white" />
              </div>
              {t('module.english-quiz')} - {getLevelTitle(selectedLevel)}
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
              <h3 className="text-xl font-semibold mb-6 text-center">
                {currentQuestion.question}
              </h3>
              
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
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Next Button */}
            {!showResult && (
              <div className="flex justify-center">
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3"
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
