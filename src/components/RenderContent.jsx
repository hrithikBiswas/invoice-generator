import { useRef } from 'react';
import { Button } from '@heroui/react';
import useInvoice from '../hooks/useInvoice';
import { calculateTotals } from '../utils/action';
import TemplateSelector from './TemplateSelector';
import InputForm from './inputForm';
import TemplateA from './template/TemplateA';
import TemplateB from './template/TemplateB';
import Eye from './SVG/Eye';
import Edit from './SVG/Edit';
import Download from './SVG/Download';
import RightArrow from './SVG/RightArrow';
import Palette from './SVG/Palette';
import Plus from './SVG/Plus';
import nanoid from '../lib/nanoid';

const RenderContent = () => {
    const invoiceRef = useRef(null);

    const {
        invoiceData,
        setInvoiceData,
        step,
        setStep,
        downloadStatus,
        setDownloadStatus,
        createNewInvoice,
        generatePDF,
    } = useInvoice();

    const totals = calculateTotals(invoiceData.items, invoiceData.taxRate);

    const TemplateComponent =
        invoiceData.template === 'A' ? TemplateA : TemplateB;

    switch (step) {
        case 1:
            return <TemplateSelector />;

        case 2:
            return (
                <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
                    <div className="px-4 md:px-8">
                        <div className="fixed bottom-0 left-0 right-0 z-10 bg-gray-50 max-w-4xl md:max-w-full md:mx-16 pb-4 md:pb-8 mx-auto">
                            <div className=" border border-gray-200 flex gap-y-3 justify-between items-center p-4 bg-white rounded-xl shadow-2xl ">
                                <div className="w-full flex justify-between gap-2">
                                    <Button
                                        onPress={() => setStep(1)}
                                        className="min-w-0 text-base py-2 px-6 sm:px-4  text-indigo-700 bg-indigo-100 hover:bg-indigo-200/80 cursor-pointer rounded-lg font-medium transition-colors shadow-sm"
                                    >
                                        <Palette className="hidden sm:inline w-5 h-5 mr-2" />{' '}
                                        Change Template
                                    </Button>
                                    <Button
                                        onPress={() => {
                                            setStep(3);
                                        }}
                                        className="min-w-0 text-base  py-2 px-6 sm:px-4 text-white rounded-lg font-bold cursor-pointer transition-transform transform bg-indigo-600 hover:bg-indigo-700shadow-xl"
                                    >
                                        <Eye className="hidden sm:inline w-5 h-5 mr-2" />
                                        Final Preview
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:grid lg:grid-cols-2 gap-8 px-0 sm:px-4 pb-4 lg:pb-4 lg:px-8 mb-8 lg:mb-12 min-h-screen">
                        <div className="lg:sticky lg:top-4 h-full border border-gray-200 rounded-2xl overflow-hidden lg:max-h-[90vh] mb-8 lg:mb-0">
                            <InputForm totals={totals} />
                        </div>

                        <div className="min-h-[500px] border-4 border-gray-100 rounded-xl overflow-hidden bg-gray-200 p-2 md:p-4">
                            <h3 className="text-lg font-bold text-gray-600 mb-2 block md:hidden text-center">
                                Live Preview
                            </h3>
                            <div className="scale-100 origin-top-left">
                                <TemplateComponent totals={totals} />
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 3:
            return (
                <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
                    <div className="max-w-4xl mx-auto">
                        <div className="fixed bottom-0 left-0 right-0 max-w-4xl pb-4 md:pb-8 bg-gray-50 mx-auto">
                            <div className=" border border-gray-200 flex gap-y-3 justify-between items-center p-4 bg-white rounded-xl shadow-2xl">
                                <div className="w-full flex justify-between gap-2">
                                    <Button
                                        onPress={() => setStep(2)}
                                        className="min-w-0 text-base  py-2 px-6 sm:px-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors cursor-pointer shadow-sm"
                                    >
                                        <Edit className="hidden sm:inline w-4 h-4 mr-1" />{' '}
                                        Back to Edit
                                    </Button>
                                    <Button
                                        onPress={() => setStep(4)}
                                        className={`min-w-0 text-base flex gap-2 py-2 px-6 sm:px-4 text-white rounded-lg font-bold cursor-pointer transition-transform transform bg-indigo-600 hover:bg-indigo-700 shadow-xl`}
                                    >
                                        Go to Download{' '}
                                        <RightArrow className="hidden sm:inline w-6 h-6 text-white" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="border-4 mb-14 md:mb-16 border-dashed border-gray-300 rounded-xl overflow-hidden bg-white">
                            <TemplateComponent
                                totals={totals}
                                ref={invoiceRef}
                            />
                        </div>
                    </div>
                </div>
            );
        case 4:
            return (
                <div className="p-4 md:p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="fixed bottom-0 left-0 right-0 z-20 max-w-4xl bg-gray-50 pb-4 md:pb-8 mx-auto">
                            <div className=" border border-gray-200 flex gap-y-3 justify-between items-center p-4 bg-white rounded-xl shadow-2xl ">
                                <div className="w-full flex justify-between gap-2">
                                    <Button
                                        onPress={() => setStep(3)}
                                        className="min-w-0 text-base py-2 px-6 sm:px-4 bg-gray-200 text-gray-700 cursor-pointer rounded-lg font-medium hover:bg-gray-300 transition-colors shadow-sm"
                                    >
                                        <Eye className="hidden sm:inline w-4 h-4 mr-1" />{' '}
                                        Back to Preview
                                    </Button>
                                    <Button
                                        onPress={createNewInvoice}
                                        className={`min-w-0 text-base font-bold py-2 px-6 sm:px-4 text-white rounded-lg  cursor-pointer transition-transform transform bg-indigo-600 hover:bg-indigo-700 shadow-xl`}
                                    >
                                        <Plus className="hidden sm:inline w-6 h-6 text-white" />{' '}
                                        Create New Invoice
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="border-4 border-dashed border-gray-300 mb-6 rounded-xl overflow-hidden shadow-2xl bg-white">
                            <TemplateComponent
                                totals={totals}
                                ref={invoiceRef}
                            />
                        </div>
                        <div className="text-center mb-14 md:mb-16">
                            <Button
                                size="xl"
                                onPress={() => generatePDF(invoiceRef)}
                                className={`min-w-0 text-base md:text-lg py-4 px-12 text-white rounded-lg font-bold cursor-pointer transition-transform transform ${
                                    downloadStatus === 'generating'
                                        ? 'bg-indigo-400 animate-pulse'
                                        : downloadStatus === 'success'
                                        ? 'bg-green-500 hover:bg-green-700'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                }  shadow-xl`}
                                disabled={downloadStatus === 'generating'}
                            >
                                {downloadStatus === 'generating' ? (
                                    <>Generating...</>
                                ) : downloadStatus === 'success' ? (
                                    <>PDF Downloaded!</>
                                ) : (
                                    <>
                                        <Download className="inline w-5 h-5 mr-2" />{' '}
                                        Download as PDF
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            );

        default:
            return (
                <p className="text-center p-10">
                    Unknown step. Please refresh.
                </p>
            );
    }
};

export default RenderContent;
