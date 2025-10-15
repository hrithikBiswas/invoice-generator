import useInvoice from '../../hooks/useInvoice';
import InputField from './InputField';
import Delete from '../SVG/Delete';
import Close from '../SVG/Close';
import { Button } from '@heroui/react';

const InputForm = ({ totals }) => {
    const {
        invoiceData,
        setInvoiceData,
        handleChange,
        handleItemChange,
        addItem,
        removeItem,
        handleSignatureUpload,
    } = useInvoice();

    const totalItemCount = invoiceData.items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                Invoice Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                    label="Invoice Title"
                    path="title"
                    type="text"
                    placeholder="e.g., Service Invoice"
                />
                <InputField
                    label="Invoice Number"
                    path="invoiceNumber"
                    type="text"
                    placeholder="e.g., INV-2025-0001"
                />
                <InputField label="Invoice Date" path="date" type="date" />
                <InputField label="Due Date" path="dueDate" type="date" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* From  Company */}
                <div className="p-4 border border-gray-200 rounded-lg bg-indigo-50/50">
                    <h3 className="font-semibold text-indigo-700 mb-3 border-b pb-1">
                        BILL FROM
                    </h3>
                    <InputField label="Company Name" path="from.company" />
                    <InputField label="Address" path="from.address" />
                    <InputField label="Email" path="from.email" type="email" />
                    <InputField label="Phone" path="from.phone" type="tel" />
                </div>

                {/* To Client */}
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="font-semibold text-gray-700 mb-3 border-b pb-1">
                        BILL TO
                    </h3>
                    <InputField label="Client Name" path="to.name" />
                    <InputField label="Address" path="to.address" />
                    <InputField label="Email" path="to.email" type="email" />
                    <InputField label="Phone" path="to.phone" type="tel" />
                </div>
            </div>

            {/* Items List */}
            <h3 className="text-xl font-bold mt-8 mb-4 text-gray-800 border-b pb-2">
                List Items
            </h3>
            {invoiceData.items.map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-4 xl:grid-cols-4 grid-rows-2 xl:grid-rows-1 gap-3 p-3 mb-3 border border-gray-100 rounded-lg shadow-sm bg-white"
                >
                    <div className="col-span-4 xl:col-span-1 xl:row-start-1">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Item Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                            value={item.name}
                            onChange={(e) =>
                                handleItemChange(e, item.id, 'name')
                            }
                        />
                    </div>
                    <div className="row-start-2 col-span-1 xl:col-span-1 xl:row-start-1">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Qty
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                            value={item.quantity}
                            onChange={(e) =>
                                handleItemChange(e, item.id, 'quantity', true)
                            }
                            min="1"
                        />
                    </div>
                    <div className="row-start-2 col-span-1 xl:col-span-1 xl:row-start-1">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Unit Price
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                            value={item.price}
                            onChange={(e) =>
                                handleItemChange(e, item.id, 'price', true)
                            }
                            step="10"
                            min="0"
                        />
                    </div>
                    <div className="flex items-end space-x-2 row-start-2 col-span-2 xl:col-span-1 xl:row-start-1">
                        <div className="w-full">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">
                                Total
                            </label>
                            <p className="p-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg">
                                ${(item.quantity * item.price).toFixed(2)}
                            </p>
                        </div>
                        {invoiceData.items.length >= 1 && (
                            <Button
                                onPress={() => removeItem(item.id)}
                                className="min-w-8 sm:min-w-10 p-0 bg-red-500 text-white rounded-lg h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center hover:bg-red-600 transition-colors mt-auto cursor-pointer"
                                title="Remove Item"
                            >
                                <Delete />
                            </Button>
                        )}
                    </div>
                </div>
            ))}

            {totalItemCount > 0 ? (
                <div className="flex justify-end p-2 text-sm text-gray-700">
                    <span className="font-semibold">
                        Subtotal: ${totals.subtotal.toFixed(2)}
                    </span>
                </div>
            ) : (
                <p className="text-center text-gray-500 italic mb-4">
                    Add services or products to generate an invoice total.
                </p>
            )}

            <button
                onClick={addItem}
                className="w-full py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition-colors text-sm font-medium mt-2 cursor-pointer"
            >
                + Add New Item
            </button>

            {/* Tax and Notes */}
            <div className="mt-8 border-t pt-4">
                <InputField
                    label="Tax Rate (%)"
                    path="taxRate"
                    type="number"
                    placeholder="e.g., 10"
                    true
                />
                <div className="mb-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Notes / Terms
                    </label>
                    <textarea
                        className="w-full p-2 outline-none border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors text-sm"
                        rows="4"
                        value={invoiceData.notes}
                        onChange={(e) => handleChange(e, 'notes')}
                    />
                </div>
            </div>

            {/* Signature Upload */}
            <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Signature / Stamp (Optional Image)
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleSignatureUpload}
                    className="text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {invoiceData.signatureImage && (
                    <div className="mt-3 relative w-32 h-16">
                        <img
                            src={invoiceData.signatureImage}
                            alt="Signature Preview"
                            className="h-full w-full object-contain border-b-2"
                        />
                        <button
                            onClick={() =>
                                setInvoiceData((prev) => ({
                                    ...prev,
                                    signatureImage: null,
                                }))
                            }
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center -mt-2 -mr-2 cursor-pointer"
                        >
                            <Close width="w-4" height="h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputForm;
