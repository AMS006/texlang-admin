import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { updateUserWorks } from '../../redux/reducers/work'

const UpdateWorkModal = ({ open, setOpen, work }) => {
    const [cost, setCost] = React.useState('')
    const [wordCount, setWordCount] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios({
                method: 'PUT',
                url: `${import.meta.env.VITE_API_URL}/api/megdapAdmin/work/updateUserWork`,
                data: {
                    id: work.id,
                    cost,
                    wordCount
                }
            })
            dispatch(updateUserWorks({ ...work, cost, wordCount }))
            setLoading(false)
            toast.success('Work Updated Successfully')
            setOpen(false)
        } catch (error) {
            setLoading(false)
            setOpen(false)
            toast.error('Unable to Update Work')
        }
    }
    useEffect(() => {
        if (work) {
            setCost(Number(work.cost).toFixed(2))
            setWordCount(work.wordCount)
        }
    }, [work])
    return (
        <>
            {open && <div>
                <div className='fixed  top-0 bottom-0 z-20 right-0 left-0 bg-slate-500 bg-opacity-40' ></div>
                <form onSubmit={handleSubmit} className='fixed  right-1/2 top-1/2 z-40 overflow-y-hidden translate-x-1/2 -translate-y-1/2 md:min-w-[50%] min-w-[80%] bg-white px-4 py-4'>
                    <div className='border border-yellow-500 font-sans my-4'>
                        <h1 className='bg-yellow-500 text-white text-lg px-2.5 py-1.5 text-start'>Update Work</h1>
                        <div className='flex flex-col gap-2.5 px-2.5 py-4 select-none'>
                            <div className='flex  gap-2'>
                                <label for="cost" className='w-[40%] text-start'>Cost:</label>
                                <input type="text" required value={cost} onChange={(e) => setCost(e.target.value)} id="fname" className='border p-1 border-black focus:outline-blue-500' />
                            </div>
                            <div className='flex gap-2'>
                                <label for="lname" className='w-[40%] text-start'>Word Count: </label>
                                <input type="text" required value={wordCount} onChange={(e) => setWordCount(e.target.value)} id="lname" className='border p-1 border-black focus:outline-blue-500' />
                            </div>

                        </div>
                    </div>
                    <div className='w-full flex justify-end gap-2'>
                        <button onClick={() => setOpen(false)} className='px-2.5 py-1.5 border border-black font-sans'>Close</button>
                        <button type='submit' disabled={loading} className={`px-2.5 py-1.5 bg-blue-500 text-white ${loading ? 'opacity-60' : ''}`}>{loading ? 'Updating...' : "Submit"}</button>
                    </div>
                </form>
            </div>}
        </>
    )
}

export default UpdateWorkModal
