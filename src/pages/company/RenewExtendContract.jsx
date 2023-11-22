import React, { useEffect, useState } from 'react'
import SelectControl from '../../components/Select/SelectControl'
import { getAllCompanies, getCompanyContractDetails } from '../../redux/actions/company';
import { useDispatch, useSelector } from 'react-redux';
import ContractDetailsTable from '../../components/Table/ContractDetail';
import DateRange from '../../components/common/DateRange';
import { setContractDetails } from '../../redux/reducers/company';

const RenewExtendContract = () => {
    const [company, setCompany] = useState('');
    const [companyOptions, setCompanyOptions] = useState([])
    const [dateRange, setDateRange] = useState('');
    const dispatch = useDispatch()

    const { companies, loading } = useSelector((state) => state.company)
    useEffect(() => {
        if (!companies || companies.length === 0)
            dispatch(getAllCompanies())
        return () => {
            dispatch(setContractDetails([]))
        }
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

    const handleSubmit = () => {
        if (company) {

            dispatch(getCompanyContractDetails(company))
        }
    }

    return (
        <div className='px-6'>
            <h1 className='text-2xl  py-4 font-semibold font-sans'>Company Contract Details</h1>

            <div className='flex gap-6 items-end '>
                <div className='w-1/2'>
                    <SelectControl options={companyOptions} label='Company' value={company} onChange={setCompany} />
                </div>
                <button onClick={handleSubmit} disabled={loading} className={`px-2.5 py-1.5 bg-blue-500 text-white w-32 ${loading ? 'bg-opacity-50' : 'hover:bg-blue-600'}`}>Show</button>
            </div>
            <div className='py-4 flex flex-col gap-2.5'>
                <h2 className='font-semibold text-lg'>Contract Details</h2>
                <h3 className='font-semibold '>Existing Contract Details</h3>
                <ContractDetailsTable />
            </div>

            <div className='grid grid-cols-3 gap-4 items-center'>
                <DateRange value={dateRange} setValue={setDateRange} />
                <div className='flex flex-col gap-0.5'>
                    <label htmlFor="totalUnits" className='font-semibold'>Total Units</label>
                    <input type="text" id="totalUnits" placeholder='Enter Total Units' className='px-2 py-1.5 border w-full rounded border-black focus:outline-blue-500' />
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='font-semibold'>Select Option</label>
                    <div className='flex gap-4'>
                        <div>
                            <input type="radio" name="type" id="extend" />
                            <label htmlFor="extend">Extend</label>
                        </div>
                        <div>
                            <input type="radio" name="type" id="renew" />
                            <label htmlFor="renew">Renew</label>
                        </div>
                    </div>
                </div>
                <div className='py-4'>
                    <button className={`w-32 px-2.5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white`}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default RenewExtendContract
