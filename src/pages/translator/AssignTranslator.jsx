import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSourceLanguages, getTargetLanguages, getTranslators } from '../../redux/actions/translator';
import SelectControl from '../../components/Select/SelectControl';
import FullScreenLoader from '../../components/Loader/FullScreen';
import { set } from 'date-fns';

const AssignTranslator = () => {
    const dispatch = useDispatch();

    const [sourceLanguageOptions, setSourceLanguageOptions] = useState([])
    const [targetLanguageOptions, setTargetLanguageOptions] = useState([])
    const [translatorOptions, setTranslatorOptions] = useState([])
    const [sourceLanguage, setSourceLanguage] = useState('')
    const [targetLanguage, setTargetLanguage] = useState('')
    const [translator, setTranslator] = useState('');

    const { sourceLanguages, targetLanguages, translators, loading } = useSelector((state) => state.translator)

    useEffect(() => {
        dispatch(getSourceLanguages())
    }, [])
    useEffect(() => {
        if (sourceLanguages && sourceLanguages.length >= 0) {
            const options = sourceLanguages.map((sourceLanguage) => ({
                label: sourceLanguage,
                value: sourceLanguage
            }))
            setSourceLanguageOptions(options)
        }
    }, [sourceLanguages])
    useEffect(() => {
        if (targetLanguages && targetLanguages.length >= 0) {
            const options = targetLanguages.map((targetLanguage) => ({
                label: targetLanguage,
                value: targetLanguage
            }))
            setTargetLanguageOptions(options)
        }
    }, [targetLanguages])
    useEffect(() => {
        if (translators && translators.length >= 0) {
            const options = translators.map((translator) => ({
                label: translator.name,
                value: translator.id
            }))
            setTranslatorOptions(options)
        }
    }, [translators])
    useEffect(() => {
        if (sourceLanguage) {
            setTargetLanguage('')
            setTranslator('')
            dispatch(getTargetLanguages(sourceLanguage))
        }
    }, [sourceLanguage])

    useEffect(() => {
        if (sourceLanguage && targetLanguage) {
            setTranslator('')
            dispatch(getTranslators(sourceLanguage, targetLanguage))
        }
    }, [sourceLanguage, targetLanguage])
    if (loading) {
        return <FullScreenLoader />
    }
    return (
        <div className='px-6'>
            <h1 className='text-2xl text-center py-4 font-semibold font-sans'>Assign Translator</h1>

            <div className='grid grid-cols-3 gap-4'>
                <SelectControl
                    options={sourceLanguageOptions}
                    label='Source Language'
                    value={sourceLanguage}
                    onChange={setSourceLanguage}
                    capitalize={true}
                />
                <SelectControl
                    options={targetLanguageOptions}
                    label='Target Language'
                    value={targetLanguage}
                    onChange={setTargetLanguage}
                    capitalize={true}
                />
                <SelectControl
                    options={translatorOptions}
                    label='Translator'
                    value={translator}
                    onChange={setTranslator}
                />
            </div>
        </div>
    )
}

export default AssignTranslator
