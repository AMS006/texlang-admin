import { useMemo } from 'react';
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';

import './style.css'
import { invoiceTaxDetailColumn } from '../../data/columns';
import TableLoader from '../Loader/Table';


const TaxDetailTable = () => {
    const { selectedInvoice, loading } = useSelector((state) => state.invoice)
    const data = useMemo(() => (selectedInvoice ? [selectedInvoice] : []), [selectedInvoice]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: invoiceTaxDetailColumn,
            data,
        },
    );

    return (
        <div className='overflow-x-auto w-3/4'>
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
                            <td colSpan={7} className="text-center py-1.5 border w-full">
                                {loading ? <TableLoader /> : 'No Records Found'}
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
};

export default TaxDetailTable;
