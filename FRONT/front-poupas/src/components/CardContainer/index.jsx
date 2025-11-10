import React from 'react';
import CardListItem from '../CardListItem';
import Button from '../Button';

export default function CardContainer({ title, data, variant }) {

    const variantClasses = {
        'low-stock': {
            bg: 'bg-red-50',
            titleColor: 'text-red-800',
            borderColor: 'border-red-200'
        },
        'sales': {
            bg: 'bg-green-50',
            titleColor: 'text-green-800',
            borderColor: 'border-green-200'
        },
        'alerts': {
            bg: 'bg-yellow-50',
            titleColor: 'text-yellow-800',
            borderColor: 'border-yellow-200'
        },
        'default': {
            bg: 'bg-gray-50',
            titleColor: 'text-gray-800',
            borderColor: 'border-gray-200'
        }
    };

    const selectedVariant = variantClasses[variant] || variantClasses.default;

    const itemType = (variant === 'low-stock') ? 'stock' :
                     (variant === 'sales') ? 'sales' :
                     null;

    return (
        <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${selectedVariant.bg}`}>
            <div className={`flex justify-between items-center mb-4 pb-3 border-b-2 ${selectedVariant.borderColor}`}>
                <h2 className={`text-xl font-bold ${selectedVariant.titleColor}`}>{title}</h2>
            </div>

            <div className="space-y-4">
                {itemType && data && data.length > 0 ? (
                    data.map((item, index) => (
                        <CardListItem
                            key={index}
                            item={item}
                            variant={itemType}
                        />
                    ))
                ) : (
                    variant === 'alerts' && (
                        <div className="text-center py-4">
                            <p className="text-gray-600 mb-4">Nenhum alerta novo!</p>
                            <Button variant="secondary" className="w-full">
                                Ver todos os alertas
                            </Button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}