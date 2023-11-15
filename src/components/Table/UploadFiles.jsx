import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import { uploadFilesColumns } from '../../data/columns';
import './style.css'


const UploadFilesTable = ({ tableData }) => {
    const data = useMemo(() => tableData, [tableData])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: uploadFilesColumns,
            data,
        },
    );

    return (
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
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} >
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default UploadFilesTable;
