'use client'
import Navbar from '@/components/base/navbar';
import { CircleChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const DetectadoPage: React.FC = () => {
  const searchParams = useSearchParams();
  const item = searchParams.get('item');
  const itemData = item ? JSON.parse(decodeURIComponent(item)) : null;
  const router = useRouter();

  if (!itemData) {
    return <p>Carregando...</p>;
  }

  const handleConfirmDiscard = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/donations/${itemData.donationId}/finalize`, null, {
        headers: {
          'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      console.log("Doação finalizada com sucesso:", response.data);
      router.push('/'); // Redireciona para a página inicial ou outra de sua escolha
    } catch (error) {
      console.error("Erro ao finalizar a doação:", error);
      alert("Erro ao finalizar o descarte. Tente novamente.");
    }
  };

  return (
    <div className='bg-bb-blue flex flex-col gap-4'>
      <Navbar />
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
          <p className='justify-center'>Dispositivo detectado com sucesso!</p>
          <div className='flex items-center'>
            <h1>Imagem</h1>
            <h2>{itemData.title}</h2>
          </div>
          <div className='flex justify-between'>
            <p>Valor estimado</p>
            <p>{itemData.points} pts</p>
          </div>
        </div>
        <div className=''>
          <h2>Curiosidade</h2>
          <p>{itemData.description}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <button className='bg-bb-yellow rounded-xl p-2'>Escanear mais itens</button>
          <button onClick={handleConfirmDiscard} className='bg-bb-yellow rounded-xl p-2'>Confirmar Descarte</button>
        </div>
      </div>
    </div>
  );
};

export default DetectadoPage;
