import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTranslators } from '../../redux/actions/translator';
import FullScreenLoader from '../../components/Loader/FullScreen';
import AllTranslatorsTable from '../../components/Table/AllTranslators';

const AllTranslators = () => {
    const { loading } = useSelector((state) => state.translator);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTranslators());
    }, [dispatch])

    if (loading)
        return <FullScreenLoader />
    return (
        <div className='px-6 py-4'>
            <h3 className='pb-4 font-semibold  text-center text-2xl'>List of All Translators</h3>
            <AllTranslatorsTable />
        </div>
    )
}

export default AllTranslators
