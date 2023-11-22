import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useMemo } from 'react';
import { useRowSelect, useTable } from 'react-table';
import { useSelector } from 'react-redux';

import { invoicesToSendColumn } from '../../data/columns';
import TableLoader from '../Loader/Table';
import './style.css'


const InvoicesToSendTable = () => {


    const { invoicesToSend, loading } = useSelector((state) => state.invoice)
    const data = useMemo(() => invoicesToSend, [invoicesToSend])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = useTable(
        {
            columns: invoicesToSendColumn,
            data,
        },
        useRowSelect,
    );


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
                                <td colSpan={invoicesToSendColumn.length} className="text-center py-1.5 border w-full">
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

export default InvoicesToSendTable;
