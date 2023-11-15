import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../../redux/actions/company';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormSelect from '../../components/Select/FormSelect';
import MultiInput from '../../components/common/MultiInput';
import LangSelect from '../../components/Select/LangSelect';
import toast from 'react-hot-toast';
import axios from 'axios';

const formSchema = yup.object({
    companyId: yup.string().required('Company is required'),
    languages: yup.array().of(
        yup.object().shape({
            sourceLang: yup.string().required('Source Language is required'),
            targetLang: yup.string().required('Target Language is required'),
            unitRate: yup.number("Must be number").typeError("Must be Number").required('Unit Rate is required'),
        })
    ),
});

const SetCompanyRate = () => {
    const [companyOptions, setCompanyOptions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [formKey, setFormKey] = useState(1);
    const { register, handleSubmit, formState: { errors }, control, setValue, getValues, reset } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            languages: [{ sourceLang: '', targetLang: '', unitRate: '' }],
        },
    });
    const dispatch = useDispatch();
    const { companies } = useSelector((state) => state.company);

    useEffect(() => {
        if (!companies || companies.length === 0) {
            dispatch(getAllCompanies());
        }
    }, [dispatch, companies]);

    useEffect(() => {
        if (companies && companies.length >= 0) {
            const options = companies.map((company) => ({
                label: company.name,
                value: company.id,
            }));
            setCompanyOptions(options);
        }
    }, [companies]);

    const addLanguage = () => {
        const currentLanguages = getValues('languages');
        if (currentLanguages.length < 10) {
            setValue('languages', [...currentLanguages, { sourceLang: '', targetLang: '', unitRate: '' }]);
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
                method: "PUT",
                url: "http://localhost:4000/api/megdapAdmin/company/setLanguageRate",
                data
            })
            setLoading(false)
            toast.success('Company Rate Set Successfully');
            reset();
        } catch (error) {
            setLoading(false)
            const message = error.response.data.message || 'Unable to Set Company Rate';
            toast.error(message);
        }

    };

    return (
        <div className='px-6'>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Set Company Rate</h1>
            <div className='grid md:grid-cols-2 grid-cols-1 items-center gap-2.5 py-4'>
                <FormSelect errorMessage={errors.companyId?.message} register={{ ...register('companyId') }} name='companyId' options={companyOptions} label='Company' />
            </div>
            <div>
                <h2 className='bg-blue-200 font-semibold px-2.5 py-1.5 text-lg'>Add Language Details</h2>
                <form className='flex flex-col gap-4 py-4' onSubmit={handleSubmit(formSubmit)}>
                    {getValues('languages').map((data, idx) => (
                        <div key={idx} className='flex md:flex-row flex-col gap-4 items-center'>
                            <LangSelect label='Source Language' placeholder='Enter Source Language' control={control} name={`languages[${idx}].sourceLang`} errorMessage={errors.languages && errors.languages[idx]?.sourceLang?.message} />
                            <LangSelect label='Target Language' placeholder='Enter Target Language' control={control} name={`languages[${idx}].targetLang`} errorMessage={errors.languages && errors.languages[idx]?.targetLang?.message} />
                            <MultiInput label='Unit Rate' placeholder='Enter Unit Rate' control={control} name={`languages[${idx}].unitRate`} type='number' errorMessage={errors.languages && errors.languages[idx]?.unitRate?.message} />

                            {idx === 0 && <button type='button' disabled={loading} onClick={addLanguage} className='bg-blue-500 text-white px-2.5 py-1.5 w-64 hover:bg-blue-600'>Add Language</button>}
                            {idx > 0 && (
                                <button
                                    type='button'
                                    disabled={loading}
                                    onClick={() => removeLanguage(idx)}
                                    className={`bg-red-500 cursor-pointer text-white p-2 rounded  hover:bg-red-600 w-64`}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}
                    <div className='flex items-start'>
                        <button type='submit' disabled={loading} className={`bg-blue-500 ${loading ? 'bg-opacity-60' : 'hover:bg-blue-600'} text-white px-2.5 py-1.5 my-4`}>{loading ? 'Adding...' : 'Submit'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SetCompanyRate;
