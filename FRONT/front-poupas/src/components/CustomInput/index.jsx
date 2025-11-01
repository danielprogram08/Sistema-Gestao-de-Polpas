export default function Input({ id, label, type = "text", placeholder, value, onChange, containerClassName, ...rest }) {
    return (
        <div className={`relative ${containerClassName || ''}`}>
            <input
                id={id}
                type={type}
                placeholder={placeholder || ' '}
                value={value}
                onChange={onChange}
                className="block w-full px-4 py-3 text-white bg-transparent border-2 border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-blue-200 peer"
                {...rest}
            />
            <label
                htmlFor={id}
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
                {label}
            </label>
        </div>
    );
}
