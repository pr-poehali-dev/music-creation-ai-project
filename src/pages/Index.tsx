import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [uploadedTracks, setUploadedTracks] = useState([]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentTrack({
        title: 'AI Generated Track',
        description: prompt,
        duration: '3:24',
        genre: 'Electronic'
      });
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newTracks = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Вы',
        genre: 'Загруженный',
        duration: '--:--',
        file: file
      }));
      setUploadedTracks(prev => [...prev, ...newTracks]);
    }
  };

  const musicLibrary = [
    { id: 1, title: 'Cosmic Journey', artist: 'AI Studio', genre: 'Ambient', duration: '4:32' },
    { id: 2, title: 'Digital Dreams', artist: 'AI Studio', genre: 'Electronic', duration: '3:18' },
    { id: 3, title: 'Neon Lights', artist: 'AI Studio', genre: 'Synthwave', duration: '5:07' },
    { id: 4, title: 'Ocean Waves', artist: 'AI Studio', genre: 'Chill', duration: '6:15' }
  ];

  const allTracks = [...musicLibrary, ...uploadedTracks];

  const tutorials = [
    { id: 1, title: 'Основы создания музыки с ИИ', duration: '12 мин', level: 'Начинающий' },
    { id: 2, title: 'Работа с промптами для генерации', duration: '18 мин', level: 'Средний' },
    { id: 3, title: 'Миксинг и мастеринг ИИ-треков', duration: '25 мин', level: 'Продвинутый' },
    { id: 4, title: 'Создание профессиональных битов', duration: '20 мин', level: 'Средний' }
  ];

  const WaveVisualization = () => (
    <div className="flex items-end justify-center space-x-1 h-16">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t-sm animate-wave`}
          style={{
            width: '4px',
            height: `${20 + (i % 3) * 15}px`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/img/1cb5d8e9-4714-4f7b-8b82-d457352bd0d7.jpg" 
                alt="AI Music Studio" 
                className="w-10 h-10 rounded-lg object-cover"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                AI Music Studio
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#generator" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Генератор
              </a>
              <a href="#library" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Библиотека
              </a>
              <a href="#tutorials" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Обучение
              </a>
              <a href="#profile" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
                Профиль
              </a>
            </nav>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600">
              <Icon name="User" size={18} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
            Создавай музыку с искусственным интеллектом
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Превращай слова в мелодии. Наш ИИ поможет тебе создать уникальные треки
            всего за несколько секунд
          </p>
          <div className="mb-8">
            <WaveVisualization />
          </div>
        </section>

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="generator" className="flex items-center space-x-2">
              <Icon name="Wand2" size={18} />
              <span>Генератор</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center space-x-2">
              <Icon name="Music" size={18} />
              <span>Библиотека</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center space-x-2">
              <Icon name="GraduationCap" size={18} />
              <span>Обучение</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Icon name="User" size={18} />
              <span>Профиль</span>
            </TabsTrigger>
          </TabsList>

          {/* AI Music Generator */}
          <TabsContent value="generator" className="space-y-6" id="generator">
            <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Sparkles" size={24} className="text-purple-600" />
                  <span>ИИ Генератор Музыки</span>
                </CardTitle>
                <CardDescription>
                  Опишите желаемый трек, и ИИ создаст его для вас
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Например: спокойная электронная музыка с атмосферными звуками..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                        Создание...
                      </>
                    ) : (
                      <>
                        <Icon name="Play" size={18} className="mr-2" />
                        Создать
                      </>
                    )}
                  </Button>
                </div>
                
                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Генерация трека...</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="animate-pulse-glow" />
                  </div>
                )}

                {currentTrack && !isGenerating && (
                  <Card className="border-purple-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{currentTrack.title}</h3>
                          <p className="text-sm text-gray-600">{currentTrack.description}</p>
                        </div>
                        <Badge variant="secondary">{currentTrack.genre}</Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          <Icon name="Play" size={14} className="mr-1" />
                          Воспроизвести
                        </Button>
                        <Button size="sm" variant="outline">
                          <Icon name="Download" size={14} className="mr-1" />
                          Скачать
                        </Button>
                        <span className="text-sm text-gray-500">{currentTrack.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Music Library */}
          <TabsContent value="library" className="space-y-6" id="library">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Music" size={24} className="text-cyan-500" />
                  <span>Библиотека Треков</span>
                </CardTitle>
                <CardDescription>
                  Ваша коллекция созданных треков
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <input
                    type="file"
                    accept="audio/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="audio-upload"
                  />
                  <label htmlFor="audio-upload">
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>
                        <Icon name="Upload" size={18} className="mr-2" />
                        Загрузить свои треки
                      </span>
                    </Button>
                  </label>
                </div>
                <div className="grid gap-4">
                  {allTracks.map((track) => (
                    <div key={track.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center">
                          <Icon name="Music2" size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium">{track.title}</h3>
                          <p className="text-sm text-gray-500">{track.artist} • {track.genre}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{track.duration}</span>
                        <Button size="sm" variant="ghost">
                          <Icon name="Play" size={16} />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Icon name="MoreHorizontal" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tutorials */}
          <TabsContent value="tutorials" className="space-y-6" id="tutorials">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="GraduationCap" size={24} className="text-cyan-500" />
                  <span>Обучение и Туториалы</span>
                </CardTitle>
                <CardDescription>
                  Изучи основы создания музыки с ИИ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {tutorials.map((tutorial) => (
                    <Card key={tutorial.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-medium text-lg">{tutorial.title}</h3>
                          <Badge 
                            variant={tutorial.level === 'Начинающий' ? 'default' : tutorial.level === 'Средний' ? 'secondary' : 'destructive'}
                          >
                            {tutorial.level}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Icon name="Clock" size={14} />
                            <span>{tutorial.duration}</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Icon name="Play" size={14} className="mr-1" />
                            Смотреть
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile" className="space-y-6" id="profile">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="User" size={24} className="text-purple-600" />
                    <span>Профиль</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center text-white text-xl font-semibold">
                      МУ
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Музыкант</h3>
                      <p className="text-gray-500">Начинающий композитор</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Создано треков</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Общее время</span>
                      <span className="font-medium">45 мин</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Любимый жанр</span>
                      <span className="font-medium">Electronic</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Trophy" size={24} className="text-yellow-500" />
                    <span>Достижения</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <Icon name="Music" size={20} className="text-yellow-600" />
                    <div>
                      <h4 className="font-medium">Первый трек</h4>
                      <p className="text-sm text-gray-600">Создал свой первый ИИ-трек</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
                    <Icon name="Zap" size={20} className="text-purple-600" />
                    <div>
                      <h4 className="font-medium">Скоростной композитор</h4>
                      <p className="text-sm text-gray-600">Создал 10 треков за день</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200 opacity-60">
                    <Icon name="Crown" size={20} className="text-gray-400" />
                    <div>
                      <h4 className="font-medium">Мастер жанров</h4>
                      <p className="text-sm text-gray-600">Создай треки в 5 разных жанрах</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  src="/img/1cb5d8e9-4714-4f7b-8b82-d457352bd0d7.jpg" 
                  alt="AI Music Studio" 
                  className="w-8 h-8 rounded object-cover"
                />
                <h3 className="text-lg font-semibold">AI Music Studio</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Создавайте профессиональную музыку с помощью искусственного интеллекта
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-3">Продукт</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Генератор</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Библиотека</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Ресурсы</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Туториалы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Статус</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 AI Music Studio. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;