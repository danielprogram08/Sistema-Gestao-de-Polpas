import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import CadastrarProduto from './pages/CadastrarProduto.jsx';

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
