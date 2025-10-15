import { InvoiceContext } from '../context/invoiceContext';
import { useContext } from 'react';

const useInvoice = () => {
    const context = useContext(InvoiceContext);
    if (!context) {
        throw new Error('useInvoice must be used within an InvoiceProvider');
    }
    return context;
};

export default useInvoice;
