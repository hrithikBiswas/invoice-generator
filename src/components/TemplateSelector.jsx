import { useState } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@heroui/react';
import Eye from './SVG/Eye';
import { calculateTotals } from '../utils/action';
import TemplateA from './template/TemplateA';
import TemplateB from './template/TemplateB';
import useInvoice from '../hooks/useInvoice';
import Close from './SVG/Close';

const TemplateSelector = () => {
    const { invoiceData, setInvoiceData, setStep } = useInvoice();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [previewTemplate, setPreviewTemplate] = useState('A');
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { subtotal, taxAmount, totalAmount } = calculateTotals(
        invoiceData.items,
        invoiceData.taxRate
    );

    const handleSelectTemplate = (templateId) => {
        setInvoiceData((prev) => ({ ...prev, template: templateId }));
        setStep(2);
    };

    const handlePreview = (templateId) => {
        setPreviewTemplate(templateId);
        setIsModalOpen(true);
    };

    const TemplatePreviewCard = ({ id, name, title, colors }) => (
        <div className="p-4 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
            <div
                className="h-48 rounded-lg mb-4 p-4 border border-gray-200 flex flex-col justify-between"
                style={{
                    backgroundColor: colors.bg,
                    borderTop: `30px solid ${colors.primary}`,
                }}
            ></div>
            <h3 className="text-xl font-semibold mb-1 text-gray-800">{name}</h3>
            <p className="text-base text-gray-500 mb-3">{title}</p>
            <div className="flex space-x-3">
                <Button
                    onPress={() => handleSelectTemplate(id)}
                    style={{ background: colors.primary }}
                    className="min-w-0 text-base flex-1 py-2 bg-indigo-600 text-white rounded-lg font-medium cursor-pointer  transition-colors"
                >
                    Select Template
                </Button>
                <Button
                    onPress={() => {
                        handlePreview(id);
                        onOpen();
                    }}
                    className="min-w-0 bg-white py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <Eye className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
                <TemplatePreviewCard
                    id="A"
                    name="Classic Indigo"
                    title="Professional and clean design"
                    colors={{
                        primary: '#4f46e5',
                        bg: '#f5f3ff',
                        textBg: 'bg-white text-indigo-600 border border-indigo-200',
                    }}
                />
                <TemplatePreviewCard
                    id="B"
                    name="Modern Blue"
                    title="Elegant and modern style"
                    colors={{
                        primary: '#0369a1',
                        bg: '#eff6ff',
                        textBg: 'bg-white text-sky-700 border border-sky-300',
                    }}
                />
            </div>

            {/* Full Preview Modal */}
            {isModalOpen && (
                <>
                    <Modal
                        backdrop="opaque"
                        isOpen={isOpen}
                        onClose={onClose}
                        scrollBehavior="inside"
                        hideCloseButton
                        classNames={{
                            wrapper: 'items-center',
                            base: 'sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] w-full',
                        }}
                    >
                        <ModalContent className="relative">
                            {(onClose) => (
                                <>
                                    <Button
                                        onPress={onClose}
                                        className="absolute right-4 md:right-5 top-3 min-w-0 w-10 h-10 rounded-full p-0"
                                        color="default"
                                        variant="light"
                                    >
                                        <Close className="w-7 h-7 text-gray-400" />
                                    </Button>
                                    <ModalHeader className="flex flex-col gap-1 pt-8">
                                        <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
                                            Full Template Preview (
                                            {previewTemplate.toLowerCase() ==
                                            'a'
                                                ? 'Classic Indigo'
                                                : 'Modern Blue'}
                                            )
                                        </h3>
                                    </ModalHeader>
                                    <ModalBody>
                                        <div className="p-4 md:p-8">
                                            <div className="md:scale-100 origin-top-left">
                                                {previewTemplate === 'A' && (
                                                    <TemplateA
                                                        invoiceData={{
                                                            ...invoiceData,
                                                            template: 'A',
                                                        }}
                                                        totals={{
                                                            subtotal,
                                                            taxAmount,
                                                            totalAmount,
                                                        }}
                                                    />
                                                )}
                                                {previewTemplate === 'B' && (
                                                    <TemplateB
                                                        invoiceData={{
                                                            ...invoiceData,
                                                            template: 'B',
                                                        }}
                                                        totals={{
                                                            subtotal,
                                                            taxAmount,
                                                            totalAmount,
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </ModalBody>
                                    <ModalFooter></ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default TemplateSelector;
