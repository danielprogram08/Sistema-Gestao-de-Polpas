import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";
import Button from "../components/Button";


function DashboardPage() {
    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>
            <Header />
            <div className="flex flex-col items-center w-[70%] bg-white p-8 rounded-2xl shadow-2xl mt-20">
                <Dashboard />
                <Link to="/cadastrar-produto" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Cadastrar Produto
                </Link>
            </div>
        </div>
    )
}

export default DashboardPage;