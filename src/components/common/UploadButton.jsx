import { useFileData } from '../../context/FileContext'


const UploadButton = ({ id, workId }) => {
    const { setFileData, fileData } = useFileData()

    const handleFileChange = (e) => {
        const formData = new FormData()

        formData.append('file', e.target.files[0])
        formData.append('id', id)
        formData.append('workId', workId);
        setFileData([...fileData, formData])
    }

    return (
        <input type="file" id="file" onChange={handleFileChange} />
    )
}

export default UploadButton
