'use client';
import React from 'react';
import { Coins, User } from 'lucide-react';
import { useUser } from '@/context/Usercontext';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <div className='bg-bb-yellow flex p-4 items-center justify-between'>
      <div className='border border-bb-blue rounded-full p-2'>
        <User className='text-bb-blue' />
      </div>
      <Image
        src={"/logobb.svg"}
        width={30}
        height={30}
        alt='Logo BB'
      />

      <div className='flex items-center text-bb-blue bg-yellow-300 p-2 rounded-full gap-2'>
        <Coins />
        <p>{user ? user.points : 'Carregando...'}</p>
      </div>
    </div>
  );
};

export default Navbar;