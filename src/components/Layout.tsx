import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-[#0D1117] text-white flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
