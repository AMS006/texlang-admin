import React from 'react'

const SelectControl = ({ options, onChange, label, id, value, disabled }) => {
    return (
        <div className='flex flex-col gap-0 w-full'>
            <label htmlFor={id} className='font-semibold'>{label}</label>
            <select
                onChange={(e) => onChange(e.target.value)}
                value={value}
                disabled={disabled}
                className={`px-2.5 py-1.5 border w-full rounded  border-gray-400 focus:outline-blue-500}`}
            >
                <option value="" disabled>Select {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectControl