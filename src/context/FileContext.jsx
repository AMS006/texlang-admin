import { createContext, useContext, useState } from 'react';

const FileDataContext = createContext();

export function useFileData() {
    return useContext(FileDataContext);
}

const FileDataProvider = ({ children }) => {
    const [fileData, setFileData] = useState([]);

    return (
        <FileDataContext.Provider value={{ fileData, setFileData }}>
            {children}
        </FileDataContext.Provider>
    );
}
export default FileDataProvider;
