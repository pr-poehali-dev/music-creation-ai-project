import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  file?: File;
}

interface MusicLibraryProps {
  allTracks: Track[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MusicLibrary: React.FC<MusicLibraryProps> = ({ allTracks, handleFileUpload }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-dancing">
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
                  <h3 className="font-medium font-dancing">{track.title}</h3>
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
  );
};

export default MusicLibrary;