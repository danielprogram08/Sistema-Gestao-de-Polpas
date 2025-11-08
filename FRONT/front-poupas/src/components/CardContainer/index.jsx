import React from 'react';
import CardListItem from '../CardListItem';
import Button from '../Button';

export default function CardContainer({title, data, variant}) { 

    const bgColor = variant === 'low-stock' ? 'bg-orange-100' :
                    variant === 'sales' ? 'bg-green-100' : 'bg-gray-100';

    const itemType = (variant === 'low-stock') ? 'stock' : 
                     (variant === 'sales') ? 'sales' :
                     null;             

    return (
        <div className={`p-4 rounded-lg shadow-md ${bgColor}`}>

            {/* Cabeçalho do Cartão */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b ">
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            {/* Conteúdo do Cartão */}
            <div className="space-y-3">
                
                {/* Renderiza os itens APENAS se não for o cartão de alertas 
                  e se a variante for reconhecida ('stock' ou 'sales').
                */}
                {itemType && data && data.map((item, index) => (
                    <CardListItem 
                        key={index} 
                        item={item} 
                        // PASSA A STRING CORRETA: 'stock' ou 'sales'
                        variant={itemType} 
                    />
                ))}

                {/* Se for o cartão de Alertas, adicione a lógica de alerta */}
                {variant === 'alerts' && (
                    <div className="text-center mt-6">
                        <p className="mb-4">Nenhum alerta novo!</p>
                        <Button className="w-full">
                            Ver todos os alertas
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );                
}