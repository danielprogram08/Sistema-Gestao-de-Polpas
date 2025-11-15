import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import CadastrarProduto from './pages/CadastrarProduto.jsx';
import Dashboard from './pages/DashboardPage.jsx';
import StockMovementPage from './pages/StockMovementPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';

const router = createBrowserRouter([
  //Rota principal (talvez por enquanto só)
  {
    path: '/',
    element: <App />,
  },

  //Rota de Cadastro de Produto
  {
    path: '/cadastrar-produto',
    element: <CadastrarProduto />, 
  },

  //Rota para Dashboard
  {
    path: '/dashboard',
    element: <Dashboard />
  },

  //Rota para Entrada/saída
  {
    path: '/stock-movement',
    element: <StockMovementPage />
  },

  //Rota para Relatórios
  {
    path: '/reports',
    element: <ReportsPage />
  },
  
  //Rota de Autenticação com layout
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
