import React from 'react';
import CardListItem from '../CardListItem';
import { FiChevronDown } from 'react-icons/fi';
import Button from '../Button';

/**
 * Componente que define o layout de um cartão de lista (ex: Entrada/Saída).
 * @param {object} props
 * @param {string} props.title - Título do cartão (ex: 'Entrada/Saída').
 * @param {Array<object>} props.data - Array de dados a serem listados.
 * @param {string} props.itemVariant - A variante a ser passada para CardListItem (ex: 'movement').
 */
export default function StockMovementList({ title, data, itemVariant }) {
    
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 5; 

    return (
        <div className="p-6 rounded-2xl shadow-lg transition-all duration-300 bg-gray-50">
            
            {/* Cabeçalho com Título e Filtro */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
                    Filtrar por
                    <FiChevronDown />
                </button>
            </div>

            {/* Lista de Itens */}
            <div className="space-y-4 mb-6">
                {data && data.length > 0 ? (
                    data.map((item, index) => (
                        <CardListItem 
                            key={index} 
                            item={item} 
                            variant={itemVariant} 
                        />
                    ))
                ) : (
                    <div className="text-center py-4">
                        <p className="text-gray-500 mb-4">Nenhuma movimentação registrada.</p>
                        <Button variant="secondary" className="w-full">
                            Ver Histórico Completo
                        </Button>
                    </div>
                )}
            </div>

            {/* Rodapé de Paginação */}
            <div className="flex justify-center items-center gap-2 text-gray-600 font-medium">
                {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isCurrent = pageNum === currentPage;
                    return (
                        <button 
                            key={pageNum} 
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${isCurrent ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-200 hover:bg-gray-300'}`}
                        >
                            {pageNum}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}