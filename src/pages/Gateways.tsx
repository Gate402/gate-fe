import React from 'react';
import { Search, Filter, MoreVertical } from 'react-feather';

const Gateways: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Gateways</h2>
          <p className="text-gray-400">Manage your API monetization endpoints, monitor traffic, and configure x402 payment rules.</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md">
          + Create New Gateway
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Stats cards */}
      </div>
      <div className="bg-[#161B22] rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search by name or subdomain..." className="bg-[#0D1117] border border-gray-700 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <button className="ml-4 flex items-center border border-gray-700 rounded-md px-4 py-2 text-gray-300 hover:bg-gray-700">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
          </div>
          {/* Add view options here */}
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-sm">
              <th className="py-3 font-normal">GATEWAY / STATUS</th>
              <th className="py-3 font-normal">SUBDOMAIN URL</th>
              <th className="py-3 font-normal">REQUESTS (24H)</th>
              <th className="py-3 font-normal">REVENUE (24H)</th>
              <th className="py-3 font-normal">CONVERSION</th>
              <th className="py-3 font-normal">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows */}
            <tr className="border-b border-gray-700">
                <td className="py-4">LLM Agent Proxy</td>
                <td className="py-4 text-gray-400">agent-proxy.x402.io</td>
                <td className="py-4">14,203</td>
                <td className="py-4">0.45 ETH</td>
                <td className="py-4 text-green-500">98.5%</td>
                <td className="py-4"><MoreVertical size={20} /></td>
            </tr>
            <tr className="border-b border-gray-700">
                <td className="py-4">Image Gen API</td>
                <td className="py-4 text-gray-400">img-gen-v2.x402.io</td>
                <td className="py-4">8,112</td>
                <td className="py-4">0.12 ETH</td>
                <td className="py-4 text-green-500">92.1%</td>
                <td className="py-4"><MoreVertical size={20} /></td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <p>Showing 1-5 of 8 gateways</p>
          <div>
            <button className="hover:text-white mr-4">Previous</button>
            <button className="hover:text-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gateways;
