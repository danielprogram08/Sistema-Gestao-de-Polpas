import React from 'react';

const STATUS_COLORS = {
    low: 'bg-red-500',
    medium: 'bg-yellow-500',
    high: 'bg-green-500',
};

export default function CardListItem({ item, variant }) {

    const baseClasses = "flex justify-between items-center p-3 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-all duration-300";

    if (variant === 'stock') {
        const statusColor = STATUS_COLORS[item.status] || 'bg-gray-400';

        return (
            <div className={baseClasses}>
                <div className="text-sm text-gray-800">
                    {item.name}: <span className="font-bold text-gray-900">{item.units} un. restantes</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${statusColor}`} title={`Status: ${item.status}`}></div>
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
                <div className="text-sm text-gray-800">
                    {item.name}: <span className="font-bold text-gray-900">{item.sales} un. vendidas</span>
                </div>
                <div className="text-sm font-semibold text-green-600">
                    {priceFormatted}
                </div>
            </div>
        );
    }
    return <div className="p-3 text-red-500">Erro: Variante não reconhecida.</div>;
}