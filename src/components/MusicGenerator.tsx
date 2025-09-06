import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface MusicGeneratorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  currentTrack: any;
  handleGenerate: () => void;
}

const MusicGenerator: React.FC<MusicGeneratorProps> = ({
  prompt,
  setPrompt,
  isGenerating,
  currentTrack,
  handleGenerate
}) => {
  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-dancing">
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
                  <h3 className="font-semibold font-dancing">{currentTrack.title}</h3>
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
  );
};

export default MusicGenerator;