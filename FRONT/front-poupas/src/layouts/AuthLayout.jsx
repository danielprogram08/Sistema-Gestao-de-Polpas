import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center items-center text-white p-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo de volta!</h1>
          <p className="text-lg">Faça login para continuar e gerenciar suas polpas.</p>
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
