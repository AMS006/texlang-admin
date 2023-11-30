import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllInvoicesStatus } from '../../redux/actions/invoice';
import AllInvoicesStatusTable from '../../components/Table/AllInvoiceStatus';
import FullScreenLoader from '../../components/Loader/FullScreen';

const InvoicesStatus = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.invoice)
    useEffect(() => {
        dispatch(getAllInvoicesStatus())
    }, [dispatch])
    if (loading)
        return <FullScreenLoader />;
    return (
        <div className='px-6'>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Invoices Status</h1>
            <div>
                <AllInvoicesStatusTable />
            </div>
        </div>
    )
}

export default InvoicesStatus
