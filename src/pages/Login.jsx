import axios from 'axios'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import logo from '../assets/logo.png'
import Input from '../components/common/Input'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { clearError, setUser } from '../redux/reducers/user'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FullScreenLoader from '../components/Loader/FullScreen'

const formSchema = yup.object({
    userName: yup.string().required('UserName is required'),
    password: yup.string().required('Password is required')
})
const Login = () => {

    const { handleSubmit, formState: { errors }, register } = useForm({
        resolver: yupResolver(formSchema)
    })
    const { loading, error, user } = useSelector(state => state.user)

    const dispatch = useDispatch()
    const [isSigning, setIsSigning] = useState(false)

    const formSubmit = async (data) => {
        try {
            setIsSigning(true)
            const res = await axios({
                method: "POST",
                url: `${import.meta.env.VITE_API_URL}/api/megdapadmin/user/login`,
                data,
            })
            setIsSigning(false)
            localStorage.setItem('authToken', res?.data?.token)
            dispatch(setUser(res?.data?.user));
        } catch (error) {
            setIsSigning(false)
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message)
        }
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (user)
            navigate('/Enterprise/EnterpriseRegistration')
    }, [user, navigate])


    if (error) {
        toast.error(error)
        dispatch(clearError())
    }
    if (loading)
        return <FullScreenLoader />
    return (
        <div className='flex flex-col gap-2.5 justify-center items-center h-full bg-blue-50'>
            <div>
                <img src={logo} alt="TexLang" />
            </div>
            <form onSubmit={handleSubmit(formSubmit)} className='flex flex-col gap-4 px-8 py-8 border shadow-lg rounded bg-white w-80'>
                <h1 className='font-semibold text-lg font-sans'>Admin Login</h1>
                <Input type='text' placeholder={'Enter UserName'} label={'UserName'} id={'userName'} register={{ ...register('userName') }} errorMessage={errors.userName?.message} />

                <Input type='password' placeholder={'Enter Password'} label={'Password'} id={'password'} register={{ ...register('password') }} errorMessage={errors.password?.message} />

                <button className={`bg-blue-500 text-white w-full py-1.5 rounded ${isSigning ? 'bg-opacity-70' : ''}`} disabled={isSigning}>{!isSigning ? 'Sign In' : "Signing..."}</button>
            </form>
        </div>
    )
}

export default Login
