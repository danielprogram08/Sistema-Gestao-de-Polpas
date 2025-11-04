export default function Button({ children, iconOnly = false, variant = 'primary', size = 'medium', className= '', ...rest }) {
    const baseClasses = "flex items-center justify-center font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300";

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    };

    const sizes = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
    };

    const iconClasses = "p-2 bg-transparent cursor-pointer";

    const selectedClasses = iconOnly
        ? `${iconClasses} ${sizes[size]}`
        : `${baseClasses} ${variants[variant]} ${sizes[size]}`;

    const finalClasses = `${selectedClasses} ${className}`;    

    return (
        <button className={finalClasses} {...rest}>
            {children}
        </button>
    );
}
