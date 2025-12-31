import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Zap, Key, GitBranch, Repeat, Settings } from 'react-feather';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#161B22] p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center mb-8">
          <div className="bg-green-500 w-8 h-8 rounded-md mr-2"></div>
          <h1 className="text-xl font-bold">x402 Dev</h1>
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center p-2 text-gray-300 bg-gray-700 rounded-md">
                <Home size={20} className="mr-3" />
                Home
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/gateways" className="flex items-center p-2 text-gray-400 hover:bg-gray-700 rounded-md">
                <Zap size={20} className="mr-3" />
                Gateways
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/api-keys" className="flex items-center p-2 text-gray-400 hover:bg-gray-700 rounded-md">
                <Key size={20} className="mr-3" />
                API Keys
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/webhooks" className="flex items-center p-2 text-gray-400 hover:bg-gray-700 rounded-md">
                <GitBranch size={20} className="mr-3" />
                Webhooks
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/transactions" className="flex items-center p-2 text-gray-400 hover:bg-gray-700 rounded-md">
                <Repeat size={20} className="mr-3" />
                Transactions
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <div className="mb-4">
          <Link to="/settings" className="flex items-center p-2 text-gray-400 hover:bg-gray-700 rounded-md">
            <Settings size={20} className="mr-3" />
            Settings
          </Link>
        </div>
        <div className="flex items-center p-2 border-t border-gray-700">
          <div className="w-8 h-8 rounded-full bg-gray-600 mr-3"></div>
          <div>
            <p className="font-semibold">Dev Wallet</p>
            <p className="text-sm text-gray-400">0x1234...abcd</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
