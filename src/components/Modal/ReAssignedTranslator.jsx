import { useState } from "react";
import SelectControl from "../Select/SelectControl";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateReAssignTranslatorsWorks } from "../../redux/reducers/translator";
import PropTypes from 'prop-types';



const ReAssignTranslatorModal = ({ work, open, setOpen }) => {

    const [loading, setLoading] = useState(false);
    const [fetchingTranslators, setFetchingTranslators] = useState(false);
    const [translatorOptions, setTranslatorOptions] = useState([]);
    const [noTranslators, setNoTranslators] = useState(false);
    const [translator, setTranslator] = useState('');

    const dispatch = useDispatch();
    const handleSubmit = async () => {

        if (!translator) {
            toast.error('Please select translator');
            return;
        }

        try {
            setLoading(true);
            await axios({
                method: 'PUT',
                url: `${import.meta.env.VITE_API_URL}/api/megdapAdmin/translator/reAssignWork`,
                data: {
                    fileId: work.id,
                    translatorId: translator,
                    translatorName: work?.translatorName
                }
            })
            setLoading(false);
            toast.success('Translator Re-Assigned Successfully');
            setOpen(false);

            const newTranslatorData = translatorOptions.find((translatorOption) => translatorOption.value === translator);

            const payload = {
                id: work.id,
                translatorId: newTranslatorData.value,
                translatorName: newTranslatorData.label
            }

            dispatch(updateReAssignTranslatorsWorks(payload));
        } catch (error) {
            const message = error?.response?.data?.message || 'Unable to re-assign translator';
            toast.error(message);
            setLoading(false);
        }

    }

    const handleFetchTranslators = async () => {
        setFetchingTranslators(true);
        try {
            const res = await axios({
                method: 'GET',
                url: `${import.meta.env.VITE_API_URL}/api/megdapAdmin/translator/toReAssignWork`,
                params: {
                    sourceLanguage: work.sourceLanguage,
                    targetLanguage: work.targetLanguage,
                    translatorId: work.translatorId
                }

            })
            if (res?.data?.translators?.length === 0) {
                setNoTranslators(true);
                setTranslatorOptions([]);
                setFetchingTranslators(false);
                return;
            }
            setTranslatorOptions(res?.data?.translators);
            setFetchingTranslators(false);
        } catch (error) {
            setFetchingTranslators(false);
        }
    }
    return (
        <>
            {open && <div>
                <div className='fixed  top-0 bottom-0 z-20 right-0 left-0 bg-slate-500 bg-opacity-40'
                    role="button"
                    onClick={() => setOpen(false)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            setOpen(false);
                        }
                    }}
                ></div>
                <div role="dialog" aria-modal="true" className="fixed  right-1/2 top-1/2 z-40 overflow-y-hidden translate-x-1/2 -translate-y-1/2 md:min-w-[50%] min-w-[80%] bg-white px-4 py-4">
                    <div className='border border-yellow-500 font-sans my-4'>
                        <h1 className='bg-yellow-500 text-white text-lg px-2.5 py-1.5 text-start'>Re-Assign Translator</h1>
                        <div className='flex items-start justify-between gap-2.5 px-2.5 py-4 select-none'>
                            <div className="flex flex-col items-start gap-0.5">
                                <div>
                                    <span className='font-semibold'>Assigned To : </span>
                                    <span>{work?.translatorName}</span>
                                </div>
                                <div>
                                    <span className="font-semibold">Source Language : </span>
                                    <span className="capitalize">{work.sourceLanguage}</span>
                                </div>
                                <div>
                                    <span className="font-semibold">Target Language : </span>
                                    <span className="capitalize">{work.targetLanguage}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleFetchTranslators}
                                disabled={fetchingTranslators}
                                className={`bg-blue-500 text-white px-2.5 py-1.5 rounded ${fetchingTranslators ? 'bg-opacity-50' : 'hover:bg-blue-600'}`}>
                                {fetchingTranslators ? 'Fetching...' : 'Fetch Translators'}
                            </button>
                        </div>
                        {translatorOptions.length > 0 && <div className="px-2 py-1.5">
                            <SelectControl value={translator} onChange={setTranslator} label={'Translators'} id={'translator'} options={translatorOptions} />
                        </div>}
                        {noTranslators && <div className='flex justify-center items-center py-4'>
                            <span className='text-red-500 font-semibold'>No Translators Found</span>
                        </div>}
                    </div>
                    <div className='w-full flex justify-end gap-2'>
                        <button type='button' onClick={() => setOpen(false)} className='px-2.5 py-1.5 border border-black font-sans'>Close</button>
                        <button onClick={handleSubmit} disabled={loading} className={`px-2.5 py-1.5 bg-blue-500 text-white ${loading ? 'opacity-60' : ''}`}>{loading ? 'Approving...' : "Confirm"}</button>
                    </div>
                </div>
            </div>}
        </>
    )
}

ReAssignTranslatorModal.prototype = {
    work: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
};
export default ReAssignTranslatorModal
