export default function Input({ id, label, type = "text", placeholder, value, onChange, containerClassName, ...rest }) {
    return (
        <div className={`flex flex-col ${containerClassName || ''}`}>
            {label && <label htmlFor={id} className="mb-1 text-gray-700">{label}</label>}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="bg-gray-300 rounded-[10px] p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
                {...rest}
            />
        </div>
    );
}
