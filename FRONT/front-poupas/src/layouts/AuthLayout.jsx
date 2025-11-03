import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-[#d6d6d6]">
      <div className="w-1/2 bg-linear-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white p-12 rounded-2xl">
        <h1 className="text-4xl font-bold mb-4">Sistema de Gestão de Polpas</h1>
        <p className="text-lg">A sua solução completa para gerenciamento de polpas.</p>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg border-2 border-gray-700">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
