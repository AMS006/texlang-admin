import React from 'react'
const FormSelect = ({ options, label, register, errorMessage, isLabel }) => {

    return (
        <div className='flex flex-col gap-0.5 w-full'>
            <label className='font-semibold'>{label}</label>
            <select
                {...register}
                options={options}
                defaultValue={''}
                className={`px-2.5 py-1.5 border w-full rounded ${errorMessage ? 'border-red-500 focus:outline-red-500' : 'border-gray-400 focus:outline-blue-500'}`}
            >
                <option value="" disabled>Select {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={isLabel ? option.label : option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {errorMessage && <span className='text-xs text-red-500'>{errorMessage}</span>}
        </div>
    )
}

export default FormSelect
