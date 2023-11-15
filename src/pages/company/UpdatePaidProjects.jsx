import React, { useEffect } from 'react'
import { useState } from 'react';
import SelectControl from '../../components/Select/SelectControl';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../../redux/actions/company';
import DateRange from '../../components/common/DateRangePicker';
import { getPaymentPendingProjects } from '../../redux/actions/project';
import { clearPaymentPendingProjects } from '../../redux/reducers/project';
import toast from 'react-hot-toast';
import UpdatePaidProjectsTable from '../../components/Table/UpdatePaidProjects';
import SubmitButton from '../../components/common/SubmitButton';
const UpdatePaidProjects = () => {
    const [companyOptions, setCompanyOptions] = useState([])
    const [company, setCompany] = useState('')
    const [dateRange, setDateRange] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const dispatch = useDispatch()
    const { companies } = useSelector((state) => state.company)
    const { loading } = useSelector((state) => state.project)
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
        return () => {
            dispatch(clearPaymentPendingProjects())
        }
    }, [companies, dispatch])

    const handleSubmit = () => {
        if (company && dateRange) {

            companies.forEach((c) => {
                if (c.id === company) {

                    setCompanyName(c.name)
                }
            })
            const date = dateRange.split(' ');
            const startDate = date[0];
            const endDate = date[2];
            dispatch(getPaymentPendingProjects(company, startDate, endDate))
        }
        else {
            toast.error('Please select company and date range')
        }
    }
    return (
        <div className='px-6'>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Payment Pending Projects</h1>
            <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-2.5 py-4'>
                <SelectControl options={companyOptions} label='Company' value={company} onChange={setCompany} />
                <DateRange value={dateRange} setValue={setDateRange} />
            </div>

            <SubmitButton loading={loading} handleSubmit={handleSubmit} type='button' loadingText='loading...' />
            <div className='py-4'>
                <h2 className='font-semibold py-1.5 px-2.5 bg-blue-400 text-white'>Company Name : {companyName}</h2>
                <UpdatePaidProjectsTable selectedRows={selectedRows} setSelectedRows={setSelectedRows} />

            </div>
        </div>
    )
}

export default UpdatePaidProjects
