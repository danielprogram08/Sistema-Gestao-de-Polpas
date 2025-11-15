import React from 'react';
import Header from '../components/Header';
import StockMovementList from '../components/StockMovementList';

const movementData = [
    { name: "Polpa de Acerola", units: 4, type: 'out' },
    { name: "Polpa de Abacaxi", units: 6, type: 'out' },
    { name: "Polpa de Manga", units: 25, type: 'in' },
    { name: "Polpa de Cajá", units: 12, type: 'out' },
    { name: "Polpa de Cajá", units: 30, type: 'in' },
    { name: "Polpa de Maracujá", units: 11, type: 'out' },
    { name: "Polpa de Goiaba", units: 20, type: 'in' },
    { name: "Polpa de Abacaxi", units: 15, type: 'out' },
];


export default function StockMovementPage() {
    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>
            <Header />

            <div className="flex flex-col items-center w-[55%] mt-28">
                <div className="w-full">
                    <StockMovementList 
                        title="Entrada/Saída de Produtos"
                        data={movementData}
                        itemVariant="movement"
                    />
                </div>
            </div>
        </div>
    );
}