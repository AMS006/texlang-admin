import { useMemo, useState } from 'react';
import { useRowSelect, useTable } from 'react-table';

import { updatePaidProjectColumn } from '../../data/columns';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { setPaymentPendingProjects } from '../../redux/reducers/project';
import TableLoader from '../Loader/Table';

const UpdatePaidProjectsTable = () => {
    const [paymentUpdating, setPaymentUpdating] = useState(false)
    const { paymentPendingProjects, loading } = useSelector((state) => state.project)
    const data = useMemo(() => paymentPendingProjects, [paymentPendingProjects])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = useTable(
        {
            columns: updatePaidProjectColumn,
            data,
        },
        useRowSelect,
    );
    const dispatch = useDispatch()
    const handlePaymentUpdate = async () => {
        const filteredRow = []

        selectedFlatRows.forEach((row) => {
            filteredRow.push(row.original)
        })
        if (filteredRow.length === 0)
            return toast.error('Please select atleast one project')
        setPaymentUpdating(true)
        try {
            await axios({
                method: "PUT",
                url: `${import.meta.env.VITE_API_URL}/api/megdapAdmin/project/updatePaymentStatus`,
                data: { projects: filteredRow }
            })
            toast.success('Payment Status Updated Successfully')
            setPaymentUpdating(false)
            dispatch(setPaymentPendingProjects([]))
        } catch (error) {
            const message = error?.response?.data?.message || 'Unable to Update Payment Status'
            toast.error(message)
            setPaymentUpdating(false)
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
                                <td colSpan={updatePaidProjectColumn.length} className="text-center py-1.5 border w-full">
                                    {loading ? 'Loading...' : 'No Records Found'}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <div className='py-2.5'>
                <button onClick={handlePaymentUpdate} disabled={paymentUpdating} className={`px-2.5 py-1.5 bg-blue-500  text-white ${paymentUpdating ? 'bg-opacity-60' : 'hover:bg-blue-600'}`}>{paymentUpdating ? <TableLoader /> : 'Update Payment Status'}</button>
            </div>
        </>
    );
};

export default UpdatePaidProjectsTable;
