import { Button } from '@/components/ui/button';
import React from 'react';

const Page: React.FC = () => {
  return (
    <div>
      <h1 className='bg-red-500 font-bold text-yellow-300'>Hello, World!</h1>
      <Button>
        <span>Click me</span>
      </Button>
    </div>
  );
};

export default Page;