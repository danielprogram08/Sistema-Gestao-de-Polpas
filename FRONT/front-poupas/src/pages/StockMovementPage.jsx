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
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <Header />

            <div className="py-12 w-[55%] mt-16">
                <StockMovementList 
                    title="Entrada/Saída"
                    data={movementData}
                    itemVariant="movement"
                />
            </div>
        </div>
    );
}