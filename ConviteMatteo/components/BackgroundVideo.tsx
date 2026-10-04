
import React from 'react';

const BackgroundVideo: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#F4ECE3] pointer-events-none">
      {/* Vídeo de fundo em loop com exatamente 11% de opacidade */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.11 }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video background.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;



