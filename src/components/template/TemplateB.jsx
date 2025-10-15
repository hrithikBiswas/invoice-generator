import { forwardRef } from 'react';
import useInvoice from '../../hooks/useInvoice';

const TemplateB = forwardRef(({ totals }, ref) => {
    const { invoiceData } = useInvoice();
    return (
        <div
            ref={ref}
            className="bg-white p-4 sm:p-6 md:p-12 w-full max-w-4xl mx-auto shadow-2xl border-l-8 border-sky-7 font-serif"
        >
            <header className="mb-12">
                <div className="text-center bg-sky-7 text-white py-4 rounded-t-lg">
                    <h1 className="text-3xl font-bold uppercase">
                        {invoiceData.title}
                    </h1>
                </div>
                <div className="flex justify-between border-b pb-4 border-sky-2 pt-4 px-2">
                    <div>
                        <p className="text-sm text-sky-6 font-semibold">
                            Invoice #
                        </p>
                        <p className="text-lg font-bold text-gray-8">
                            {invoiceData.invoiceNumber}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-bold text-sky-7">
                            {invoiceData.from.company}
                        </p>
                        <p className="text-sm text-gray-6">
                            {invoiceData.from.address}
                        </p>
                        <p className="text-sm text-gray-6">
                            {invoiceData.from.email} | {invoiceData.from.phone}
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-4 md:grid-cols-3 justify-between gap-x-2 gap-y-6 sm:gap-4 mb-10 text-sm border-b pb-4 px-2 border-sky-1">
                <div className="col-span-2 md:col-span-1">
                    <h3 className="font-bold text-sky-7 mb-1">INVOICE DATE</h3>
                    <p className="text-gray-7">{invoiceData.date}</p>
                </div>
                <div className="col-span-2 md:col-span-1 text-end md:text-left">
                    <h3 className="font-bold text-sky-7 mb-1">DUE DATE</h3>
                    <p className="text-gray-7">{invoiceData.dueDate}</p>
                </div>
                <div className="col-span-4 md:col-span-1">
                    <h3 className="font-bold text-sky-7 mb-1">BILLED TO</h3>
                    <p className="font-semibold text-gray-8">
                        {invoiceData.to.name}
                    </p>
                    <p className="text-gray-6">{invoiceData.to.address}</p>
                    <p className="text-gray-6 wrap-break-word">
                        {invoiceData.to.email}
                    </p>
                    <p className="text-gray-6 wrap-break-word">
                        {invoiceData.to.phone}
                    </p>
                </div>
            </div>

            <div className="mb-10 overflow-x-auto">
                <table className="w-full text-left text-base border-collapse">
                    <thead className="bg-sky-05 text-gray-8 border-b border-sky-3">
                        <tr>
                            <th className="py-3 px-2">Item Description</th>
                            <th className="py-3 px-2 text-right w-20">Qty</th>
                            <th className="py-3 px-2 text-right w-32">
                                Unit Price
                            </th>
                            <th className="py-3 px-2 text-right w-32">
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.items.map((item, index) => (
                            <tr
                                key={item.id}
                                className={
                                    index % 2 === 0 ? 'bg-white' : 'bg-sky-05'
                                }
                            >
                                <td className="py-3 px-2 text-gray-7">
                                    {item.name}
                                </td>
                                <td className="py-3 px-2 text-right text-gray-6">
                                    {item.quantity == '' ? 0 : item.quantity}
                                </td>
                                <td className="py-3 px-2 text-right text-gray-6">
                                    $
                                    {item.price == ''
                                        ? 0
                                        : item.price.toFixed(2)}
                                </td>
                                <td className="py-3 px-2 text-right font-bold text-gray-8">
                                    ${(item.quantity * item.price).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end">
                <div className="w-full md:w-96 p-4 bg-sky-05 rounded-lg shadow-inner">
                    <div className="space-y-2 text-base text-gray-7">
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
                        <div className="flex justify-between text-xl sm:text-2xl font-extrabold border-t-2 border-sky-3 pt-3 text-sky-7">
                            <span>BALANCE:</span>
                            <span>${totals.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-12 pt-4 text-sm border-t border-gray-2 text-gray-5">
                <h4 className="font-bold text-gray-7 mb-2">Terms & Notes:</h4>
                <p className="mb-4">{invoiceData.notes}</p>
                {invoiceData.signatureImage && (
                    <div className="mt-6 inline-block">
                        <img
                            src={invoiceData.signatureImage}
                            alt="Signature"
                            className="h-16 w-40 object-contain border-b-2 border-sky-7 pb-2"
                        />
                        <p className="text-xs text-sky-6 mt-1">
                            Authorized Signature/Stamp
                        </p>
                    </div>
                )}
            </footer>
        </div>
    );
});

export default TemplateB;
