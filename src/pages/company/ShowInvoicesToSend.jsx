import { useEffect } from 'react'
import InvoicesToSendTable from '../../components/Table/InvoiceToSend'
import { useDispatch, useSelector } from 'react-redux'
import { getInvoicesToSend } from '../../redux/actions/invoice';
import FullScreenLoader from '../../components/Loader/FullScreen';

const ShowInvoicesToSend = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.invoice)
  useEffect(() => {
    dispatch(getInvoicesToSend())
  }, [dispatch]);

  if (loading)
    return <FullScreenLoader />
  return (
    <div className='px-6'>
      <h1 className='font-sans font-semibold text-2xl py-4 text-center'>Invoices to Send</h1>
      <InvoicesToSendTable />
    </div>
  )
}

export default ShowInvoicesToSend
