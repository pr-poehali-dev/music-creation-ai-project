import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Tutorial {
  id: number;
  title: string;
  duration: string;
  level: string;
}

interface TutorialsSectionProps {
  tutorials: Tutorial[];
}

const TutorialsSection: React.FC<TutorialsSectionProps> = ({ tutorials }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon name="GraduationCap" size={24} className="text-cyan-500" />
          <span>Обучение и Туториалы</span>
        </CardTitle>
        <CardDescription>
          Изучи основы создания музыки с ИИ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {tutorials.map((tutorial) => (
            <Card key={tutorial.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-lg">{tutorial.title}</h3>
                  <Badge 
                    variant={tutorial.level === 'Начинающий' ? 'default' : tutorial.level === 'Средний' ? 'secondary' : 'destructive'}
                  >
                    {tutorial.level}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Icon name="Clock" size={14} />
                    <span>{tutorial.duration}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Icon name="Play" size={14} className="mr-1" />
                    Смотреть
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorialsSection;