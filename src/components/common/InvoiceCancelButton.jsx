import axios from 'axios'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateInvoiceStatus } from '../../redux/reducers/invoice';
import { useState } from 'react';


const InvoiceCancelButton = ({ id }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleCancel = async () => {
        const confirm = window.confirm('Are you sure you want to cancel this invoice?')
        if (confirm && id) {
            setLoading(true)
            try {
                await axios({
                    method: 'PUT',
                    url: `${import.meta.env.VITE_API_URL}/api/megdapAdmin/invoice/updateStatus/${id}`,
                    data: { isCA: false, isCancel: true }
                })
                toast.success('Invoice Cancelled Successfully')
                setLoading(false);
                dispatch(updateInvoiceStatus({ id, status: 'Cancelled' }))
            } catch (error) {
                setLoading(false);
                toast.error('Unable to cancel invoice')
            }
        }
    }
    return (
        <button
            onClick={handleCancel}
            className={`text-red-500 ${loading ? "cursor-not-allowed" : "hover:underline"}`}
            disabled={loading}
        >
            {loading ? 'Cancelling...' : 'Cancel'}
        </button>
    )
}

export default InvoiceCancelButton
