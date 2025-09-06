import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
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
  const [genre, setGenre] = useState('electronic');
  const [mood, setMood] = useState('chill');
  const [tempo, setTempo] = useState([120]);
  const [duration, setDuration] = useState([180]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout>();

  const genres = [
    { value: 'electronic', label: 'Электроника', emoji: '🎧' },
    { value: 'ambient', label: 'Эмбиент', emoji: '🌙' },
    { value: 'lofi', label: 'Lo-Fi', emoji: '☕' },
    { value: 'classical', label: 'Классика', emoji: '🎼' },
    { value: 'jazz', label: 'Джаз', emoji: '🎷' },
    { value: 'rock', label: 'Рок', emoji: '🎸' },
    { value: 'pop', label: 'Поп', emoji: '🎤' },
    { value: 'synthwave', label: 'Синтвейв', emoji: '🌆' }
  ];

  const moods = [
    { value: 'chill', label: 'Спокойный', emoji: '😌' },
    { value: 'upbeat', label: 'Энергичный', emoji: '🔥' },
    { value: 'melancholic', label: 'Меланхоличный', emoji: '🌧️' },
    { value: 'dreamy', label: 'Мечтательный', emoji: '✨' },
    { value: 'mysterious', label: 'Загадочный', emoji: '🔮' },
    { value: 'epic', label: 'Эпический', emoji: '⚔️' },
    { value: 'romantic', label: 'Романтичный', emoji: '💕' },
    { value: 'dark', label: 'Тёмный', emoji: '🌑' }
  ];



  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 500);
      return () => clearInterval(interval);
    } else {
      setGenerationProgress(0);
    }
  }, [isGenerating]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const updateProgress = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentTrack]);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAdvancedGenerate = () => {
    const enhancedPrompt = `${prompt} | Жанр: ${genre} | Настроение: ${mood} | Темп: ${tempo[0]} BPM | Длительность: ${Math.floor(duration[0] / 60)}:${String(duration[0] % 60).padStart(2, '0')}`;
    setPrompt(enhancedPrompt);
    handleGenerate();
  };

  const downloadTrack = () => {
    if (currentTrack && audioRef.current) {
      const link = document.createElement('a');
      link.href = audioRef.current.src;
      link.download = `${currentTrack.title}.wav`;
      link.click();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
            <Icon name="Sparkles" size={24} className="text-purple-600" />
            <span>ИИ Генератор Музыки</span>
          </CardTitle>
          <CardDescription>
            Создайте уникальную композицию с помощью искусственного интеллекта
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Описание трека</label>
              <Input
                placeholder="Например: атмосферная музыка для работы с легкой электроникой..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Жанр</label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.emoji} {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Настроение</label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {moods.map((m) => (
                      <SelectItem key={m.value} value={m.value}>
                        {m.emoji} {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Темп: {tempo[0]} BPM
                </label>
                <Slider
                  value={tempo}
                  onValueChange={setTempo}
                  max={200}
                  min={60}
                  step={5}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Длительность: {formatTime(duration[0])}
                </label>
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  max={600}
                  min={30}
                  step={15}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleAdvancedGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Создание музыки...
              </>
            ) : (
              <>
                <Icon name="Wand2" size={20} className="mr-2" />
                Создать трек
              </>
            )}
          </Button>
          
          {isGenerating && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Генерация трека...</span>
                <span className="text-purple-600 font-medium">{Math.floor(generationProgress)}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
              <div className="text-xs text-gray-500 text-center">
                {generationProgress < 30 && "Анализирую ваш запрос..."}
                {generationProgress >= 30 && generationProgress < 60 && "Создаю мелодию..."}
                {generationProgress >= 60 && generationProgress < 90 && "Добавляю инструменты..."}
                {generationProgress >= 90 && "Финальная обработка..."}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {currentTrack && !isGenerating && (
        <Card className="border-purple-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-1" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  {currentTrack.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{currentTrack.description}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    {currentTrack.genre}
                  </Badge>
                  <Badge variant="outline">{currentTrack.duration}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Button 
                      size="sm" 
                      onClick={togglePlayback}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
                    </Button>
                    <span className="text-sm font-medium">
                      {formatTime((progress / 100) * (currentTrack.durationSeconds || 180))} / {currentTrack.duration}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Volume2" size={16} className="text-gray-400" />
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={downloadTrack}
                  className="flex-1 sm:flex-none"
                >
                  <Icon name="Download" size={14} className="mr-1" />
                  Скачать
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => alert('Функция скоро появится!')}
                  className="flex-1 sm:flex-none"
                >
                  <Icon name="Heart" size={14} className="mr-1" />
                  В избранное
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => alert('Функция скоро появится!')}
                  className="flex-1 sm:flex-none"
                >
                  <Icon name="Share" size={14} className="mr-1" />
                  Поделиться
                </Button>
              </div>
            </div>

            {currentTrack && currentTrack.audioUrl && (
              <audio
                ref={audioRef}
                src={currentTrack.audioUrl}
                preload="metadata"
              />
            )}
          </CardContent>
        </Card>
      )}

      <Card className="bg-gradient-to-r from-orange-100 to-yellow-100">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Icon name="Lightbulb" size={20} className="mr-2 text-orange-600" />
            Советы для лучшей генерации
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>• Будьте конкретны в описании</div>
            <div>• Укажите инструменты если нужно</div>
            <div>• Опишите эмоции и атмосферу</div>
            <div>• Экспериментируйте с настройками</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MusicGenerator;