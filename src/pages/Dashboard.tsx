import React from 'react';
import { ArrowDown, ArrowUp, ExternalLink, RefreshCw } from 'react-feather';

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#161B22] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">TOTAL REVENUE (LIFETIME)</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">$12,450.00 <span className="text-sm text-gray-500">USD</span></p>
            <span className="flex items-center text-green-500 text-sm">
              <ArrowUp size={16} className="mr-1" /> 12.5%
            </span>
          </div>
        </div>
        <div className="bg-[#161B22] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">REVENUE (24H / 7D)</h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-3xl font-bold">$450 <span className="text-gray-500">/ $3,200</span></p>
            <span className="flex items-center text-red-500 text-sm">
              <ArrowDown size={16} className="mr-1" /> 2.1%
            </span>
          </div>
        </div>
        <div className="bg-[#161B22] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">REQUESTS (30D)</h3>
          <p className="text-3xl font-bold mt-2">1.2M</p>
        </div>
        <div className="bg-[#161B22] p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm">SUCCESSFUL PAYMENTS</h3>
          <p className="text-3xl font-bold mt-2">8,432</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#161B22] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Revenue Volume</h3>
          <div className="h-64 bg-gray-800 rounded-md"></div>
        </div>
        <div className="bg-[#161B22] p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Latest Transactions</h3>
          <ul>
            <li className="flex items-center justify-between py-3 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3"><ArrowDown size={16} /></div>
                <div>
                  <p>Payment Received</p>
                  <p className="text-sm text-gray-400">2 min ago</p>
                </div>
              </div>
              <p className="text-green-500">+$24.00</p>
            </li>
            <li className="flex items-center justify-between py-3 border-b border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3"><ArrowDown size={16} /></div>
                <div>
                  <p>Payment Received</p>
                  <p className="text-sm text-gray-400">15 min ago</p>
                </div>
              </div>
              <p className="text-green-500">+$10.50</p>
            </li>
            <li className="flex items-center justify-between py-3 border-b border-gray-700">
              <div className="flex items-center">
                 <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3"><RefreshCw size={16} /></div>
                <div>
                  <p>Processing</p>
                  <p className="text-sm text-gray-400">1 hr ago</p>
                </div>
              </div>
              <p>$5.00</p>
            </li>
            <li className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3"><ArrowDown size={16} /></div>
                <div>
                  <p>Payment Received</p>
                  <p className="text-sm text-gray-400">2 hrs ago</p>
                </div>
              </div>
              <p className="text-green-500">+$45.00</p>
            </li>
          </ul>
          <a href="#" className="flex items-center mt-4 text-green-500">
            View All Transactions <ExternalLink size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
