import React, { useState } from 'react';
import Button from '../Button';
import CustomInput from '../CustomInput';
import { FaBox, FaDollarSign, FaCalendarAlt, FaTags, FaPlus } from 'react-icons/fa';

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
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                    <CustomInput
                        id="nome"
                        label="Nome do Produto"
                        type="text"
                        value={formData.nome}
                        onChange={handleChange}
                        containerClassName="pl-10"
                    />
                    <FaBox className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                    <CustomInput
                        id="quantidade"
                        label="Quantidade"
                        type="number"
                        value={formData.quantidade}
                        onChange={handleChange}
                        containerClassName="pl-10"
                    />
                    <FaPlus className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                    <CustomInput
                        id="preco"
                        label="Preço"
                        type="number"
                        step="0.01"
                        value={formData.preco}
                        onChange={handleChange}
                        containerClassName="pl-10"
                    />
                    <FaDollarSign className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative">
                    <CustomInput
                        id="dataDeValidade"
                        label="Data de Validade"
                        type="month"
                        value={formData.dataDeValidade}
                        onChange={handleChange}
                        containerClassName="pl-10"
                    />
                    <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                </div>
                <div className="relative md:col-span-2">
                    <CustomInput
                        id="categoria"
                        label="Categoria"
                        type="text"
                        value={formData.categoria}
                        onChange={handleChange}
                        containerClassName="pl-10"
                    />
                    <FaTags className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                </div>
            </div>
            <div className="flex justify-end gap-4">
                <Button type="button" variant="success">
                    Cadastrar Produto
                </Button>
                <Button type="submit" variant="danger">
                    Cancelar
                </Button>
            </div>
        </form>
    );
}