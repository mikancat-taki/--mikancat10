import { useState, useEffect } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock as ClockIcon, Calendar, Globe } from 'lucide-react';

interface ClockProps {
  language: Language;
}

export default function Clock({ language }: ClockProps) {
  const { t } = useTranslation(language);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeZone, setTimeZone] = useState('Asia/Tokyo');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timeZone: string) => {
    return date.toLocaleTimeString('ja-JP', {
      timeZone: timeZone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date, timeZone: string) => {
    return date.toLocaleDateString('ja-JP', {
      timeZone: timeZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const getTimeZoneName = (tz: string) => {
    const names: Record<string, string> = {
      'Asia/Tokyo': '日本時間 (JST)',
      'America/New_York': 'ニューヨーク時間 (EST/EDT)',
      'Europe/London': 'ロンドン時間 (GMT/BST)',
      'Asia/Shanghai': '北京時間 (CST)',
      'America/Los_Angeles': 'ロサンゼルス時間 (PST/PDT)',
      'Europe/Paris': 'パリ時間 (CET/CEST)',
      'Asia/Seoul': 'ソウル時間 (KST)',
      'Australia/Sydney': 'シドニー時間 (AEST/AEDT)'
    };
    return names[tz] || tz;
  };

  const timeZones = [
    'Asia/Tokyo',
    'America/New_York',
    'Europe/London',
    'Asia/Shanghai',
    'America/Los_Angeles',
    'Europe/Paris',
    'Asia/Seoul',
    'Australia/Sydney'
  ];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-12 h-12 bg-cat-blue rounded-full flex items-center justify-center mr-4">
              <ClockIcon className="h-6 w-6 text-white" />
            </div>
            {t('module.clock')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Main Clock Display */}
            <div className="text-center bg-gradient-to-br from-cat-blue to-cat-purple rounded-2xl p-8 text-white">
              <div className="text-6xl md:text-8xl font-mono font-bold mb-4">
                {formatTime(currentTime, timeZone)}
              </div>
              <div className="flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="text-xl">
                  {formatDate(currentTime, timeZone)}
                </span>
              </div>
              <div className="flex items-center justify-center">
                <Globe className="h-4 w-4 mr-2" />
                <span className="text-lg opacity-90">
                  {getTimeZoneName(timeZone)}
                </span>
              </div>
            </div>

            {/* Time Zone Selector */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">世界の時間</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeZones.map((tz) => (
                  <div
                    key={tz}
                    onClick={() => setTimeZone(tz)}
                    className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                      timeZone === tz
                        ? 'border-cat-blue bg-cat-blue text-white'
                        : 'border-gray-200 bg-white hover:border-cat-blue hover:bg-blue-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-2xl font-mono font-bold mb-1">
                        {formatTime(currentTime, tz)}
                      </div>
                      <div className="text-sm opacity-80">
                        {getTimeZoneName(tz)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Clock Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="text-center p-4">
                <div className="text-3xl font-bold text-cat-pink mb-2">
                  {currentTime.getHours()}
                </div>
                <div className="text-sm text-gray-600">時</div>
              </Card>
              
              <Card className="text-center p-4">
                <div className="text-3xl font-bold text-cat-mint mb-2">
                  {currentTime.getMinutes().toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600">分</div>
              </Card>
              
              <Card className="text-center p-4">
                <div className="text-3xl font-bold text-cat-yellow mb-2">
                  {currentTime.getSeconds().toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-600">秒</div>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 mb-3">時計について</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div>
                  <strong>現在の年:</strong> {currentTime.getFullYear()}年
                </div>
                <div>
                  <strong>今年の経過日数:</strong> {Math.floor((currentTime.getTime() - new Date(currentTime.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000)) + 1}日
                </div>
                <div>
                  <strong>Unix タイムスタンプ:</strong> {Math.floor(currentTime.getTime() / 1000)}
                </div>
                <div>
                  <strong>今日の曜日:</strong> {['日', '月', '火', '水', '木', '金', '土'][currentTime.getDay()]}曜日
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}