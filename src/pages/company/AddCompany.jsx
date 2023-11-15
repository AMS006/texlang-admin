import React from 'react'
import * as yup from 'yup'
import { Country } from 'country-state-city'
import { useForm } from 'react-hook-form'
import FormSelect from '../../components/Select/FormSelect'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../components/common/Input'
import axios from 'axios'
import toast from 'react-hot-toast'

const formSchema = yup.object({
    country: yup.string().required('Country is required'),
    state: yup.string().required('State is required'),
    city: yup.string().optional(),
    companyName: yup.string().required('Company Name is required'),
    companyAddress1: yup.string().optional(),
    companyAddress2: yup.string().optional(),
    postalCode: yup.string().optional(),
    companyPhone: yup.string().optional(),
    companyVat: yup.string().optional(),
    agreementStartDate: yup.string().optional(),
    agreementEndDate: yup.string().optional(),
    unitsPurchased: yup.string().optional(),
    unitPrice: yup.string().optional(),
    creditUnits: yup.string().optional(),
    businessContactName: yup.string().optional(),
    businessContactEmail: yup.string().optional().email('Invalid Email Address'),
    businessContactNumber: yup.string().optional(),
    technicalContactName: yup.string().optional(),
    technicalContactEmail: yup.string().optional().email('Invalid Email Address'),
    technicalContactNumber: yup.string().optional(),
    financeContactName: yup.string().optional(),
    financeContactEmail: yup.string().optional().email('Invalid Email Address'),
    financeContactNumber: yup.string().optional(),
    adminFirstName: yup.string().required('Admin First Name is required'),
    adminLastName: yup.string().required('Admin Last Name is required'),
    adminEmail: yup.string().required('Admin Email is required').email('Invalid Email Address'),
    adminPassword: yup.string().required('Admin Password is required'),
})

const AddCompany = () => {
    const countries = Country.getAllCountries()

    const [countryOptions, setCountryOptions] = React.useState([])
    const [loading, setLoading] = React.useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(formSchema)
    })


    React.useEffect(() => {
        const countryOptions = countries.map((country) => ({
            value: country.isoCode,
            label: country.name,
        }))
        setCountryOptions(countryOptions)
    }, [countries])
    const formSubmit = async (data) => {
        setLoading(true)
        try {
            await axios({
                method: "POST",
                url: "http://localhost:4000/api/megdapadmin/company/add",
                data,
            })
            setLoading(false)
            toast.success('Company Added Successfully')
            reset()
        } catch (error) {
            const message = error.response.data.message || 'Something went wrong';
            toast.error(message)
            setLoading(false)
        }
    }
    return (
        <div>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Add Company</h1>
            <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-6 px-6 py-4'>
                <div >
                    <h3 className='bg-blue-200 py-1.5 px-2 font-sans font-semibold'>Company Details</h3>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-4 py-2.5'>
                        <FormSelect options={countryOptions} register={{ ...register('country') }} isLabel={true} errorMessage={errors.country?.message} label='Country' />
                        <Input type='text' placeholder={'Enter State'} label={'State'} id={'state'} register={{ ...register('state') }} errorMessage={errors.state?.message} />
                        <Input type='text' placeholder={'Enter City'} label={'City'} id={'city'} register={{ ...register('city') }} errorMessage={errors.city?.message} />
                        <Input type='text' placeholder={'Enter Company Name'} label={'Company Name'} id={'companyName'} register={{ ...register('companyName') }} errorMessage={errors.companyName?.message} />
                        <Input type='text' placeholder={'Enter Company Address 1'} label={'Company Address 1'} id={'companyAddress1'} register={{ ...register('companyAddress1') }} errorMessage={errors.companyAddress1?.message} />
                        <Input type='text' placeholder={'Enter Company Address 2'} label={'Company Address 2'} id={'companyAddress2'} register={{ ...register('companyAddress2') }} errorMessage={errors.companyAddress2?.message} />
                        <Input type='text' placeholder={'Enter Postal Code'} label={'Postal Code'} id={'postalCode'} register={{ ...register('postalCode') }} errorMessage={errors.postalCode?.message} />
                        <Input type='text' placeholder={'Enter Company Phone'} label={'Company Phone'} id={'companyPhone'} register={{ ...register('companyPhone') }} errorMessage={errors.companyPhone?.message} />
                        <Input type='text' placeholder={'Enter Company VAT'} label={'Company VAT'} id={'companyVat'} register={{ ...register('companyVat') }} errorMessage={errors.companyVat?.message} />
                    </div>
                </div>
                <div>
                    <h3 className='bg-blue-200 py-1.5 px-2 font-sans font-semibold'>Agreement Details</h3>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-4 py-2.5'>
                        <Input type='date' placeholder={'Enter Agreement Start Date'} label={'Agreement Start Date'} id={'agreementStartDate'} register={{ ...register('agreementStartDate') }} errorMessage={errors.agreementStartDate?.message} />
                        <Input type='date' placeholder={'Enter Agreement End Date'} label={'Agreement End Date'} id={'agreementEndDate'} register={{ ...register('agreementEndDate') }} errorMessage={errors.agreementEndDate?.message} />
                        <Input type='text' placeholder={'Enter Units Purchased'} label={'Units Purchased'} id={'unitsPurchased'} register={{ ...register('unitsPurchased') }} errorMessage={errors.unitsPurchased?.message} />
                        <Input type='text' placeholder={'Enter Unit Price'} label={'Unit Price'} id={'unitPrice'} register={{ ...register('unitPrice') }} errorMessage={errors.unitPrice?.message} />
                        <Input type='text' placeholder={'Enter Credit Units'} label={'Credit Units'} id={'creditUnits'} register={{ ...register('creditUnits') }} errorMessage={errors.creditUnits?.message} />

                    </div>
                </div>
                <div>
                    <h3 className='bg-blue-200 py-1.5 px-2 font-sans font-semibold'>Contact Details</h3>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-4 py-2.5'>
                        <Input type='text' placeholder={'Enter Business Contact Name'} label={'Business Contact Name'} id={'businessContactName'} register={{ ...register('businessContactName') }} errorMessage={errors.businessContactName?.message} />
                        <Input type='text' placeholder={'Enter Business Contact Email'} label={'Business Contact Email'} id={'businessContactEmail'} register={{ ...register('businessContactEmail') }} errorMessage={errors.businessContactEmail?.message} />
                        <Input type='text' placeholder={'Enter Business Contact Number'} label={'Business Contact Number'} id={'businessContactNumber'} register={{ ...register('businessContactNumber') }} errorMessage={errors.businessContactNumber?.message} />
                        <Input type='text' placeholder={'Enter Technical Contact Name'} label={'Technical Contact Name'} id={'technicalContactName'} register={{ ...register('technicalContactName') }} errorMessage={errors.technicalContactName?.message} />
                        <Input type='text' placeholder={'Enter Technical Contact Email'} label={'Technical Contact Email'} id={'technicalContactEmail'} register={{ ...register('technicalContactEmail') }} errorMessage={errors.technicalContactEmail?.message} />
                        <Input type='text' placeholder={'Enter Technical Contact Number'} label={'Technical Contact Number'} id={'technicalContactNumber'} register={{ ...register('technicalContactNumber') }} errorMessage={errors.technicalContactNumber?.message} />
                        <Input type='text' placeholder={'Enter Finance Contact Name'} label={'Finance Contact Name'} id={'financeContactName'} register={{ ...register('financeContactName') }} errorMessage={errors.financeContactName?.message} />
                        <Input type='text' placeholder={'Enter Finance Contact Email'} label={'Finance Contact Email'} id={'financeContactEmail'} register={{ ...register('financeContactEmail') }} errorMessage={errors.financeContactEmail?.message} />
                        <Input type='text' placeholder={'Enter Finance Contact Number'} label={'Finance Contact Number'} id={'financeContactNumber'} register={{ ...register('financeContactNumber') }} errorMessage={errors.financeContactNumber?.message} />
                    </div>
                </div>
                <div>
                    <h3 className='bg-blue-200 py-1.5 px-2 font-sans font-semibold'>Admin Details</h3>
                    <div className='grid md:grid-cols-3 grid-cols-1 gap-4 py-2.5'>
                        <Input type='text' placeholder={'Enter Admin First Name'} label={'Admin First Name'} id={'adminFirstName'} register={{ ...register('adminFirstName') }} errorMessage={errors.adminFirstName?.message} />
                        <Input type='text' placeholder={'Enter Admin Last Name'} label={'Admin Last Name'} id={'adminLastName'} register={{ ...register('adminLastName') }} errorMessage={errors.adminLastName?.message} />
                        <Input type='text' placeholder={'Enter Admin Email'} label={'Admin Email'} id={'adminEmail'} register={{ ...register('adminEmail') }} errorMessage={errors.adminEmail?.message} />
                        <Input type='text' placeholder={'Enter Admin Password'} label={'Admin Password'} id={'adminPassword'} register={{ ...register('adminPassword') }} errorMessage={errors.adminPassword?.message} />
                    </div>
                </div>
                <div className='flex items-start'>
                    <button type='submit' disabled={loading} className={`px-2.5 py-1.5 bg-blue-600  text-white ${loading ? 'bg-opacity-60' : 'hover:bg-blue-700'}`}>{loading ? 'Adding...' : 'Submit'}</button>
                </div>
            </form>
        </div>
    )
}

export default AddCompany
