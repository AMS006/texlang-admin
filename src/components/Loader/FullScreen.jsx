import React from 'react'
import { ScaleLoader } from 'react-spinners'

const FullScreenLoader = () => {
    return (
        <div className='w-full h-full flex items-center justify-center'>
            <ScaleLoader color='#3b82f6' loading={true} size={28} />
        </div>
    )
}

export default FullScreenLoader
