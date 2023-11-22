import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCompanies } from '../redux/actions/company'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import FormSelect from '../components/Select/FormSelect'
import Input from '../components/common/Input'
import axios from 'axios'
import toast from 'react-hot-toast'

const formSchema = yup.object({
    companyId: yup.string().required('Company is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required'),
    isAdmin: yup.boolean().required('Is Admin is required')

})
const AddNewUser = () => {
    const [loading, setLoading] = useState(false)
    const [companiesOptions, setCompaniesOptions] = useState([])

    const dispatch = useDispatch()
    const { companies } = useSelector((state) => state.company)
    useEffect(() => {
        if (!companies || companies.length === 0)
            dispatch(getAllCompanies())
    }, [dispatch, companies])
    useEffect(() => {
        if (companies && companies.length > 0) {
            const options = companies.map((company) => ({
                label: company.name,
                value: company.id
            }))
            setCompaniesOptions(options)
        }
    }, [companies])
    const { handleSubmit, formState: { errors }, register, reset } = useForm({
        resolver: yupResolver(formSchema)
    })
    const formSubmit = async (data) => {
        const companyName = companies?.find((company) => company.id === data.companyId).name
        try {
            setLoading(true)
            await axios({
                method: "POST",
                url: `${import.meta.env.VITE_API_URL}/api/megdapadmin/user/add`,
                data: { ...data, companyName },
            })
            toast.success('User Added')
            setLoading(false)
            reset()
        } catch (error) {
            const message = error.response.data.message || 'Something Went Wrong';
            toast.error(message)
            setLoading(false)
        }
    }
    return (
        <div>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Add New User</h1>
            <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-4 px-6'>
                <div>
                    <h3 className='bg-blue-200 px-2.5 py-2.5 font-sans font-semibold'>Company</h3>
                    <div className='py-2.5 md:w-1/2'>
                        <FormSelect options={companiesOptions} label={'Company Name'} errorMessage={errors.companyId?.message} isLabel={false} register={{ ...register('companyId') }} />
                    </div>
                </div>
                <div>
                    <h3 className='bg-blue-200 px-2.5 py-1.5 font-sans font-semibold'>User Details</h3>
                    <div className='grid md:grid-cols-2 grid-cols-1 gap-4 py-2.5'>
                        <Input type={'text'} placeholder={'Enter First Name'} label={'First Name'} id={'firstName'} register={{ ...register('firstName') }} errorMessage={errors.firstName?.message} />
                        <Input type={'text'} placeholder={'Enter Last Name'} label={'Last Name'} id={'lastName'} register={{ ...register('lastName') }} errorMessage={errors.lastName?.message} />
                        <Input type={'email'} placeholder={'Enter Email'} label={'Email'} id={'email'} register={{ ...register('email') }} errorMessage={errors.email?.message} />
                        <Input type={'password'} placeholder={'Enter Password'} label={'Password'} id={'password'} register={{ ...register('password') }} errorMessage={errors.password?.message} />
                        <div className='flex gap-2.5'>
                            <label htmlFor="admin" className='font-semibold select-none'>Is CA</label>
                            <input type='checkbox' {...register('isAdmin')} id='admin' className='w-12' />
                        </div>
                    </div>
                </div>
                <div className='flex items-start'>
                    <button type='submit' disabled={loading} className={`bg-blue-500 text-white font-semibold px-2.5 py-1 font-sans ${loading ? 'bg-opacity-60' : 'hover:bg-blue-600'}`}>{loading ? 'Adding...' : 'Submit'}</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewUser
