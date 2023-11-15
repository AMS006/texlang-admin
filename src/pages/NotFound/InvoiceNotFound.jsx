import React from 'react';

const InvoiceNotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Invoice Not Found</h1>
                <p className="text-gray-600">The requested invoice could not be found.</p>
            </div>
        </div>
    );
};

export default InvoiceNotFound;
