import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface LyricItem {
  id: number;
  title: string;
  author: string;
  genre: string;
  language: string;
  content: string;
  type: 'karaoke' | 'poem';
  popularity: number;
}

const mockLyrics: LyricItem[] = [
  {
    id: 1,
    title: "Лунная дорожка",
    author: "MusicalFox AI",
    genre: "Лирика",
    language: "Русский",
    content: "По лунной дорожке\nИду я домой\nСреди тишины ночной...",
    type: "karaoke",
    popularity: 95
  },
  {
    id: 2,
    title: "Весенний ветер",
    author: "Анна Лисова",
    genre: "Природа",
    language: "Русский", 
    content: "Весенний ветер играет\nС листвой молодой\nПесню свободы поёт...",
    type: "poem",
    popularity: 87
  },
  {
    id: 3,
    title: "City Lights",
    author: "Fox Studio",
    genre: "Urban",
    language: "English",
    content: "City lights are calling me\nThrough the endless night\nDreaming of what I could be...",
    type: "karaoke",
    popularity: 92
  },
  {
    id: 4,
    title: "Рыжая лисица",
    author: "MusicalFox AI",
    genre: "Детские",
    language: "Русский",
    content: "Рыжая лисица\nПо лесу бежит\nХвостиком пушистым\nВесело кружит...",
    type: "karaoke",
    popularity: 89
  }
];

const LyricsLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'karaoke' | 'poem'>('all');
  const [selectedLyric, setSelectedLyric] = useState<LyricItem | null>(null);

  const filteredLyrics = mockLyrics.filter(lyric => {
    const matchesSearch = lyric.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lyric.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lyric.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || lyric.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 font-dancing">
            <Icon name="BookOpen" size={24} className="text-orange-500" />
            <span>Библиотека Текстов</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Поиск по названию, автору или жанру..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedType('all')}
                size="sm"
              >
                Все
              </Button>
              <Button
                variant={selectedType === 'karaoke' ? 'default' : 'outline'}
                onClick={() => setSelectedType('karaoke')}
                size="sm"
              >
                <Icon name="Mic" size={16} className="mr-1" />
                Караоке
              </Button>
              <Button
                variant={selectedType === 'poem' ? 'default' : 'outline'}
                onClick={() => setSelectedType('poem')}
                size="sm"
              >
                <Icon name="Feather" size={16} className="mr-1" />
                Стихи
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLyrics.map((lyric) => (
              <Card 
                key={lyric.id} 
                className="hover:shadow-md transition-all cursor-pointer hover:scale-105"
                onClick={() => setSelectedLyric(lyric)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-lg font-dancing text-orange-600">
                      {lyric.title}
                    </h3>
                    <Badge 
                      variant={lyric.type === 'karaoke' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {lyric.type === 'karaoke' ? 'Караоке' : 'Стих'}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    Автор: {lyric.author}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {lyric.genre}
                    </span>
                    <span className="text-xs text-gray-500">
                      {lyric.language}
                    </span>
                  </div>

                  <div className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {lyric.content.split('\n')[0]}...
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Icon name="Heart" size={14} className="text-red-500" />
                      <span className="text-xs text-gray-500">{lyric.popularity}%</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Icon name="Play" size={14} className="mr-1" />
                      Открыть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLyrics.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Icon name="Search" size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Тексты не найдены</p>
              <p className="text-sm">Попробуйте изменить поисковый запрос</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Модальное окно для просмотра текста */}
      {selectedLyric && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="font-dancing text-orange-600">
                    {selectedLyric.title}
                  </CardTitle>
                  <p className="text-gray-600">Автор: {selectedLyric.author}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLyric(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Badge variant={selectedLyric.type === 'karaoke' ? 'default' : 'secondary'}>
                  {selectedLyric.type === 'karaoke' ? 'Караоке' : 'Стих'}
                </Badge>
                <Badge variant="outline">{selectedLyric.genre}</Badge>
                <Badge variant="outline">{selectedLyric.language}</Badge>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-6">
                  {selectedLyric.content}
                </pre>
              </div>

              <div className="flex justify-between">
                <Button variant="outline">
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Icon name="Heart" size={16} className="mr-2" />
                    В избранное
                  </Button>
                  <Button>
                    <Icon name="Music" size={16} className="mr-2" />
                    Создать трек
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LyricsLibrary;