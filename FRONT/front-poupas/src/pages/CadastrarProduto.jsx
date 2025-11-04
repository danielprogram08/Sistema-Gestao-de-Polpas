import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import CadastrarProdutoForm from '../components/CadastroProdutoForm';

function CadastrarProduto() {
    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-200'>
            <Header />
            <div className='flex flex-col items-center border-2 mt-40 p-8 pl-12 pr-12 rounded-2xl bg-white'>
                <h1 className="text-3xl font-bold text-center mb-6 flex items-center">Cadastre seu produto</h1>
                <CadastrarProdutoForm />
            </div>
        </div>
    )
}

export default CadastrarProduto;