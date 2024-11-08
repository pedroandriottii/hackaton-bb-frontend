import React from 'react';
import { Coins, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <div className='bg-bb-yellow flex p-4 items-center justify-between'>
      <div className='border border-bb-blue rounded-full p-2'>
        <User className='text-bb-blue' />
      </div>
      <h1>LogoBB</h1>
      <div className='flex items-center text-bb-blue bg-yellow-300 p-2 rounded-full gap-2'>
        <p><Coins /></p>
        <p>100</p>
      </div>
    </div>
  );
};

export default Navbar;