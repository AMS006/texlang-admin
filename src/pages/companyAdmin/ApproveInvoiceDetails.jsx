import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import megdapLogo from '../../assets/megdapLogo.svg'
import InvoiceNotFound from '../NotFound/InvoiceNotFound'
import { useNavigate, useParams } from 'react-router-dom'
import { getInvoiceDetails } from '../../redux/actions/invoice'
import dayjs from 'dayjs'
import { companyBankDetails, companyDetails } from '../../data/constants'
import InvoiceServiceTable from '../../components/Table/InvoiceService'
import TaxDetailTable from '../../components/Table/TaxDetail'
import { numberToWords } from '../../helper'
import FullScreenLoader from '../../components/Loader/FullScreen'
import UpdateInvoiceModal from '../../components/Modal/UpdateInvoice'


const ApproveInvoiceDetails = () => {
    const { selectedInvoice, loading, error } = useSelector((state) => state.invoice)
    const [approvingInvoice, setApprovingInvoice] = useState(false)
    const [modalOpen, setModalOpen] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (id)
            dispatch(getInvoiceDetails(id));

    }, [id, dispatch])

    if (loading)
        return <FullScreenLoader />

    if (!selectedInvoice && !loading && error)
        return <InvoiceNotFound />

    return (
        <div className='px-6 py-8 font-sans  bg-white'>
            <UpdateInvoiceModal open={modalOpen} setOpen={setModalOpen} />
            <div className='flex justify-between items-center py-4'>
                <div>
                    <img src={megdapLogo} alt="Megdap" className='max-w-[300px]' />
                </div>
                <div className='flex flex-col items-start'>
                    <div className='flex items-center gap-1 font-semibold'>
                        <span>Invoice No.</span>
                        <input type="text" id="invoiceNumber" className='' />
                    </div>
                    <div className='flex items-center gap-1 font-semibold'>
                        <span>User Id :</span>
                        <span>{selectedInvoice?.email}</span>
                    </div>
                    <div className='flex items-center gap-1 font-semibold'>
                        <span>Invoice Date :</span>
                        <span>{dayjs(selectedInvoice?.invoiceDate).format('MM/DD/YYYY')}</span>
                    </div>
                </div>
            </div>
            <hr />
            <div className='flex justify-between items-start py-4 text-sm'>
                <div className='flex flex-col gap-1.5'>
                    <h3 className='font-semibold'>Company Details :</h3>
                    <ul>
                        <li className='font-semibold'>{companyDetails.name}</li>
                        <li>201 Polekar heights bhau patil road</li>
                        <li>Near Pune IT Park Maharashtra , 411020</li>
                        <li>
                            <span className='font-semibold'>GSTIN/UIN : </span>
                            <span>{companyDetails.gstin}</span>
                        </li>
                        <li>
                            <span className='font-semibold'>CIN : </span>
                            <span>{companyDetails.cin}</span>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <h3 className='font-semibold'>Customer Details :</h3>
                    <ul>
                        <li>{selectedInvoice?.companyName}</li>
                        <li>xx, xx</li>
                        <li>Pune Maharashtra, 411020</li>
                        <li>
                            <span className='font-semibold'>GSTIN/UIN :</span>
                            <span></span>
                        </li>
                        <li>
                            <span className='font-semibold'>PAN/IT No. : </span>
                            <span></span>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col gap-1.5'>
                    <h3 className='font-semibold'>Company Bank Details :</h3>
                    <ul>
                        <li>
                            <span className='font-semibold'>Bank Name : </span>
                            <span>{companyBankDetails.name}</span>
                        </li>
                        <li>
                            <span className='font-semibold'>A/c No. : </span>
                            <span>{companyBankDetails.accNo}</span>
                        </li>
                        <li>
                            <span className='font-semibold'>Branch & IFSC code : </span>
                            <span>{companyBankDetails.ifscCode}</span>
                        </li>
                        <li>
                            <span className='font-semibold'>Company PAN : </span>
                            <span>{companyBankDetails.pan}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='flex flex-col gap-6  w-full'>
                <InvoiceServiceTable />
                <div className='flex  gap-4  items-start w-full'>
                    <TaxDetailTable />
                    <div className='flex flex-col gap-0'>
                        <div>
                            <span className='font-semibold'>Total Amount :</span>
                            <span>{selectedInvoice?.amount}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>CGST :</span>
                            <span>{selectedInvoice?.centralTaxAmount}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>SGST :</span>
                            <span>{selectedInvoice?.stateTaxAmount}</span>
                        </div>
                        <div>
                            <span className='font-semibold'>Grand Total : </span>
                            <span>{selectedInvoice?.grandTotal}</span>
                        </div>
                    </div>
                </div>
                <h2 className='capitalize font-semibold'>{numberToWords(selectedInvoice?.grandTotal)}</h2>
                <div className='grid grid-cols-3 gap-4 '>
                    <div>
                        <h5 className='font-semibold text-sm'>Declaration</h5>
                        <p className='text-sm '>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
                    </div>
                    <div>
                        <h5 className='font-semibold text-sm'>Remarks</h5>
                        <p className='text-sm '>Being the charges towards translation/transliteration of content/words.</p>
                    </div>
                    <h5 className='font-semibold'>for MEGDAP INNOVATION LABS PRIVATE LIMITED</h5>
                </div>
                <div className='flex justify-end px-4 pt-6'>
                    <h5 className='font-semibold'>Authorised Signatory</h5>
                </div>
            </div>
            <div>
                <div className='flex gap-2.5 no-print'>
                    <button onClick={() => setModalOpen(true)} className='bg-blue-500 text-white px-2.5 py-1.5 hover:bg-blue-600 no-print'>Approve</button>
                </div>

            </div>
        </div>
    )
}

export default ApproveInvoiceDetails
