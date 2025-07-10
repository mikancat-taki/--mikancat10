import { useState, useEffect, useRef } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send } from 'lucide-react';
import { useWebSocket } from '@/hooks/use-websocket';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { ChatMessage } from '@shared/schema';

interface ChatProps {
  language: Language;
}

export default function Chat({ language }: ChatProps) {
  const { t } = useTranslation(language);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { isConnected, messages: wsMessages, sendMessage } = useWebSocket('/ws');

  const { data: chatHistory, refetch } = useQuery({
    queryKey: ['/api/chat/messages'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/chat/messages?limit=50');
      return response.json();
    },
    enabled: isUsernameSet,
  });

  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (chatHistory) {
      setAllMessages(chatHistory);
    }
  }, [chatHistory]);

  useEffect(() => {
    wsMessages.forEach((wsMessage) => {
      if (wsMessage.type === 'chat' && wsMessage.data) {
        setAllMessages((prev) => {
          const exists = prev.find((msg) => msg.id === wsMessage.data.id);
          if (!exists) {
            return [...prev, wsMessage.data];
          }
          return prev;
        });
      }
    });
  }, [wsMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  const handleSetUsername = () => {
    if (username.trim()) {
      setIsUsernameSet(true);
      refetch();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && isConnected) {
      sendMessage({
        type: 'chat',
        username,
        message: message.trim(),
      });
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isUsernameSet) {
        handleSetUsername();
      } else {
        handleSendMessage();
      }
    }
  };

  if (!isUsernameSet) {
    return (
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="w-12 h-12 bg-cat-pink rounded-full flex items-center justify-center mr-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              {t('module.chat')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4">チャットを始めるにはユーザー名を入力してください</p>
                <div className="flex space-x-2">
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="ユーザー名を入力..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSetUsername}
                    disabled={!username.trim()}
                    className="bg-cat-pink hover:bg-red-400 text-white"
                  >
                    チャット開始
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-cat-pink rounded-full flex items-center justify-center mr-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              {t('module.chat')}
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isConnected ? '接続中' : '切断中'}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {allMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>メッセージがありません</p>
                  <p className="text-sm">最初のメッセージを送信してください！</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.username === username ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.username === username
                            ? 'bg-cat-pink text-white'
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        <div className="text-xs text-gray-500 mb-1">
                          {msg.username} • {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                        <div className="text-sm">{msg.message}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="メッセージを入力..."
                className="flex-1"
                disabled={!isConnected}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || !isConnected}
                className="bg-cat-pink hover:bg-red-400 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                {t('action.send')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
