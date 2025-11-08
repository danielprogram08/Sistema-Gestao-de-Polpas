
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

function Register() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Crie sua conta</h1>
      <RegisterForm />
      <p className="text-center mt-6 text-gray-600">
        Já tem uma conta?{' '}
        <Link to="/login" className="text-blue-500 hover:underline font-semibold">
          Faça login
        </Link>
      </p>
    </>
  );
}

export default Register;
