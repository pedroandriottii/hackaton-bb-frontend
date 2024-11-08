'use client';
import React from 'react';
import { useUser } from '@/context/Usercontext';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <div className='bg-bb-yellow flex p-4 items-center justify-between'>
      <Image
        src={"/logobb.svg"}
        width={30}
        height={30}
        alt='Logo BB'
      />
      <Link href="/procurar">
        <h1 style={{ fontSize: '20px', color: '#465EFF' }} className="font-bold italic ml-0 cursor-pointer">
          Pontos de descarte
        </h1>
      </Link>
    </div>
  );
};

export default Navbar;