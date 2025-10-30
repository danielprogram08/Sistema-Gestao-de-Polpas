import Button from '../Button';

import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { FaBell } from "react-icons/fa";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-[#111418]/95 backdrop-blur-sm w-full border-b border-[#2e3237] h-20 flex items-center">

            <div className="w-full flex h-16 items-center justify-between">
                <div className="flex justify-center w-[25%]">
                    <h1 className="text-white text-[35px]">Casa Bessa Polpas</h1>
                </div>
                <div className="flex justify-center w-[50%]">
                    <input type="search" placeholder="Pesquisar polpa" className="bg-white w-[65%] rounded-xs h-8"></input>
                </div>
                <div className="flex justify-around w-[25%]">
                    <Button iconOnly><FaUserCircle color="white" size="25px" /></Button>
                    <Button iconOnly><AiFillHome color="white" size="25px" /></Button>
                    <Button iconOnly><TbReportAnalytics color="white" size="25px" /></Button>
                    <Button iconOnly><FaBell color="white" size="25px" /></Button>
                </div>
            </div>
        </header>
    )
}