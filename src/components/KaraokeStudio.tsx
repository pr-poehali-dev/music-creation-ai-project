import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import WaveVisualization from './WaveVisualization';

interface Track {
  id: number;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  file?: File;
}

interface KaraokeStudioProps {
  allTracks: Track[];
  selectedKaraokeTrack: Track | null;
  setSelectedKaraokeTrack: (track: Track | null) => void;
  isRecording: boolean;
  recordedAudio: string | null;
  startRecording: () => void;
  stopRecording: () => void;
  setRecordedAudio: (audio: string | null) => void;
}

const KaraokeStudio: React.FC<KaraokeStudioProps> = ({
  allTracks,
  selectedKaraokeTrack,
  setSelectedKaraokeTrack,
  isRecording,
  recordedAudio,
  startRecording,
  stopRecording,
  setRecordedAudio
}) => {
  return (
    <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-dancing">
          <Icon name="Mic" size={24} className="text-pink-600" />
          <span>Караоке Студия</span>
        </CardTitle>
        <CardDescription>
          Пойте под любимые треки и записывайте свои вокальные партии
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Track Selection */}
        <div className="space-y-4">
          <h3 className="font-medium font-dancing">Выберите трек для караоке:</h3>
          <div className="grid gap-2 max-h-40 overflow-y-auto">
            {allTracks.map((track) => (
              <div
                key={track.id}
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedKaraokeTrack?.id === track.id
                    ? 'bg-purple-50 border-purple-300'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedKaraokeTrack(track)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <Icon name="Music2" size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{track.title}</p>
                    <p className="text-xs text-gray-500">{track.artist}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recording Controls */}
        {selectedKaraokeTrack && (
          <Card className="border-purple-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                    <Icon name="Music2" size={24} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold font-dancing">{selectedKaraokeTrack.title}</h3>
                    <p className="text-sm text-gray-600">{selectedKaraokeTrack.artist}</p>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline"
                    className="bg-green-50 hover:bg-green-100 border-green-200"
                  >
                    <Icon name="Play" size={18} className="mr-2" />
                    Воспроизвести трек
                  </Button>
                  
                  <Button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`${
                      isRecording 
                        ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                        : 'bg-pink-600 hover:bg-pink-700'
                    }`}
                  >
                    <Icon name={isRecording ? "Square" : "Mic"} size={18} className="mr-2" />
                    {isRecording ? 'Остановить запись' : 'Начать запись'}
                  </Button>
                </div>

                {isRecording && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 text-red-700">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium">Идет запись...</span>
                    </div>
                    <WaveVisualization />
                  </div>
                )}

                {recordedAudio && !isRecording && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-2 text-green-700">
                          <Icon name="CheckCircle" size={20} />
                          <span className="font-medium">Запись готова!</span>
                        </div>
                        <audio 
                          src={recordedAudio} 
                          controls 
                          className="w-full"
                        />
                        <div className="flex justify-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Icon name="Download" size={14} className="mr-1" />
                            Сохранить
                          </Button>
                          <Button size="sm" variant="outline">
                            <Icon name="Share2" size={14} className="mr-1" />
                            Поделиться
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setRecordedAudio(null)}
                          >
                            <Icon name="RotateCcw" size={14} className="mr-1" />
                            Новая запись
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {!selectedKaraokeTrack && (
          <div className="text-center text-gray-500 py-8">
            <Icon name="MicOff" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Выберите трек для начала караоке-сессии</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KaraokeStudio;