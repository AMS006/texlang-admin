
const SubmitButton = ({ loading, handleSubmit, type, loadingText }) => {

    return (
        <div className='flex items-start'>
            <button
                type={type}
                onClick={handleSubmit}
                disabled={loading}
                className={`px-2.5 py-1.5 bg-blue-600  text-white ${loading ? 'bg-opacity-60' : 'hover:bg-blue-700'}`}>
                {loading ? loadingText : 'Submit'}
            </button>
        </div>
    )
}

export default SubmitButton
