import axios from 'axios';
import toast from 'react-hot-toast';
import { useMemo, useState } from 'react';
import { useRowSelect, useTable } from 'react-table';
import { useDispatch, useSelector } from 'react-redux';

import { generateInvoiceTableColumn } from '../../data/columns';
import './style.css'
import { setGenerateInvoiceWorks } from '../../redux/reducers/invoice';
import TableLoader from '../Loader/Table';


const GenerateInvoiceTable = () => {

    const [invoiceGenerating, setInvoiceGenerating] = useState(false);

    const { generateInvoiceWorks, loading } = useSelector((state) => state.invoice)
    const data = useMemo(() => generateInvoiceWorks, [generateInvoiceWorks])

    const dispatch = useDispatch();
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = useTable(
        {
            columns: generateInvoiceTableColumn,
            data,
        },
        useRowSelect,
    );

    const handleGenerateInvoice = async () => {
        if (selectedFlatRows.length === 0)
            return toast.error('Please select atleast one project')

        const filteredData = [];

        selectedFlatRows.forEach((row) => {
            filteredData.push(row.original)
        })

        const invoiceData = filteredData.map((data) => {
            return {
                id: data.id,
                email: data.customerId,
                amount: data.amount
            }
        });
        setInvoiceGenerating(true)
        try {
            await axios({
                method: "POST",
                url: `${import.meta.env.VITE_API_URL}/api/megdapAdmin/invoice/generate`,
                data: { works: invoiceData }
            })
            toast.success('Invoice Generated Successfully')
            setInvoiceGenerating(false)
            dispatch(setGenerateInvoiceWorks([]))
        } catch (error) {
            const message = error?.response?.data?.message || 'Unable to Generate Invoice'
            toast.error(message)
            setInvoiceGenerating(false)
        }
    }
    return (
        <>
            <div className='overflow-x-auto'>
                <table {...getTableProps()} className="table ">
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()} style={{ maxWidth: '3rem' }}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    {rows.length > 0 && !loading ? (
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    ) : (
                        <tbody>
                            <tr>
                                <td colSpan={generateInvoiceTableColumn.length} className="text-center py-1.5 border w-full">
                                    {loading ? <TableLoader /> : 'No Records Found'}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            {selectedFlatRows && selectedFlatRows.length > 0 && <div className='py-2.5'>
                <button onClick={handleGenerateInvoice} disabled={invoiceGenerating} className={`px-2.5 py-1.5 bg-blue-500  text-white ${invoiceGenerating ? 'bg-opacity-60' : 'hover:bg-blue-600'}`}>{invoiceGenerating ? 'Generating...' : 'Generate Invoice'}</button>
            </div>}
        </>
    );
};

export default GenerateInvoiceTable;
