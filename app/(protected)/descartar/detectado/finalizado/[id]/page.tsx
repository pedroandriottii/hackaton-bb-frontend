'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { CircleChevronLeft } from 'lucide-react';
import { useUser } from '@/context/Usercontext';

const FinalizadoPage: React.FC = () => {
  const pathname = usePathname();
  const donationId = pathname.split('/').pop();
  const router = useRouter();
  const [donationData, setDonationData] = useState<any>(null);
  const [itemsData, setItemsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { setUser, user } = useUser();

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const donationResponse = await axios.get(`http://localhost:3000/donations/${donationId}`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('accessToken')}`,
          },
        });
        setDonationData(donationResponse.data);

        const itemsPromises = donationResponse.data.items.map(async (item: any) => {
          const itemResponse = await axios.get(`http://localhost:3000/items/id/${item.itemId}`, {
            headers: {
              'Authorization': `Bearer ${Cookies.get('accessToken')}`,
            },
          });
          return {
            ...item,
            ...itemResponse.data,
          };
        });

        const items = await Promise.all(itemsPromises);
        setItemsData(items);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da doação:', error);
        router.push('/home');
      }
    };

    if (donationId) {
      fetchDonationData();
    }
  }, [donationId, router, setUser, user]);

  if (loading) {
    return <p className="text-white">Carregando...</p>;
  }

  return (
    <div className="bg-bb-blue min-h-screen p-4 flex flex-col gap-4">
      <Link href="/">
        <div className="flex items-center bg-bb-yellow w-1/4 rounded-r-full gap-2 justify-center p-2">
          <CircleChevronLeft size={16} />
          <p>Voltar</p>
        </div>
      </Link>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl text-bb-yellow font-bold">Doação Finalizada</h1>
        <p className="text-white">Obrigado por contribuir!</p>
      </div>

      <div className="bg-white p-4 rounded-xl flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold">Resumo da Doação</h2>
        <p>Total de Pontos: {donationData.totalPoints} pts</p>
      </div>

      <div className="flex flex-col gap-4">
        {itemsData.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl flex flex-col items-center gap-2">
            <img src={item.img} alt={item.title} className="w-32 h-32 object-cover rounded-md" />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-center">{item.description}</p>
            <div className="flex justify-between w-full px-4">
              <p>Pontos: {item.points} pts</p>
              <p>Quantidade: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => window.location.href = '/home'}
        className="bg-bb-yellow rounded-xl p-2 mt-4"
      >
        Voltar ao Início
      </button>
    </div>
  );
};

export default FinalizadoPage;