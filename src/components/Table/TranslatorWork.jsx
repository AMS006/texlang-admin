import { useMemo } from 'react';
import { useTable } from 'react-table';
import { useSelector } from 'react-redux';

import { translatorWorksColumn } from '../../data/columns';
import './style.css'
import TableLoader from '../Loader/Table';


const TranslatorWorkColumn = () => {

    const { loading, selectedTranslatorWorks } = useSelector((state) => state.translator)
    const data = useMemo(() => selectedTranslatorWorks, [selectedTranslatorWorks])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns: translatorWorksColumn,
            data,
        },
    );


    return (
        <>
            <div className='overflow-x-auto'>
                <table {...getTableProps()} className="table ">
                    <thead className='bg-blue-500 text-white '>
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
                                <td colSpan={translatorWorksColumn.length} className="text-center py-1.5 border w-full">
                                    {loading ? <TableLoader /> : 'No Files Assigned'}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

        </>
    );
};

export default TranslatorWorkColumn;
