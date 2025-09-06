import React from 'react';

const WaveVisualization = () => (
  <div className="flex items-end justify-center space-x-1 h-16">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className={`bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t-sm animate-wave`}
        style={{
          width: '4px',
          height: `${20 + (i % 3) * 15}px`,
          animationDelay: `${i * 0.1}s`
        }}
      />
    ))}
  </div>
);

export default WaveVisualization;