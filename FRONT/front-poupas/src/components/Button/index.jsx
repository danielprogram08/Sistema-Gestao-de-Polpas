export default function Button({children, iconOnly = false}) {
    
    const baseClasses = "flex items-center pt-3.5 pb-3.5 pl-10 pr-10 bg-[#B78F57] rounded-[5px] text-white font-semibold cursor-pointer";
    const iconClasses = "p-0 bg-transparent cursor-pointer";
    const finalClasses = iconOnly ? iconClasses : baseClasses;


    return (
        <button className={finalClasses}>
            {children}
        </button>
    )
}
