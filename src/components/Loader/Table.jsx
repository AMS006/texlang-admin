import React from 'react'
import { ClipLoader } from 'react-spinners'

const TableLoader = () => {
    return (
        <div className='flex gap-1.5 items-center justify-center'>
            <ClipLoader color='#3b82f6' loading={true} size={24} />
        </div>
    )
}

export default TableLoader
