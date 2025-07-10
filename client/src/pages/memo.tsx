import { useState, useEffect } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { StickyNote, Save, Trash2, Plus } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Memo } from '@shared/schema';

interface MemoProps {
  language: Language;
}

export default function Memo({ language }: MemoProps) {
  const { t } = useTranslation(language);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user ID - in production, this would come from authentication
  const userId = 1;

  const { data: memos, isLoading } = useQuery({
    queryKey: ['/api/memos', userId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/memos/${userId}`);
      return response.json();
    },
  });

  const createMemoMutation = useMutation({
    mutationFn: async (newMemo: { title: string; content: string; userId: number }) => {
      const response = await apiRequest('POST', '/api/memos', newMemo);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/memos', userId] });
      toast({
        title: "Success",
        description: "Memo saved successfully!",
      });
      setTitle('');
      setContent('');
      setIsEditing(false);
    },
  });

  const updateMemoMutation = useMutation({
    mutationFn: async ({ id, ...updateData }: { id: number; title: string; content: string }) => {
      const response = await apiRequest('PUT', `/api/memos/${id}`, updateData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/memos', userId] });
      toast({
        title: "Success",
        description: "Memo updated successfully!",
      });
      setIsEditing(false);
    },
  });

  const deleteMemoMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/memos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/memos', userId] });
      toast({
        title: "Success",
        description: "Memo deleted successfully!",
      });
      setSelectedMemo(null);
      setTitle('');
      setContent('');
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
        variant: "destructive",
      });
      return;
    }

    if (selectedMemo && isEditing) {
      updateMemoMutation.mutate({ id: selectedMemo.id, title, content });
    } else {
      createMemoMutation.mutate({ title, content, userId });
    }
  };

  const handleSelectMemo = (memo: Memo) => {
    setSelectedMemo(memo);
    setTitle(memo.title);
    setContent(memo.content);
    setIsEditing(false);
  };

  const handleNewMemo = () => {
    setSelectedMemo(null);
    setTitle('');
    setContent('');
    setIsEditing(true);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    if (selectedMemo) {
      deleteMemoMutation.mutate(selectedMemo.id);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-cat-yellow rounded-full flex items-center justify-center mr-4">
                <StickyNote className="h-6 w-6 text-white" />
              </div>
              {t('module.memo')}
            </div>
            <Button onClick={handleNewMemo} className="bg-cat-yellow hover:bg-yellow-300 text-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              新しいメモ
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Memo List */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 mb-3">保存されたメモ</h3>
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cat-yellow mx-auto"></div>
                </div>
              ) : memos?.length === 0 ? (
                <p className="text-gray-500 text-sm">メモがありません</p>
              ) : (
                memos?.map((memo: Memo) => (
                  <div
                    key={memo.id}
                    onClick={() => handleSelectMemo(memo)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMemo?.id === memo.id ? 'bg-cat-yellow' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <h4 className="font-medium truncate">{memo.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{memo.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(memo.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Memo Editor */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  タイトル
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="メモのタイトルを入力..."
                  disabled={!isEditing && !selectedMemo}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  内容
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="メモの内容を入力..."
                  className="h-64"
                  disabled={!isEditing && !selectedMemo}
                />
              </div>

              <div className="flex justify-between space-x-2">
                <div className="flex space-x-2">
                  {isEditing ? (
                    <Button 
                      onClick={handleSave}
                      disabled={createMemoMutation.isPending || updateMemoMutation.isPending}
                      className="bg-cat-yellow hover:bg-yellow-300 text-gray-800"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {t('action.save')}
                    </Button>
                  ) : selectedMemo ? (
                    <Button onClick={handleEdit} variant="outline">
                      編集
                    </Button>
                  ) : null}
                </div>
                
                {selectedMemo && (
                  <Button
                    onClick={handleDelete}
                    disabled={deleteMemoMutation.isPending}
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    削除
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
