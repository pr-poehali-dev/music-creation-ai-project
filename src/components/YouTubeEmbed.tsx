import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface YouTubeVideo {
  id: string;
  url: string;
  title: string;
  embedId: string;
}

const YouTubeEmbed: React.FC = () => {
  const videos: YouTubeVideo[] = [
    {
      id: '1',
      url: 'https://youtube.com/shorts/k_BosjFX-WA?si=p-4lc7Czg6kWwUkD',
      title: 'AI Music Generation Demo 1',
      embedId: 'k_BosjFX-WA'
    },
    {
      id: '2', 
      url: 'https://youtube.com/shorts/bbilLM2cdmw?si=ypNTg9CqTpQe_WMY',
      title: 'AI Music Generation Demo 2',
      embedId: 'bbilLM2cdmw'
    },
    {
      id: '3',
      url: 'https://youtube.com/shorts/gXplp0dXusk?si=QK2iICq4LzekeiEk', 
      title: 'AI Music Generation Demo 3',
      embedId: 'gXplp0dXusk'
    }
  ];

  return (
    <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
          <Icon name="Play" size={24} className="text-red-600" />
          <span>Примеры генерации музыки</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="space-y-3">
              <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${video.embedId}?autoplay=0&mute=0&controls=1&loop=0&rel=0`}
                  title={video.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-800">{video.title}</p>
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-red-600 hover:text-red-800 flex items-center justify-center space-x-1 mt-1"
                >
                  <Icon name="ExternalLink" size={12} />
                  <span>Смотреть на YouTube</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-white rounded-lg border border-red-100">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-red-600" />
            <span className="text-sm font-medium text-gray-800">О примерах</span>
          </div>
          <p className="text-xs text-gray-600">
            Эти видео показывают возможности AI генерации музыки. Используйте их как вдохновение для ваших собственных треков!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default YouTubeEmbed;