import React from "react";
import Header from "../components/Header";
import CardContainer from "../components/CardContainer";

// ----------------------------------------------------------------------
// DADOS DE TESTE (MOCK DATA)
// ----------------------------------------------------------------------

const stockReportData = [
    { name: "Polpa de Abacaxi", units: 52 },
    { name: "Polpa de Acerola", units: 40 },
    { name: "Polpa de Cajá", units: 66 },
    { name: "Polpa de Graviola", units: 44 },
    { name: "Polpa de Goiaba", units: 29 },
    { name: "Polpa de Manga", units: 35 },
    { name: "Polpa de Maracujá", units: 15 },
    { name: "Polpa de Uva", units: 28 },
];

const topSellingData = [
    { rank: 1, name: "Polpa de Maracujá" },
    { rank: 2, name: "Polpa de Manga" },
    { rank: 3, name: "Polpa de Abacaxi" },
];

// Componente helper para os blocos de Vendas
const SalesSummaryBlock = ({ title, amount }) => (
    <div className="bg-white p-4 rounded-lg shadow-inner text-center">
        <h3 className="text-gray-600 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-gray-800">{amount}</p>
    </div>
);

// ----------------------------------------------------------------------
// PÁGINA DE RELATÓRIOS
// ----------------------------------------------------------------------

export default function ReportsPage() {
    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>
            <Header />

            {/* Container principal (o "cartão" branco que envolve tudo) */}
            <div className="w-[70%] bg-white p-8 rounded-2xl shadow-2xl mt-20">
                
                {/* Cabeçalho da Seção */}
                <div className="flex justify-center items-center mb-6 pb-4 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Relatórios
                    </h1>
                </div>

                {/* Grid de 3 Colunas (usando o layout do Dashboard) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                    {/* 1. ESTOQUE ATUAL (Usa 'data' e 'CardListItem') */}
                    <CardContainer 
                        title="Estoque atual" 
                        data={stockReportData} 
                        variant="stock-report" // Usa a cor de fundo bege
                        itemVariant="stock-report" // Usa a nova lógica do CardListItem
                    />

                    {/* 2. VENDAS (Usa 'children' para conteúdo customizado) */}
                    <CardContainer 
                        title="Vendas"
                        variant="sales" // Usa a cor de fundo verde
                    >
                        {/* Conteúdo customizado passado como 'children' */}
                        <div className="space-y-4">
                            <SalesSummaryBlock title="Hoje:" amount="R$ 52,44" />
                            <SalesSummaryBlock title="Essa semana:" amount="R$ 457,80" />
                            <SalesSummaryBlock title="Esse mês:" amount="R$ 3118,09" />
                        </div>
                    </CardContainer>

                    {/* 3. PRODUTOS MAIS VENDIDOS (Usa 'children') */}
                    <CardContainer 
                        title="Produtos mais vendidos"
                        variant="low-stock" // Usa a cor de fundo bege
                    >
                        {/* Conteúdo customizado (lista numerada) */}
                        <div className="space-y-3">
                            {topSellingData.map((item) => (
                                <div key={item.rank} className="flex items-center p-3 bg-white rounded-md shadow-sm">
                                    <span className="text-lg font-bold text-gray-500 w-6">{item.rank}</span>
                                    <span className="text-sm text-gray-800 ml-4">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContainer>
                
                </div>
            </div>
        </div>
    );
}