import React, { useState } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../../components/common/Input'
import LangSelect from '../../components/Select/LangSelect'
import axios from 'axios'
import toast from 'react-hot-toast'

const formSchema = yup.object({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required'),
    contact: yup.string().required('Contact is required'),
    languages: yup.array().of(
        yup.object().shape({
            sourceLanguage: yup.string().required('Source Language is required'),
            targetLanguage: yup.string().required('Target Language is required'),
        })
    ),
})

const AddNewTranslator = () => {
    const [formKey, setFormKey] = useState(1)
    const [loading, setLoading] = useState(false)
    const { handleSubmit, formState: { errors }, register, control, getValues, setValue, reset } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            languages: [{ sourceLang: '', targetLang: '' }],
        },
    })
    const addLanguage = () => {
        const currentLanguages = getValues('languages');
        if (currentLanguages.length < 10) {
            setValue('languages', [...currentLanguages, { sourceLanguage: '', targetLanguage: '' }]);
            setFormKey(formKey + 1);
        }
    };

    const removeLanguage = (index) => {
        const currentLanguages = getValues('languages');
        if (currentLanguages.length > 1) {
            const updatedLanguages = [...currentLanguages];
            updatedLanguages.splice(index, 1);
            setValue('languages', updatedLanguages);
            setFormKey(formKey - 1);
        }
    };
    const formSubmit = async (data) => {
        setLoading(true)
        try {
            await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_API_URL}/api/megdapAdmin/translator/add`,
                data
            })
            toast.success('Translator Added Successfully')
            setLoading(false)
            reset()
        } catch (error) {
            const message = error?.response?.data?.message || 'Unable to add Translator';
            setLoading(false)
            toast.error(message)
        }
    }
    return (
        <div className='px-6'>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Add New Translator</h1>
            <form onSubmit={handleSubmit(formSubmit)}>
                <div>
                    <h3 className='bg-blue-300 font-semibold px-2.5 py-1.5 text-lg'>Translator Details</h3>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 items-center py-4'>
                        <Input errorMessage={errors.firstName?.message} register={{ ...register('firstName') }} type={'text'} id='firstName' label='First Name' placeholder={'Enter First Name'} />
                        <Input errorMessage={errors.lastName?.message} register={{ ...register('lastName') }} type={'text'} id='lastName' label='Last Name' placeholder={'Enter Last Name'} />
                        <Input errorMessage={errors.contact?.message} register={{ ...register('contact') }} type={'text'} id='contact' label='Contact' placeholder={'Enter Contact Number'} />
                        <Input errorMessage={errors.email?.message} register={{ ...register('email') }} type={'text'} id='email' label='Email' placeholder={'Enter Email'} />
                        <Input errorMessage={errors.password?.message} register={{ ...register('password') }} type={'password'} id='password' label='Password' placeholder={'Enter Password'} />
                    </div>
                </div>
                <div>
                    <h3 className='bg-blue-300 font-semibold px-2.5 py-1.5 text-lg'>Add Language Details</h3>
                    <div className='flex flex-col gap-2.5 py-4'>
                        {getValues('languages').map((data, idx) => (
                            <div key={idx} className='flex md:flex-row flex-col gap-4 items-center'>
                                <LangSelect label='Source Language' placeholder='Enter Source Language' control={control} name={`languages[${idx}].sourceLanguage`} errorMessage={errors.languages && errors.languages[idx]?.sourceLanguage?.message} />
                                <LangSelect label='Target Language' placeholder='Enter Target Language' control={control} name={`languages[${idx}].targetLanguage`} errorMessage={errors.languages && errors.languages[idx]?.targetLanguage?.message} />

                                {idx === 0 && <button type='button' onClick={addLanguage} className='bg-blue-500 text-white px-2.5 py-1.5 w-64 hover:bg-blue-600'>Add Language</button>}
                                {idx > 0 && (
                                    <button
                                        type='button'
                                        onClick={() => removeLanguage(idx)}
                                        className="bg-red-500 cursor-pointer text-white p-2 rounded hover:bg-red-600 w-64"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                </div>
                <div className='flex items-start'>
                    <button type='submit' disabled={loading} className={`bg-blue-500 text-white font-semibold px-2.5 py-1 font-sans ${loading ? 'bg-opacity-60' : 'hover:bg-blue-600'}`}>{loading ? 'Adding...' : 'Submit'}</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewTranslator
