import React from 'react';

const STATUS_COLORS = {
    low: 'bg-red-500',
    medium: 'bg-yellow-500',
    high: 'bg-green-500',
};

export default function CardListItem({ item, variant }) {

    const baseClasses = "flex justify-between items-center p-3 rounded-md bg-white border border-gray-200 shadow-sm";

    if (variant === 'stock') {
        const statusColor = STATUS_COLORS[item.status] || 'bg-gray-400';

        return (
            <div className={baseClasses}>
                {/* Informação do Produto e Quantidade */}
                <div className="text-sm text-gray-800">
                    {item.name}: <span className="font-semibold">{item.units} un. restantes</span>
                </div>
                <div className={`w-3 h-5 rounded-sm ${statusColor}`} title={`Status: ${item.status}`}>
                    {/* Barra de Status Visual */}
                </div>
            </div>
        )
    }

    if (variant === 'sales') {
        const priceFormatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(item.price);

        return (
            <div className={baseClasses}>
                {/* Informação do Produto e Vendas */}
                <div className="text-sm text-gray-800">
                    {item.name}: <span className="font-semibold">{item.sales} un. vendidas</span>
                </div>

                {/* Valor da Venda */}
                <div className="text-sm font-medium text-green-700">
                    {priceFormatted}
                </div>
            </div>
        );
    }
    return <div className="p-3 text-red-500">Erro: Variante não reconhecida.</div>;
}