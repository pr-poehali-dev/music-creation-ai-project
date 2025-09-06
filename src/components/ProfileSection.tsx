import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const ProfileSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="User" size={24} className="text-purple-600" />
            <span>Профиль</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center text-white text-xl font-semibold">
              МУ
            </div>
            <div>
              <h3 className="font-semibold text-lg">Музыкант</h3>
              <p className="text-gray-500">Начинающий композитор</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Создано треков</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Общее время</span>
              <span className="font-medium">45 мин</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Любимый жанр</span>
              <span className="font-medium">Electronic</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon name="Trophy" size={24} className="text-yellow-500" />
            <span>Достижения</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
            <Icon name="Music" size={20} className="text-yellow-600" />
            <div>
              <h4 className="font-medium">Первый трек</h4>
              <p className="text-sm text-gray-600">Создал свой первый ИИ-трек</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 border border-purple-200">
            <Icon name="Zap" size={20} className="text-purple-600" />
            <div>
              <h4 className="font-medium">Скоростной композитор</h4>
              <p className="text-sm text-gray-600">Создал 10 треков за день</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200 opacity-60">
            <Icon name="Crown" size={20} className="text-gray-400" />
            <div>
              <h4 className="font-medium">Мастер жанров</h4>
              <p className="text-sm text-gray-600">Создай треки в 5 разных жанрах</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;