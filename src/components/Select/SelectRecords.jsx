import React from 'react'
import { recordsOptions } from '../../data/options'


const SelectRecords = ({ pageSize, setPageSize }) => {

    return (
        <select
            onChange={(e) =>
                setPageSize(e.target.value)} value={pageSize}
            className='border border-gray-600 px-2 py-1 focus:outline-blue-500'
        >
            {recordsOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}

export default SelectRecords
