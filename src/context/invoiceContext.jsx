/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { addToast, Button, cn, closeAll } from '@heroui/react';
import nanoid from '../lib/nanoid';

const today = new Date().toISOString().split('T')[0];

const initialInvoiceData = {
    title: 'Service Invoice',
    invoiceNumber: `INV-2025-${nanoid()}`,
    date: today,
    dueDate: today,
    from: {
        company: 'Betopia Group',
        address:
            '8-B, Kaderia Tower, JA-28, Bir Uttam AK Khandakar Rd, Dhaka 1212',
        email: 'info@betopiagroup.com',
        phone: '+8801332840871',
    },
    to: {
        name: 'Hrithik Biswas',
        address: 'West Dhanmondi Shankar, Dhaka - 1207',
        email: 'mr.hrithikbiswas@gmail.com',
        phone: '+8801865696427',
    },
    items: [
        {
            id: 1,
            name: 'Web Development with React',
            quantity: 1,
            price: 150.0,
        },
        {
            id: 2,
            name: 'Certified MERN Stack Development',
            quantity: 1,
            price: 200.0,
        },
        {
            id: 3,
            name: 'Certified WordPress Development',
            quantity: 1,
            price: 300.0,
        },
    ],
    taxRate: 7.5,
    notes: 'Thank you for your prompt payment! We appreciate your business.',
    signatureImage: null,
    template: 'A',
};

export const InvoiceContext = createContext(null);

const InvoiceProvider = ({ children }) => {
    const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
    const [step, setStep] = useState(1);
    const [downloadStatus, setDownloadStatus] = useState(null);

    const handleChange = useCallback(
        (event, path, isNumber = false) => {
            const { value } = event.target;
            setInvoiceData((prev) => {
                let newState = { ...prev };
                const keys = path.split('.');
                let current = newState;

                for (let i = 0; i < keys.length - 1; i++) {
                    current = current[keys[i]];
                }

                const finalKey = keys[keys.length - 1];
                current[finalKey] = isNumber
                    ? value === ''
                        ? ''
                        : parseFloat(value)
                    : value;

                return newState;
            });
        },
        [setInvoiceData]
    );

    const handleItemChange = useCallback(
        (event, id, key, isNumber = false) => {
            const { value } = event.target;
            setInvoiceData((prev) => ({
                ...prev,
                items: prev.items.map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              [key]: isNumber
                                  ? value === ''
                                      ? ''
                                      : parseFloat(value)
                                  : value,
                          }
                        : item
                ),
            }));
        },
        [setInvoiceData]
    );

    const addItem = () => {
        setInvoiceData((prev) => ({
            ...prev,
            items: [
                ...prev.items,
                { id: Date.now(), name: '', quantity: 1, price: 0.0 },
            ],
        }));
    };

    const removeItem = (id) => {
        setInvoiceData((prev) => ({
            ...prev,
            items: prev.items.filter((item) => item.id !== id),
        }));
    };

    const handleSignatureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInvoiceData((prev) => ({
                    ...prev,
                    signatureImage: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const generatePDF = useCallback(
        async (invoiceRef) => {
            setDownloadStatus('generating');

            if (!invoiceRef.current) {
                setDownloadStatus('error');
                console.error('Invoice element not found.');
                return;
            }

            const input = invoiceRef.current;

            try {
                html2canvas(input, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                }).then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');

                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    const imgWidth = canvas.width;
                    const imgHeight = canvas.height;
                    const ratio = imgWidth / imgHeight;

                    let finalWidth = pdfWidth - 20;
                    let finalHeight = finalWidth / ratio;

                    if (finalHeight > pdfHeight - 20) {
                        finalHeight = pdfHeight - 20;
                        finalWidth = finalHeight * ratio;
                    }

                    const x = (pdfWidth - finalWidth) / 2;
                    const y = 10;

                    pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
                    pdf.save(`invoice_${invoiceData.invoiceNumber}.pdf`);
                    setDownloadStatus('success');
                });
            } catch (error) {
                console.error('Error generating PDF:', error);
                setDownloadStatus('error');
            }

            addToast({
                hideCloseButton: true,
                title: <h4 className="text-lg">Download Status</h4>,
                description: (
                    <h5 className="text-md">
                        Your invoice downloaded successfully!
                    </h5>
                ),
                color: 'success',
                timeout: 4000,
                shouldShowTimeoutProgress: true,
                radius: 'sm',
            });
        },
        [invoiceData.invoiceNumber]
    );

    return (
        <InvoiceContext.Provider
            value={{
                invoiceData,
                setInvoiceData,
                step,
                setStep,
                handleChange,
                handleItemChange,
                addItem,
                removeItem,
                handleSignatureUpload,
                downloadStatus,
                setDownloadStatus,
                generatePDF,
            }}
        >
            {children}
        </InvoiceContext.Provider>
    );
};

export default InvoiceProvider;
