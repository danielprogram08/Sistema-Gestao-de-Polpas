import React from 'react';
import CardContainer from '../CardContainer'; // Importa o container do cartão

// ----------------------------------------------------------------------
// DADOS DE TESTE (MOCK DATA)
// ----------------------------------------------------------------------

const lowStockData = [
    { name: "Polpa de Maracujá", units: 5, status: 'low' },
    { name: "Polpa de Cajá", units: 30, status: 'medium' },
    { name: "Polpa de Goiaba", units: 27, status: 'medium' },
    { name: "Polpa de Manga", units: 50, status: 'high' },
];

const salesData = [
    { name: "Polpa de Abacaxi", sales: 8, price: 25.00 },
    { name: "Polpa de Manga", sales: 10, price: 30.00 },
    { name: "Polpa de Acerola", sales: 3, price: 12.00 },
    { name: "Polpa de Cajá", sales: 6, price: 24.00 },
    { name: "Polpa de Cajá", sales: 2, price: 8.00 },
    { name: "Polpa de Abacaxi", sales: 12, price: 36.00 },
];

const alertsData = [
    // O cartão de alertas é especial e renderiza conteúdo fixo.
];


// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL (DASHBOARD)
// ----------------------------------------------------------------------

export default function Dashboard() {
    return (
        <main className="p-8 w-full max-w-7xl mx-auto border-2 rounded-4xl bg-white">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-700">Dashboard</h1>
            
            {/* GRID PRINCIPAL: Layout de 3 colunas */}
            {/* gap-6 define o espaço entre as colunas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
                
                {/* 1. ESTOQUE BAIXO (Esquerda) */}
                <CardContainer 
                    title="Estoque baixo" 
                    data={lowStockData} 
                    variant="low-stock" 
                    itemVariant="stock" // Diz ao CardListItem para usar a lógica de estoque
                />

                {/* 2. ÚLTIMAS VENDAS (Centro) */}
                <CardContainer 
                    title="Últimas vendas" 
                    data={salesData} 
                    variant="sales" 
                    itemVariant="sales" // Diz ao CardListItem para usar a lógica de vendas
                />
                
                {/* 3. ALERTAS (Direita) */}
                <CardContainer 
                    title="Alertas" 
                    data={alertsData} // Passamos o array, mas o cartão renderiza o alerta fixo
                    variant="alerts" 
                    // Não precisamos de itemVariant, pois o CardContainer lida com a lógica de alertas
                />
            </div>
        </main>
    );
}