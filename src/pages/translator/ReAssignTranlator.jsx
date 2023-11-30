import { useEffect } from 'react'
import ReAssignTranslatorTable from '../../components/Table/ReAssignTranslator'
import { useDispatch, useSelector } from 'react-redux'
import { getReAssignTranslatorsWorks } from '../../redux/actions/translator';
import FullScreenLoader from '../../components/Loader/FullScreen';

const ReAssignTranlator = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.translator);

    useEffect(() => {
        dispatch(getReAssignTranslatorsWorks());
    }, [dispatch]);

    if (loading)
        return <FullScreenLoader />
    return (
        <div className='px-6'>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Re-Assign Translator</h1>

            <div className='flex flex-col gap-4 py-4'>
                <h3 className='text-center font-semibold text-lg'>List Of Assigned Works to Translators</h3>
                <ReAssignTranslatorTable />
            </div>
        </div>
    )
}

export default ReAssignTranlator
