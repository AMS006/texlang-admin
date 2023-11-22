import React from 'react';
import { Controller } from 'react-hook-form';
import { languageOptions } from '../../data/options';

const LangSelect = ({ label, name, placeholder, control, errorMessage }) => {

    return (
        <div className="flex flex-col gap-0 w-full">
            {label && <label className="font-semibold">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <select
                        {...field}
                        placeholder={placeholder}
                        defaultValue={""}
                        className={`px-2 py-1.5 border w-full rounded ${errorMessage ? 'border-red-500 focus:outline-red-500' : 'border-gray-400 focus:outline-blue-500'}`}
                    >
                        <option value="" disabled >Select {label}</option>
                        {languageOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            />
            {errorMessage && <span className="text-xs text-red-500">{errorMessage}</span>}
        </div>
    );
};

export default LangSelect;
