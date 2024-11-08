import Navbar from '@/components/base/navbar_logado';
import { ChevronsRight, CircleDollarSign, Gift, MapPinned, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Discard: React.FC = () => {
  return (
    <div className='bg-bb-blue min-h-screen w-full flex flex-col'>
      <div className='p-4 flex-1 flex flex-col justify-around items-center'>
        <div>

          <p className='text-bb-yellow text-lg'>Bem vindo(a) ao</p>
          <h1 className=' text-4xl font-bold text-bb-yellow'>BB TechPoints</h1>
        </div>

        <div className='w-full max-w-md space-y-6 flex flex-col text-bb-blue text-xl'>
          <h2 className='text-white flex text-2xl mt-8 mb-4 justify-center '>O que deseja fazer hoje?</h2>
          <Link href={'/descartar'}>
            <div className='bg-bb-yellow rounded-xl p-4 flex flex-col items-center justify-center py-8'>
              <div className='flex items-center gap-4'>
                <Trash2 size={40} />
                <ChevronsRight size={40} />
                <CircleDollarSign size={40} />
              </div>
              <button className='mt-2 text-center'>Descartar itens por pontos</button>
            </div>
          </Link>

          <Link href={'/procurar'}>
            <div className='bg-bb-yellow rounded-xl p-4 flex flex-col items-center justify-center py-8'>
              <MapPinned size={40} />
              <button className='mt-2 text-center'>Pontos de descartes próximos</button>
            </div>
          </Link>

          <Link href={'/recompensas'}>
            <div className='bg-bb-yellow rounded-xl p-4 flex flex-col items-center justify-center py-8'>
              <Gift size={40} />
              <button className='mt-2 text-center'>Ver tabela de recompensas</button>
            </div>
          </Link>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default Discard;
