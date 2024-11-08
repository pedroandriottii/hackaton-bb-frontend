'use client'
import { CircleChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';

const DetectadoPage: React.FC = () => {
  const searchParams = useSearchParams();
  const item = searchParams.get('item');
  const itemData = item ? JSON.parse(decodeURIComponent(item)) : null;
  const router = useRouter();
  const [imgUrl, setImgUrl] = React.useState<string | null>(null);
  console.log('img:', itemData.img);

  if (!itemData) {
    return <p>Carregando...</p>;
  }

  const handleGetImageUrl = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/items/id/${itemData.id}/`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      console.log("Imagem obtida com sucesso:", response.data);
      setImgUrl(response.data.img);
      return response.data.img;
    } catch (error) {
      console.error("Erro ao obter a imagem:", error);
      alert("Erro ao obter a imagem. Tente novamente.");
    }
  }

  useEffect(() => {
    handleGetImageUrl();
  }, []);

  const handleConfirmDiscard = async () => {
    console.log(itemData);
    try {
      const response = await axios.put(`http://localhost:3000/donations/${itemData.donationId}/finalize`, null, {
        headers: {
          'Authorization': `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      console.log("Doação finalizada com sucesso:", response.data);
      router.push(`detectado/finalizado/${itemData.donationId}`);
    } catch (error) {
      console.error("Erro ao finalizar a doação:", error);
      alert("Erro ao finalizar o descarte. Tente novamente.");
    }
  };

  const handleScanMoreItems = () => {
    router.push(`/descartar?donationId=${itemData.donationId}`);
  };

  return (
    <div className='bg-bb-blue flex flex-col gap-4 w-screen h-screen'>
      <Link href={'/descartar'} className='mt-4'>
        <div className='flex items-center bg-bb-yellow w-1/4 rounded-r-full gap-2 justify-center'>
          <CircleChevronLeft size={16} />
          <p>Voltar</p>
        </div>
      </Link>
      <div className='flex flex-col gap-4 p-4'>
        <div className='flex flex-col justify-center align-center items-center w-full h-full'>
          <h1 className='text-2xl text-bb-yellow font-bold'>Descartar lixo eletrônico</h1>
          <p className='text-white'>Escaneie o dispositivo que deseja descartar</p>
        </div>
        <div className='bg-white p-4 rounded-xl flex flex-col items-center gap-4'>
          <h1 className='justify-center text-bb-blue'>Dispositivo detectado com sucesso!</h1>
          <div className='flex items-center'>
            <div className='flex justify-around items-center gap-4'>
              {itemData.img && (
                <img src={imgUrl} alt={itemData.title} className='w-[120px] h-full rounded-md' />
              )}
              <h2 >{itemData.title}</h2>
            </div>
          </div>
          <div className='flex justify-between'>
            <p>Valor estimado:</p>
            <p>{itemData.points} pts</p>
          </div>
          <div className='flex justify-between'>
            <p>Peso estimado:</p>
            <p>{itemData.weight} kg</p>
          </div>
        </div>
        <div className='bg-white rounded-md p-4'>
          <h2 className='text-bb-blue'>Curiosidade</h2>
          <p>{itemData.description}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <button onClick={handleScanMoreItems} className='bg-bb-yellow rounded-xl p-2 text-bb-blue'>Escanear mais itens</button>
          <button onClick={handleConfirmDiscard} className='bg-bb-yellow rounded-xl p-2 text-bb-blue'>Confirmar Descarte</button>
        </div>
      </div>
    </div>
  );
};

export default DetectadoPage;
