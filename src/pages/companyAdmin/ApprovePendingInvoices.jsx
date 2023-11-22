import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getApprovePendingInvoices } from '../../redux/actions/invoice';
import CApprovePendingInvoicesTable from '../../components/Table/CApprovePendingInvoices';

const ApprovePendingInvoices = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getApprovePendingInvoices());
    }, [dispatch])
    return (
        <div className='px-6'>
            <h2 className='text-center py-4 font-semibold font-sans text-2xl'>Invoices for Approval</h2>
            <CApprovePendingInvoicesTable />
        </div>
    )
}

export default ApprovePendingInvoices
