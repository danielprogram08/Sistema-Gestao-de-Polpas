import React from 'react';
import CardContainer from '../CardContainer';

const lowStockData = [
    { name: "Polpa de Maracujá", units: 5, status: 'low' }, //Somente para simulação
    { name: "Polpa de Cajá", units: 30, status: 'medium' }, //Somente para simulação
    { name: "Polpa de Goiaba", units: 27, status: 'medium' }, //Somente para simulação
    { name: "Polpa de Manga", units: 50, status: 'high' }, //Somente para simulação
];

const salesData = [
    { name: "Polpa de Abacaxi", sales: 8, price: 25.00 }, //Somente para simulação
    { name: "Polpa de Manga", sales: 10, price: 30.00 }, //Somente para simulação
    { name: "Polpa de Acerola", sales: 3, price: 12.00 }, //Somente para simulação
    { name: "Polpa de Cajá", sales: 6, price: 24.00 }, //Somente para simulação
    { name: "Polpa de Cajá", sales: 2, price: 8.00 }, //Somente para simulação
    { name: "Polpa de Abacaxi", sales: 12, price: 36.00 }, //Somente para simulação
];

const alertsData = [];

export default function Dashboard() {
    return (
        <main className="p-8 w-full h-full">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <CardContainer
                        title="Estoque Baixo"
                        data={lowStockData}
                        variant="low-stock"
                    />
                    <CardContainer
                        title="Últimas Vendas"
                        data={salesData}
                        variant="sales"
                    />
                    <CardContainer
                        title="Alertas"
                        data={alertsData}
                        variant="alerts"
                    />
                </div>
            </div>
        </main>
    );
}