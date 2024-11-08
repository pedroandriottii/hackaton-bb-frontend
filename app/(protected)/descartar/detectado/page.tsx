import Navbar from '@/components/base/navbar';
import { CircleChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const DetectadoPage: React.FC = () => {
  return (
    <div className='bg-bb-blue flex flex-col gap-4'>
      <Link href={'/'}>
        <div className='flex items-center bg-bb-yellow w-1/4 rounded-r-full gap-2 justify-center'>
          <CircleChevronLeft size={16} />
          <p>Voltar</p>
        </div>
      </Link>
      <div className='p-4'>
        <div className='flex flex-col justify-center align-center items-center w-full h-full'>
          <h1 className='text-2xl text-bb-yellow font-bold'>Descartar lixo eletrônico</h1>
          <p className='text-white'>Escaneie o dispositivo que deseja descartar</p>
        </div>
        <div className='bg-white p-4 rounded-xl flex flex-col items-center gap-4'>
          <p className='ustify-center'>Dispositivo detectado com sucesso!</p>
          <div className='flex items-center'>
            <h1>Imagem</h1>
            <h2>Notebook</h2>
          </div>
          <div className='flex justify-between'>
            <p>Valor estimado</p>
            <p>100 pts</p>
          </div>
        </div>
        <div className=''>
          <h2>Curiosidade</h2>
          <p>Estima-se que um notebook leve 500 anos para se decompor. Ao descartar corretamente, você está ajudando o meio-ambiente!</p>
        </div>
        <div className='flex flex-col gap-2'>
          <button className='bg-bb-yellow rounded-xl p-2'>Escanear mais itens</button>
          <button className='bg-bb-yellow rounded-xl p-2'>Confirmar Descarte</button>
        </div>
      </div>

    </div>
  );
};

export default DetectadoPage;