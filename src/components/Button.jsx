const Button = ({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    hoverColor = 'hover:bg-blue-700',
    textColor = 'text-white',
    className = '',
    ...props
}) => {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${hoverColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;