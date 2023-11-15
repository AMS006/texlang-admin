import React, { useEffect, useState } from 'react'
import { getAllCompanies, getCompanyUsers } from '../redux/actions/company'
import { useDispatch, useSelector } from 'react-redux'
import SelectControl from '../components/Select/SelectControl'
import { getUserProjects } from '../redux/actions/project'
import { getUploadProjectWork } from '../redux/actions/work'
import { clearUploadProjectWoks } from '../redux/reducers/work'
import UploadFilesTable from '../components/Table/UploadFiles'
import { useFileData } from '../context/FileContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { setCompanyUsers } from '../redux/reducers/company'
import { setUserProjects } from '../redux/reducers/project'


const UploadCustomerFiles = () => {
    const [companyOptions, setCompanyOptions] = useState([])
    const [company, setCompany] = useState('')
    const [userOptions, setUserOptions] = useState([])
    const [user, setUser] = useState('')
    const [projectOptions, setProjectOptions] = useState([])
    const [project, setProject] = useState('')
    const [projectName, setProjectName] = useState('')
    const [fileUploading, setFileUploading] = useState(false)

    const dispatch = useDispatch()
    const { setFileData, fileData } = useFileData()
    const { companies, companyUsers } = useSelector((state) => state.company)
    const { userProjects } = useSelector((state) => state.project)
    useEffect(() => {
        if (!companies || companies.length === 0)
            dispatch(getAllCompanies())

    }, [dispatch, companies])

    useEffect(() => {
        if (companies && companies.length >= 0) {
            const options = companies.map((company) => ({
                label: company.name,
                value: company.id
            }))
            setCompanyOptions(options)
        }
    }, [companies])

    useEffect(() => {
        if (company) {
            setUser('')
            setProject('')
            setProjectName('')
            dispatch(getCompanyUsers(company))
        }
        setFileData([])
        dispatch(clearUploadProjectWoks())
    }, [company, dispatch, setFileData])

    useEffect(() => {
        if (companyUsers && companyUsers.length >= 0) {
            const options = companyUsers.map((user) => ({
                label: user.email,
                value: user.id
            }))
            setUserOptions(options)
        }

    }, [companyUsers])

    useEffect(() => {
        if (user) {
            setProject('')
            setProjectName('')
            dispatch(getUserProjects(user))
        }
        setFileData([])
        dispatch(clearUploadProjectWoks())
    }, [user, dispatch, setFileData])

    useEffect(() => {
        if (userProjects && userProjects.length >= 0) {
            const options = userProjects.map((project) => ({
                label: project.name,
                value: project.id
            }))
            setProjectOptions(options)
        }
    }, [userProjects])

    useEffect(() => {
        if (project)
            dispatch(getUploadProjectWork(project))
        setFileData([])
        return () => {
            dispatch(clearUploadProjectWoks())
        }

    }, [project, dispatch, setFileData])

    const handleProjectChange = (val) => {
        setProject(val)
        setProjectName(projectOptions.find((option) => option.value === val).label)
    }
    const { uploadProjectWorks, loading } = useSelector((state) => state.work)

    const handleFileUpload = async () => {
        if (fileData.length === 0)
            return toast.error('Please upload files')

        setFileUploading(true)
        try {
            for (let i = 0; i < fileData.length; i++) {
                await axios({
                    method: 'POST',
                    url: 'http://localhost:4000/api/megdapAdmin/work/uploadCustomerFile',
                    data: fileData[i]
                })
            }
            let totalLength = 0;
            uploadProjectWorks.forEach((work) => {
                work.targetLanguage.forEach((data) => {
                    if (!data.hasOwnProperty('downloadPath'))
                        totalLength++
                })
            })
            if (totalLength === fileData.length) {
                await axios({
                    method: "PUT",
                    url: "http://localhost:4000/api/megdapAdmin/project/updateStatus",
                    data: { projectId: project }
                })
            }
            setFileUploading(false)
            toast.success('Files uploaded successfully')
            setCompany('')
            setUser('')
            setProject('')
            setProjectName('')
            setFileData([])
            dispatch(clearUploadProjectWoks())
        } catch (error) {
            setFileUploading(false)
            toast.error('Unable to upload files')
        }
    }
    useEffect(() => {
        return () => {
            dispatch(setCompanyUsers([]))
            dispatch(setUserProjects([]))
        }
    }, [dispatch])
    return (
        <div>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Upload Customer Files</h1>
            <div className='px-6 py-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                    <SelectControl options={companyOptions} label='Company' value={company} onChange={setCompany} disabled={fileUploading} />
                    <SelectControl options={userOptions} label='User' value={user} onChange={setUser} disabled={fileUploading} />
                    <SelectControl options={projectOptions} label='Project' value={project} onChange={handleProjectChange} disabled={fileUploading} />
                </div>
            </div>
            {projectName && <div className='px-6 py-8'>
                <div className='border shadow bg-[#fcf8e3]'>
                    <h2 className='font-semibold bg-gray-300 px-2.5 py-1.5'>{projectName}</h2>
                    {loading ? <p className='px-2.5 py-1.5'>Loading...</p> :
                        <div className='flex flex-col gap-4 px-2.5 py-1.5 '>
                            {uploadProjectWorks && uploadProjectWorks.length > 0 ? uploadProjectWorks.map((work, index) => (
                                <div key={work?.id} className='flex flex-col gap-4 '>
                                    <div className='flex  items-center gap-4 border py-1.5 px-2.5 bg-[#f5f5f5] '>
                                        <div className=''>
                                            <span className='font-semibold'>File Name : </span>
                                            <span>{work.name}</span>
                                        </div>
                                        <div>
                                            <span className='font-semibold'>Souce Language : </span>
                                            <span>{work.sourceLanguage}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <UploadFilesTable tableData={work.targetLanguage.map((data) => ({ ...data, id: work.id }))} />
                                    </div>
                                </div>
                            )) : <p>No files uploaded</p>}
                            {uploadProjectWorks && uploadProjectWorks.length > 0 && <div className='flex justify-center py-2.5'>
                                <button className={`bg-blue-500 text-white px-2.5 py-1  ${fileUploading ? 'bg-opacity-60' : 'hover:bg-blue-600'}`} disabled={fileUploading} onClick={handleFileUpload}>{!fileUploading ? 'Submit' : 'Uploading...'}</button>
                            </div>}
                        </div>}
                </div>
            </div>}
        </div>
    )
}

export default UploadCustomerFiles
