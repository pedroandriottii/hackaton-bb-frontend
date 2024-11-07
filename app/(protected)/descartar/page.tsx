'use client'
import Navbar from '@/components/base/navbar';
import React, { useEffect } from 'react';

const Discard: React.FC = () => {

  useEffect(() => {
    const startCamera = async () => {
      const video = document.getElementById('video') as HTMLVideoElement;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          video.srcObject = stream;
        } catch (error) {
          console.error("Erro ao acessar a câmera:", error);
          alert("Não foi possível acessar a câmera.");
        }
      } else {
        alert("API de câmera não suportada no navegador.");
      }
    };

    startCamera();
  }, []);

  return (
    <div className="bg-bb-blue min-h-screen">
      <Navbar />
      <div className='flex flex-col justify-around gap-4 w-full h-full'>
        <div className="flex flex-col items-center py-4">
          <h1 className="text-bb-yellow text-2xl font-bold">Descartar lixo eletrônico</h1>
          <p className="text-white mt-2">Escaneie o dispositivo que deseja descartar</p>
        </div>
        <div className="flex flex-col items-center">
          <button className="bg-white text-bb-blue font-semibold rounded-md p-2 w-1/2 mt-4">
            Escaneando...
          </button>
          <div className="camera-box mt-4 w-5/6 h-5/6 bg-blue-500 rounded-md overflow-hidden">
            <video id="video" className="w-full h-full object-cover" autoPlay playsInline></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discard;
