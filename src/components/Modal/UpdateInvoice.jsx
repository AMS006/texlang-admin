import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from '../common/Input'
import { useNavigate, useParams } from 'react-router-dom'

const formSchema = yup.object({
    invoiceNumber: yup.string().required('Invoice Number is required'),
    hscCode: yup.string().required('HSC/SAC code is required')
})

const UpdateInvoiceModal = ({ open, setOpen }) => {

    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const { handleSubmit, formState: { errors }, register } = useForm({
        resolver: yupResolver(formSchema)
    })

    const formSubmit = async (data) => {
        if (!id)
            return toast.error('Invalid Request');
        console.log(data)
        setLoading(true);

        try {
            await axios({
                method: "PUT",
                url: `${import.meta.env.VITE_API_URL}/api/companyAdmin/invoice/approve/${id}`,
                data,
            })

            toast.success('Invoice Approved Successfully')
            setLoading(false);
            setOpen(false);
            navigate("/Invoice/ApprovePendingInvoices")
        } catch (error) {
            const message = error?.response?.data?.message || "Unable to approve Invoice";
            toast.error(message);
            setLoading(false);
        }
    }

    return (
        <>
            {open && <div>
                <div className='fixed  top-0 bottom-0 z-20 right-0 left-0 bg-slate-500 bg-opacity-40' ></div>
                <form onSubmit={handleSubmit(formSubmit)} className='fixed  right-1/2 top-1/2 z-40 overflow-y-hidden translate-x-1/2 -translate-y-1/2 md:min-w-[50%] min-w-[80%] bg-white px-4 py-4'>
                    <div className='border border-yellow-500 font-sans my-4'>
                        <h1 className='bg-yellow-500 text-white text-lg px-2.5 py-1.5 text-start'>Approve Invoice</h1>
                        <div className='flex flex-col gap-2.5 px-2.5 py-4 select-none'>
                            <Input type='text' placeholder={'Enter Invoice Number'} label={'Invoice Number'} id={'invoiceNumber'} register={{ ...register('invoiceNumber') }} errorMessage={errors.invoiceNumber?.message} />

                            <Input type='text' placeholder={'Enter UserName'} label={'HSC/SAC Code'} id={'hscCode'} register={{ ...register('hscCode') }} errorMessage={errors.hscCode?.message} />

                        </div>
                    </div>
                    <div className='w-full flex justify-end gap-2'>
                        <button type='button' onClick={() => setOpen(false)} className='px-2.5 py-1.5 border border-black font-sans'>Close</button>
                        <button type='submit' disabled={loading} className={`px-2.5 py-1.5 bg-blue-500 text-white ${loading ? 'opacity-60' : ''}`}>{loading ? 'Approving...' : "Confirm"}</button>
                    </div>
                </form>
            </div>}
        </>
    )
}

export default UpdateInvoiceModal
