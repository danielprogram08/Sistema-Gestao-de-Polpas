
// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <Outlet /> {/* As páginas de Login e Cadastro serão renderizadas aqui */}
      </div>
    </div>
  );
}

export default AuthLayout;
