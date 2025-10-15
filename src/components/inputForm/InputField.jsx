import useInvoice from '../../hooks/useInvoice';

const InputField = ({
    label,
    path,
    type = 'text',
    placeholder = '',
    isNumber = false,
}) => {
    const { invoiceData, handleChange } = useInvoice();
    return (
        <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
                {label}
            </label>
            <input
                type={type}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                placeholder={placeholder}
                value={path
                    .split('.')
                    .reduce((o, i) => (o ? o[i] : ''), invoiceData)}
                onChange={(e) => handleChange(e, path, isNumber)}
                step={isNumber ? '0.01' : undefined}
            />
        </div>
    );
};

export default InputField;
