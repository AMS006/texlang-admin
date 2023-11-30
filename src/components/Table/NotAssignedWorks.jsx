import { useMemo, useState } from 'react';
import { useRowSelect, useTable } from 'react-table';

import { notAssignedWorksColumn } from '../../data/columns';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import TableLoader from '../Loader/Table';
import { getNotAssignedWorks } from '../../redux/actions/work';

const NotAssigneWorksTable = ({ translator, translatorName }) => {
    const [assigningTranslator, setAssigningTranslator] = useState(false)
    const { notAssignedWorks, loading } = useSelector((state) => state.work)
    const data = useMemo(() => notAssignedWorks, [notAssignedWorks])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = useTable(
        {
            columns: notAssignedWorksColumn,
            data,
        },
        useRowSelect,
    );
    const dispatch = useDispatch()
    const handleAssignTranlator = async () => {
        const filteredRow = []

        selectedFlatRows.forEach((row) => {
            filteredRow.push(row.original.id)
        })
        if (filteredRow.length === 0)
            return toast.error('Please select atleast one work')

        if (!translator)
            return toast.error('Please select translator');

        try {
            setAssigningTranslator(true);
            await axios({
                method: 'POST',
                url: `${import.meta.env.VITE_API_URL}/api/megdapAdmin/translator/assignWork`,
                data: { translator, translatorName, works: filteredRow }
            })
            toast.success('Translator assigned successfully');
            dispatch(getNotAssignedWorks())
            setAssigningTranslator(false);

        } catch (error) {
            setAssigningTranslator(false);
            toast.error('Unable to assign translator');
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
                                <td colSpan={notAssignedWorksColumn.length} className="text-center py-1.5 border w-full">
                                    {loading ? <TableLoader /> : 'No Records Found'}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <div className='flex justify-end py-4'>
                <button onClick={handleAssignTranlator} disabled={assigningTranslator} className={`w-36 px-2 py-1.5 bg-blue-500 rounded text-white ${assigningTranslator ? 'bg-opacity-60' : 'hover:bg-blue-600'}`}>{assigningTranslator ? <TableLoader /> : 'Assign Translator'}</button>
            </div>
        </>
    );
};

export default NotAssigneWorksTable;
