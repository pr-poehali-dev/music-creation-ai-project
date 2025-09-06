import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;