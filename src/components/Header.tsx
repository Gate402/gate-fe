import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight, Plus, ChevronDown } from 'react-feather';

const Header: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-800">
      <div className="flex items-center">
        {pathnames.length > 0 ? (
          <>
            <span className="text-gray-400">Dashboard</span>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;

              return (
                <div key={to} className="flex items-center">
                  <ChevronRight size={20} className="mx-1 text-gray-500" />
                  {last ? (
                    <span className="text-white capitalize">{value}</span>
                  ) : (
                    <span className="text-gray-400 capitalize">{value}</span>
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <span className="text-white">Dashboard</span>
        )}
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 p-2 bg-[#0D1117] border border-gray-700 rounded-md">
          <span className="text-xs text-green-400 mr-2">●</span>
          <span>LIVE MAINNET</span>
          <ChevronDown size={16} className="ml-2 text-gray-500" />
        </div>
        <div className="mr-4 flex items-center p-2 bg-[#0D1117] border border-gray-700 rounded-md">
          <span>Last 30 Days</span>
          <ChevronDown size={16} className="ml-2 text-gray-500" />
        </div>
        <button className="flex items-center p-2 bg-green-600 hover:bg-green-700 rounded-md">
          <Plus size={20} className="mr-1" />
          New Gateway
        </button>
      </div>
    </header>
  );
};

export default Header;
