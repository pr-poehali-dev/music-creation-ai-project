import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MusicGenerator from '@/components/MusicGenerator';
import MusicLibrary from '@/components/MusicLibrary';
import KaraokeStudio from '@/components/KaraokeStudio';
import TutorialsSection from '@/components/TutorialsSection';
import ProfileSection from '@/components/ProfileSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [uploadedTracks, setUploadedTracks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [selectedKaraokeTrack, setSelectedKaraokeTrack] = useState(null);

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
    { id: 1, title: 'Cosmic Journey', artist: 'MusicalFox', genre: 'Ambient', duration: '4:32' },
    { id: 2, title: 'Digital Dreams', artist: 'MusicalFox', genre: 'Electronic', duration: '3:18' },
    { id: 3, title: 'Neon Lights', artist: 'MusicalFox', genre: 'Synthwave', duration: '5:07' },
    { id: 4, title: 'Ocean Waves', artist: 'MusicalFox', genre: 'Chill', duration: '6:15' }
  ];

  const allTracks = [...musicLibrary, ...uploadedTracks];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);
        setRecordedAudio(audioUrl);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Ошибка доступа к микрофону:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
    }
  };

  const tutorials = [
    { id: 1, title: 'Основы создания музыки с ИИ', duration: '12 мин', level: 'Начинающий' },
    { id: 2, title: 'Работа с промптами для генерации', duration: '18 мин', level: 'Средний' },
    { id: 3, title: 'Миксинг и мастеринг ИИ-треков', duration: '25 мин', level: 'Продвинутый' },
    { id: 4, title: 'Создание профессиональных битов', duration: '20 мин', level: 'Средний' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />

        <Tabs defaultValue="generator" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="generator" className="flex items-center space-x-2">
              <Icon name="Wand2" size={18} />
              <span>Генератор</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center space-x-2">
              <Icon name="Music" size={18} />
              <span>Библиотека</span>
            </TabsTrigger>
            <TabsTrigger value="karaoke" className="flex items-center space-x-2">
              <Icon name="Mic" size={18} />
              <span>Караоке</span>
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

          <TabsContent value="generator" className="space-y-6" id="generator">
            <MusicGenerator
              prompt={prompt}
              setPrompt={setPrompt}
              isGenerating={isGenerating}
              currentTrack={currentTrack}
              handleGenerate={handleGenerate}
            />
          </TabsContent>

          <TabsContent value="library" className="space-y-6" id="library">
            <MusicLibrary
              allTracks={allTracks}
              handleFileUpload={handleFileUpload}
            />
          </TabsContent>

          <TabsContent value="karaoke" className="space-y-6" id="karaoke">
            <KaraokeStudio
              allTracks={allTracks}
              selectedKaraokeTrack={selectedKaraokeTrack}
              setSelectedKaraokeTrack={setSelectedKaraokeTrack}
              isRecording={isRecording}
              recordedAudio={recordedAudio}
              startRecording={startRecording}
              stopRecording={stopRecording}
              setRecordedAudio={setRecordedAudio}
            />
          </TabsContent>

          <TabsContent value="tutorials" className="space-y-6" id="tutorials">
            <TutorialsSection tutorials={tutorials} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6" id="profile">
            <ProfileSection />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Index;