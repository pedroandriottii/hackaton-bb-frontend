'use client';
import React, { useState } from 'react';
import { Coins, User } from 'lucide-react';
import { useUser } from '@/context/Usercontext';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const { user } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    router.push('/login');
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className='bg-bb-yellow flex p-4 items-center justify-between relative'>
      <div
        className='border border-bb-blue p-4 rounded-full text-bb-blue cursor-pointer'
        onClick={toggleDialog}
      >
        <User />
      </div>

      <Link href={'/home'}>
        <Image
          src={"/logobb.svg"}
          width={30}
          height={30}
          alt='Logo BB'
        />
      </Link>

      <div className='flex items-center text-bb-blue bg-yellow-300 p-2 rounded-full gap-2'>
        <Coins />
        <p>{user ? user.points : ''}</p>
      </div>

      {isDialogOpen && (
        <div className="absolute top-16 left-4 bg-white border border-gray-300 rounded shadow-lg p-4 w-48">
          <>
          <Link href="/perfil" className="block py-2 text-blue-500 hover:underline">
            Ver Perfil
          </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left py-2 text-red-500 hover:underline"
            >
              Logout
            </button>
          </>
        </div>
      )}
    </div>
  );
};

export default Navbar;