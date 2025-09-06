import React from 'react';
import WaveVisualization from './WaveVisualization';

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;