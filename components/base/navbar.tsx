import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <div className='bg-bb-yellow flex p-4 items-center justify-between'>
      <div className='bg-bb-blue rounded-full p-2'>
        <User className='text-bb-yellow' />
      </div>
      <h1>LogoBB</h1>
      <p>100 Pts</p>
    </div>
  );
};

export default Navbar;