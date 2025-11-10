import React from "react";
import Header from "../components/Header";
import Dashboard from "../components/Dashboard";

function DashboardPage() {
    return (
        <div className='flex flex-col items-center min-h-screen bg-gray-100'>
            <Header />
            <div className="w-[70%] bg-white p-8 rounded-2xl shadow-2xl mt-24">
                <Dashboard />
            </div>
        </div>
    )
}

export default DashboardPage;