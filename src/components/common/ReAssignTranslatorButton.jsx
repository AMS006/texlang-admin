import { useState } from 'react'
import ReAssignTranslatorModal from '../Modal/ReAssignedTranslator'

const ReAssignTranslatorButton = ({ work }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <ReAssignTranslatorModal
                open={showModal}
                setOpen={setShowModal}
                work={work}
            />
            <button
                onClick={() => setShowModal(true)}
                className='text-blue-500 hover:underline'>Re-Assign</button>
        </>
    )
}

export default ReAssignTranslatorButton
