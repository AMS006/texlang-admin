import { useEffect, useState } from 'react'
import SelectControl from '../../components/Select/SelectControl'
import DateRange from '../../components/common/DateRangePicker'
import { getWorksForCompanyBilling } from '../../redux/actions/work'
import { setCompanyBillingWorks } from '../../redux/reducers/work'
import { getAllCompanies } from '../../redux/actions/company'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import CompanyBillingTable from '../../components/Table/CompanyBilling'
import SubmitButton from '../../components/common/SubmitButton'
import { isValidDate } from '../../helper'


const CompanyBilling = () => {
    const [companyOptions, setCompanyOptions] = useState([])
    const [company, setCompany] = useState('')
    const [dateRange, setDateRange] = useState('')
    const [companyName, setCompanyName] = useState('')
    const { loading } = useSelector((state) => state.work)

    const dispatch = useDispatch()
    const { companies } = useSelector((state) => state.company)

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
            dispatch(setCompanyBillingWorks([]))
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

            if (!isValidDate(startDate) || !isValidDate(endDate))
                return toast.error('Please select valid date range')

            dispatch(getWorksForCompanyBilling(company, startDate, endDate))
        }
        else {
            toast.error('Please select company and date range')
        }
    }
    return (
        <div className='px-6'>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Company Billing</h1>
            <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-2.5 py-4'>
                <SelectControl options={companyOptions} label='Company' value={company} onChange={setCompany} />
                <DateRange value={dateRange} setValue={setDateRange} />
            </div>

            <SubmitButton handleSubmit={handleSubmit} loading={loading} type='button' loadingText='Loading...' />
            <div className='py-4'>
                <h2 className='font-semibold py-1.5 px-2.5 bg-blue-400 text-white'>Company Name : {companyName}</h2>
                <CompanyBillingTable />

            </div>
        </div>
    )
}

export default CompanyBilling
