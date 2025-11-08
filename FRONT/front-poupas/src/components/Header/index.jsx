import Button from "../Button/"
import Input from "../CustomInput"

import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { FaBell } from "react-icons/fa";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md w-full h-20 flex items-center text-gray-800">

            <div className="w-full flex h-16 items-center justify-between px-6">
                <div className="flex items-center">
                    <h1 className="text-gray-800 text-2xl font-bold">Casa Bessa Polpas</h1>
                </div>
                <div className="flex justify-center w-1/2">
                    <Input placeholder={"Pesquisar polpa"} containerClassName="w-full max-w-lg"/>
                </div>
                <div className="flex items-center gap-4">
                    <Button iconOnly className="relative group">
                        <FaUserCircle size="25px" className="text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
                        <span className="absolute bottom-full mb-2 w-auto p-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Perfil
                        </span>
                    </Button>
                    <Button iconOnly className="relative group">
                        <AiFillHome size="25px" className="text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
                        <span className="absolute bottom-full mb-2 w-auto p-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Página Inicial
                        </span>
                    </Button>
                    <Button iconOnly className="relative group">
                        <TbReportAnalytics size="25px" className="text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
                        <span className="absolute bottom-full mb-2 w-auto p-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Relatórios
                        </span>
                    </Button>
                    <Button iconOnly className="relative group">
                        <FaBell size="25px" className="text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
                        <span className="absolute bottom-full mb-2 w-auto p-2 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            Notificações
                        </span>
                    </Button>
                </div>
            </div>
        </header>
    )
}