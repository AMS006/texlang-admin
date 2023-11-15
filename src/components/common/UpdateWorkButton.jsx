import React from 'react'
import UpdateWorkModal from '../Modal/UpdateWork';

const UpdateWorkButton = ({ work }) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    return (
        <>
            <UpdateWorkModal open={modalIsOpen} setOpen={setIsOpen} work={work} />
            <button className='bg-blue-500 hover:bg-opacity-90 text-white px-2.5 py-1 rounded' onClick={() => setIsOpen(true)}>
                Edit
            </button>
        </>
    )
}

export default UpdateWorkButton
