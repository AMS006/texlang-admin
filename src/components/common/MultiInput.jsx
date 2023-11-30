import { Controller } from 'react-hook-form';

const MultiInput = ({ label, name, type, placeholder, control, errorMessage }) => {

    return (
        <div className="flex flex-col gap-0 w-full">
            {label && <label className="font-semibold">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        type={type}
                        {...field}
                        placeholder={placeholder}
                        className={`px-2 py-1.5 border w-full rounded ${errorMessage ? 'border-red-500 focus:outline-red-500' : 'border-gray-400 focus:outline-blue-500'
                            }`}
                    />
                )}
            />
            {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
        </div>
    );
};

export default MultiInput;
