import { forwardRef } from 'react';
import useInvoice from '../../hooks/useInvoice';

const TemplateA = forwardRef(({ totals }, ref) => {
    const { invoiceData } = useInvoice();
    return (
        <div
            ref={ref}
            className="bg-white p-4 sm:p-6 md:p-12 w-full max-w-4xl mx-auto shadow-lg border-t-8 border-indigo-6 font-sans"
        >
            <div className="flex justify-between items-start mb-10">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-indigo-7 mb-1">
                        {invoiceData.title}
                    </h1>
                    <p className="text-gray-5">
                        Invoice No:{' '}
                        <span className="font-semibold text-gray-7">
                            {invoiceData.invoiceNumber}
                        </span>
                    </p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold text-gray-8">
                        {invoiceData.from.company}
                    </h2>
                    <p className="text-sm text-gray-5">
                        {invoiceData.from.address}
                    </p>
                    <p className="text-sm text-gray-5">
                        Email: {invoiceData.from.email}
                    </p>
                    <p className="text-sm text-gray-5">
                        Phone: {invoiceData.from.phone}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-10 text-sm">
                <div>
                    <h3 className="font-bold text-gray-7 mb-2 border-b pb-1 border-indigo-1">
                        BILL TO:
                    </h3>
                    <p className="font-semibold text-gray-8">
                        {invoiceData.to.name}
                    </p>
                    <p className="text-gray-6">{invoiceData.to.address}</p>
                    <p className="text-gray-6">Email: {invoiceData.to.email}</p>
                    <p className="text-gray-6">Phone: {invoiceData.to.phone}</p>
                </div>
                <div className="text-right">
                    <div className="mb-2">
                        <span className="font-semibold text-gray-7">
                            Invoice Date:{' '}
                        </span>
                        <span className="text-gray-6">{invoiceData.date}</span>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-7">
                            Due Date:{' '}
                        </span>
                        <span className="text-gray-6">
                            {invoiceData.dueDate}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mb-10 rounded-lg overflow-x-auto border border-indigo-2">
                <table className="w-full text-left text-sm">
                    <thead className="bg-indigo-05 text-indigo-7 uppercase tracking-wider">
                        <tr>
                            <th className="p-3">Item Description</th>
                            <th className="p-3 text-right w-20">Qty</th>
                            <th className="p-3 text-right w-32">Unit Price</th>
                            <th className="p-3 text-right w-32">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.items.map((item, index) => (
                            <tr
                                key={item.id}
                                className={
                                    index % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-indigo-50-50'
                                }
                            >
                                <td className="p-3 text-gray-8">{item.name}</td>
                                <td className="p-3 text-right text-gray-6">
                                    {item.quantity == '' ? 0 : item.quantity}
                                </td>
                                <td className="p-3 text-right text-gray-6">
                                    $
                                    {item.price == ''
                                        ? 0
                                        : item.price.toFixed(2)}
                                </td>
                                <td className="p-3 text-right font-semibold text-gray-8">
                                    ${(item.quantity * item.price).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end">
                <div className="w-full md:w-80">
                    <div className="space-y-2 text-sm text-gray-7 border-t pt-4">
                        <div className="flex justify-between">
                            <span className="font-medium">Subtotal:</span>
                            <span>${totals.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">
                                Tax ({invoiceData.taxRate}%):
                            </span>
                            <span>${totals.taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold border-t pt-2 text-indigo-7">
                            <span>TOTAL AMOUNT:</span>
                            <span>${totals.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-4 border-t border-gray-2 text-sm">
                <h4 className="font-bold text-gray-7 mb-2">Terms & Notes:</h4>
                <p className="text-gray-5 mb-4">{invoiceData.notes}</p>

                {invoiceData.signatureImage && (
                    <div className="mt-6">
                        <img
                            src={invoiceData.signatureImage}
                            alt="Signature"
                            className="h-16 w-32 object-contain border-b pb-1"
                        />
                        <p className="text-xs text-gray-4 mt-1">
                            Authorized Signature/Stamp
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
});

export default TemplateA;
