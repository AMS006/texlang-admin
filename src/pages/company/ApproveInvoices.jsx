import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getApproveInvoiceWorks } from '../../redux/actions/invoice';
import ApproveInvoiceTable from '../../components/Table/ApproveInvoice';

const ApproveInvoices = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.invoice)
    useEffect(() => {
        dispatch(getApproveInvoiceWorks())
    }, [dispatch]);

    if (loading)
        return <p>Loading...</p>
    return (
        <div className='px-6'>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Invoices For Approval</h1>
            <ApproveInvoiceTable />
        </div>
    )
}

export default ApproveInvoices
