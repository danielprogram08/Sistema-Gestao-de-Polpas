import React from 'react';
import Header from '../components/Header';
import CadastrarProdutoForm from '../components/CadastroProdutoForm';

function CadastrarProduto() {
    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>
            <Header />
            <div className='flex flex-col items-center w-full max-w-2xl p-8 mt-38'>
                <div className="w-full bg-white p-8 rounded-2xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Cadastre seu produto</h1>
                    <p className="text-center text-gray-500 mb-8">Preencha os campos abaixo para cadastrar um novo produto.</p>
                    <CadastrarProdutoForm />
                </div>
            </div>
        </div>
    )
}

export default CadastrarProduto;