import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img 
              src="https://cdn.poehali.dev/files/fcaa8df9-cff5-41ca-8e99-8db2101fcf4f.jpg" 
              alt="MusicalFox" 
              className="w-10 h-10 rounded-lg object-cover"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
              MusicalFox
            </h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#generator" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Генератор
            </a>
            <a href="#library" className="text-gray-600 hover:text-green-600 font-medium transition-colors">
              Библиотека
            </a>
            <a href="#karaoke" className="text-gray-600 hover:text-yellow-600 font-medium transition-colors">
              Караоке
            </a>
            <a href="#tutorials" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Обучение
            </a>
            <a href="#profile" className="text-gray-600 hover:text-purple-600 font-medium transition-colors">
              Профиль
            </a>
          </nav>
          <Button className="bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-700 hover:to-yellow-600">
            <Icon name="User" size={18} className="mr-2" />
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;