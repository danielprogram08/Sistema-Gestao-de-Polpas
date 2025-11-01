
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-6">Acesse sua conta</h1>
      <LoginForm />
      <p className="text-center mt-4">
        Não tem uma conta? {' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Cadastre-se
        </Link>
      </p>
    </>
  );
}

export default Login;
