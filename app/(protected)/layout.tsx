// app/protected/layout.tsx
'use client';

import React, { ReactNode } from 'react';
import Navbar from '@/components/base/navbar_logado';
import Tabbar from '@/components/base/tabbar';

interface ProtectedLayoutProps {
  children: ReactNode;
}

const ProtectedLayout: React.FC<ProtectedLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow mb-16">{children}</main>

      <div className="fixed bottom-0 w-full">
        <Tabbar />
      </div>
    </div>
  );
};

export default ProtectedLayout;