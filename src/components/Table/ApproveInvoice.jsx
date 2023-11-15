import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';

import { approvePendingInvoiceColumn } from '../../data/columns';
import './style.css'


const ApproveInvoiceTable = () => {

    const { approveInvoiceWorks, loading } = useSelector((state) => state.invoice)
    const data = useMemo(() => approveInvoiceWorks, [approveInvoiceWorks])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: approvePendingInvoiceColumn,
            data,
        },
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
                                <td colSpan={approvePendingInvoiceColumn.length} className="text-center py-1.5 border w-full">
                                    {loading ? 'Loading...' : 'No Records Found'}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

        </>
    );
};

export default ApproveInvoiceTable;
