import React, { useEffect } from 'react'
import TranslatorLanguageTable from '../../components/Table/TranslatorLanguage'
import TranslatorWorkColumn from '../../components/Table/TranslatorWork'
import { useDispatch, useSelector } from 'react-redux'
import { getTranslatorDetails } from '../../redux/actions/translator'
import { useParams } from 'react-router-dom'
import FullScreenLoader from '../../components/Loader/FullScreen'

const TranslatorDetail = () => {
    const dispatch = useDispatch();
    const { translatorId } = useParams();
    const { loading, selectedTranslatorDetails } = useSelector((state) => state.translator)
    useEffect(() => {
        dispatch(getTranslatorDetails(translatorId));
    }, [dispatch]);

    if (loading)
        return <FullScreenLoader />
    return (
        <div className='px-6'>
            <div className='flex items-center gap-4 py-4'>
                <div className='flex flex-col gap-2  w-2/6'>
                    <div>
                        <span className='font-semibold'>Name: </span>
                        <span>{selectedTranslatorDetails?.name}</span>
                    </div>
                    <div>
                        <span className='font-semibold'>Email: </span>
                        <span>{selectedTranslatorDetails?.email}</span>
                    </div>
                    <div>
                        <span className='font-semibold'>Contact No. </span>
                        <span>{selectedTranslatorDetails?.contact}</span>
                    </div>
                    <div>
                        <span className='font-semibold'>Status : </span>
                        <span>{selectedTranslatorDetails?.status ? "Active" : "In Active"}</span>
                    </div>
                </div>

                <div className='flex flex-col gap-0.5 w-full'>
                    <h3 className='text-lg font-semibold '>Language Details</h3>
                    <TranslatorLanguageTable />
                </div>
            </div>
            <div className='flex flex-col gap-4 py-4'>
                <h3 className='text-center font-semibold text-xl'>Files Assigned to Translator</h3>
                <TranslatorWorkColumn />
            </div>
        </div>
    )
}

export default TranslatorDetail
