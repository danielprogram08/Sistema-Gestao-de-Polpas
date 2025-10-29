export default function Button({children}) {
    return (
        <button className="flex items-center pt-3.5 pb-3.5 pl-10 pr-10 bg-[#B78F57] rounded-[5px] text-white font-semibold cursor-pointer">
            {children}
        </button>
    )
}