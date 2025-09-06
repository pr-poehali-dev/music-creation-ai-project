import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const YouTubeChannel = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const channelInfo = {
    name: '@lisuli4ka',
    url: 'https://youtube.com/@lisuli4ka',
    description: 'Музыкальный канал с авторскими композициями и каверами'
  };

  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Лунная серенада - Авторская композиция',
      description: 'Нежная мелодия под звёздным небом',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      duration: '3:45',
      views: '12K',
      publishedAt: '2 дня назад'
    },
    {
      id: 'jNQXAC9IVRw',
      title: 'Весенний ветер - Акустическая версия',
      description: 'Живое исполнение на гитаре',
      thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
      duration: '4:12',
      views: '8.5K',
      publishedAt: '1 неделя назад'
    },
    {
      id: 'y6120QOlsfU',
      title: 'Рыжая лисица - Детская песенка',
      description: 'Весёлая песня для детей о рыжей лисичке',
      thumbnail: 'https://img.youtube.com/vi/y6120QOlsfU/maxresdefault.jpg',
      duration: '2:38',
      views: '25K',
      publishedAt: '2 недели назад'
    },
    {
      id: 'kJQP7kiw5Fk',
      title: 'City Lights - Английская версия',
      description: 'Электронная композиция о городских огнях',
      thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
      duration: '5:20',
      views: '15K',
      publishedAt: '3 недели назад'
    },
    {
      id: 'L_jWHffIx5E',
      title: 'Зимняя сказка - Новогодняя песня',
      description: 'Праздничная мелодия с колокольчиками',
      thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
      duration: '3:55',
      views: '42K',
      publishedAt: '1 месяц назад'
    },
    {
      id: 'fJ9rUzIMcZQ',
      title: 'Морской бриз - Релакс музыка',
      description: 'Успокаивающие звуки природы и мелодия',
      thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
      duration: '7:30',
      views: '18K',
      publishedAt: '1 месяц назад'
    }
  ];

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const openChannel = () => {
    window.open(channelInfo.url, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Youtube" size={32} className="text-red-600" />
              <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                Канал {channelInfo.name}
              </h1>
            </div>
            <p className="text-gray-600 mb-4">{channelInfo.description}</p>
            <Button 
              onClick={openChannel}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Перейти на YouTube
            </Button>
          </div>
          <div className="lg:w-1/3">
            <div className="relative">
              <Input
                placeholder="Поиск видео..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.id} className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={() => openVideo(video.id)}>
            <div className="relative">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/480x270/ff6b35/ffffff?text=🎵+${encodeURIComponent(video.title.slice(0, 20))}`;
                }}
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                {video.duration}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-30 rounded-t-lg">
                <div className="bg-red-600 rounded-full p-3">
                  <Icon name="Play" size={24} className="text-white ml-1" />
                </div>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2 group-hover:text-orange-600 transition-colors">
                {video.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>{video.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{video.publishedAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={(e) => {
                    e.stopPropagation();
                    openVideo(video.id);
                  }}
                  className="flex-1"
                >
                  <Icon name="Play" size={14} className="mr-1" />
                  Смотреть
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Функция скоро появится!');
                  }}
                >
                  <Icon name="Heart" size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Видео не найдены</h3>
          <p className="text-gray-500">Попробуйте изменить поисковый запрос</p>
        </div>
      )}

      <div className="bg-orange-50 rounded-xl p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Подпишитесь на канал!</h3>
        <p className="text-gray-600 mb-4">Следите за новыми музыкальными композициями и каверами</p>
        <Button 
          onClick={openChannel}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Icon name="Youtube" size={16} className="mr-2" />
          Подписаться на YouTube
        </Button>
      </div>
    </div>
  );
};

export default YouTubeChannel;