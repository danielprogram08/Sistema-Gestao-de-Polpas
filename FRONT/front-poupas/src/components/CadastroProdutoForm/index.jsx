import React, { useState } from 'react';
import Button from '../Button';
import CustomInput from '../CustomInput';

export default function CadastrarProdutoForm() {
    const [formData, setFormData] = useState({
        nome: '',
        quantidade: '',
        preco: '',
        dataDeValidade: '',
        categoria: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Dados do formulário:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 border-2 w-[20%] flex flex-col items-center">
            <CustomInput
                id="nome"
                label="Nome do Produto"
                type="text"
                value={formData.nome}
                onChange={handleChange}
                containerClassName="w-full"
            />
            <CustomInput
                id="quantidade"
                label="Quantidade"
                type="number"
                value={formData.quantidade}
                onChange={handleChange}
                containerClassName="w-full"
            />
            <CustomInput
                id="preco"
                label="Preço"
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={handleChange}
                containerClassName="w-full"
            />
            <CustomInput
                id="dataDeValidade"
                label="Data de Validade"
                type="month"
                value={formData.dataDeValidade}
                onChange={handleChange}
                containerClassName="w-full"
            />
            <CustomInput
                id="categoria"
                label="Categoria"
                type="text"
                value={formData.categoria}
                onChange={handleChange}
                containerClassName="w-full"
            />
            <Button>
                Cadastrar Produto
            </Button>
        </form>
    );
}