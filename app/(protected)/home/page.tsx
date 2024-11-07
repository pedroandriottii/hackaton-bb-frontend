import Navbar from '@/components/base/navbar';
import React from 'react';

const Discard: React.FC = () => {
  return (
    <div className='bg-bb-blue'>
      <Navbar />
      <div>
        <h1 className='text-bb-yellow'>Descartar lixo eletrônico</h1>
      </div>
    </div>
  );
};

export default Discard;