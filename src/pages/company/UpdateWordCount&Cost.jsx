import React, { useEffect, useState } from 'react'
import { getUserProjects } from '../../redux/actions/project'
import { getUserWorksForUpdate } from '../../redux/actions/work'
import { clearWorksForUpdate } from '../../redux/reducers/work'
import { getAllCompanies, getCompanyUsers } from '../../redux/actions/company'
import { useDispatch, useSelector } from 'react-redux'
import SelectControl from '../../components/Select/SelectControl'
import UpdateWorkTable from '../../components/Table/UpdateWork'
import { setCompanyUsers } from '../../redux/reducers/company'
import { setUserProjects } from '../../redux/reducers/project'

const UpdateWordCountCost = () => {
    const [companyOptions, setCompanyOptions] = useState([])
    const [company, setCompany] = useState('')
    const [userOptions, setUserOptions] = useState([])
    const [user, setUser] = useState('')
    const [projectOptions, setProjectOptions] = useState([])
    const [project, setProject] = useState('')

    const dispatch = useDispatch()
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
            setProject('')
            setUser('')
            dispatch(getCompanyUsers(company))
        }
    }, [company, dispatch])

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
            dispatch(getUserProjects(user))
        }
    }, [user, dispatch])

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
            dispatch(getUserWorksForUpdate(project))
        return () => {
            dispatch(clearWorksForUpdate())
        }
    }, [project, dispatch])
    useEffect(() => {
        return () => {
            dispatch(setCompanyUsers([]))
            dispatch(setUserProjects([]))
        }
    }, [dispatch])
    return (
        <div>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Update WordCount & Cost</h1>
            <div className='flex flex-col gap-4 px-6 py-4'>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                    <SelectControl options={companyOptions} label='Company' value={company} onChange={setCompany} />
                    <SelectControl options={userOptions} label='User' value={user} onChange={setUser} />
                    <SelectControl options={projectOptions} label='Project' value={project} onChange={setProject} />
                </div>
                <div className='border shadow'>
                    <h2 className='px-2.5 py-1.5 bg-gray-200 font-semibold text-lg'>Files</h2>
                    <UpdateWorkTable />
                </div>
            </div>
        </div>
    )
}

export default UpdateWordCountCost
