import React from 'react'
import { useFileData } from '../../context/FileContext'


const UploadButton = ({ data, idx }) => {
    const { setFileData, fileData } = useFileData()
    const handleFileChange = (e) => {

        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('id', data.id)
        formData.append('idx', idx)
        setFileData([...fileData, formData])
    }

    if (data?.downloadPath)
        return <span className='text-green-500'>Work Uploaded</span>
    return (
        <input type="file" id="file" onChange={handleFileChange} />
    )
}

export default UploadButton
