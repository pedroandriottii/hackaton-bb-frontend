'use client'
import Navbar from '@/components/base/navbar';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Discard: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<string>("Aguardando foto");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const startCamera = async () => {
      const video = videoRef.current;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && video) {
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

  const captureImage = () => {
    const video = videoRef.current;
    if (!video) return;

    setStatus("Capturando...");
    setIsLoading(true);

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(async (blob) => {
        if (blob) {
          await sendImage(blob);
        }
      }, 'image/png');
    }
  };

  const sendImage = async (imageBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", imageBlob, "captured_image.png");

    try {
      setStatus("Escaneando...");
      const response = await axios.post("http://localhost:3000/prediction", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Resposta da API:", response.data);
      setStatus("Escaneado com sucesso!");
      // router.push("/detectado"); // Descomente esta linha para redirecionar após sucesso 

    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      setStatus("Erro ao escanear");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusClasses = () => {
    switch (status) {
      case "Escaneando...":
        return "bg-bb-yellow text-yellow-800";
      case "Escaneado com sucesso!":
        return "bg-green-500 text-green-800";
      case "Erro ao escanear":
        return "bg-red-500 text-red-800";
      default:
        return "bg-white text-black";
    }
  };

  return (
    <div className="bg-bb-blue min-h-screen">
      <Navbar />
      <div className='flex flex-col justify-around gap-4 w-full h-full'>
        <div className="flex flex-col items-center py-4">
          <h1 className="text-bb-yellow text-2xl font-bold">Descartar resíduo eletrônico</h1>
          <p className="text-white mt-2">Escaneie o dispositivo que deseja descartar</p>
        </div>
        <div className="flex flex-col items-center relative">
          <div className="camera-box mt-4 w-5/6 h-5/6 bg-blue-500 rounded-md overflow-hidden relative">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline></video>
          </div>

          <button
            onClick={captureImage}
            className={`absolute bottom-8 bg-white rounded-full p-4 border-4 border-gray-300
              ${isLoading ? "animate-ping" : ""}`}
            style={{ width: "70px", height: "70px" }}
            disabled={isLoading}
          ></button>
        </div>

        <div className={`flex flex-col items-center p-4 rounded-md w-5/6 ${getStatusClasses()} mt-4 mx-auto`}>
          <p className="text-lg font-semibold">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default Discard;
