import { Button } from '@heroui/react';
import useInvoice from '../hooks/useInvoice';
import Download from './SVG/Download';
import Edit from './SVG/Edit';
import Eye from './SVG/Eye';
import Palette from './SVG/Palette';

const StepIndicator = () => {
    const { step: currentStep, setStep } = useInvoice();
    const steps = [
        { id: 1, name: 'Select Template', icon: Palette },
        { id: 2, name: 'Edit Details', icon: Edit },
        { id: 3, name: 'Final Preview', icon: Eye },
        { id: 4, name: 'Download PDF', icon: Download },
    ];

    return (
        <div className="flex justify-center p-4 mb-4 bg-white shadow-md rounded-xl max-w-5xl mx-auto">
            {steps.map((s) => (
                <div
                    key={s.id}
                    className="flex-1 flex flex-col items-center relative"
                >
                    <Button
                        onPress={() => {
                            if (s.id == 1) {
                                console.log('this is 1');

                                return setStep(s.id);
                            }
                            setStep(s.id);
                        }}
                        className={`min-w-0 p-0 w-10 z-10 h-10 overflow-hidden rounded-full flex items-center justify-center cursor-pointer font-bold transition-all duration-300 
                ${
                    s.id <= currentStep
                        ? 'bg-indigo-600 text-white shadow-indigo-400/50 shadow-lg'
                        : 'bg-gray-200 text-gray-500'
                }`}
                    >
                        <s.icon className="w-5 h-5" />
                    </Button>
                    <p
                        className={`text-xs mt-2 text-center hidden sm:block ${
                            s.id <= currentStep
                                ? 'text-indigo-700 font-semibold'
                                : 'text-gray-500'
                        }`}
                    >
                        {s.name}
                    </p>
                    {s.id < 4 && (
                        <div
                            className={`absolute left-1/2 top-5 h-0.5 w-full -mr-1/2 -ml-1/2 transition-colors duration-300 
                ${s.id < currentStep ? 'bg-indigo-600' : 'bg-gray-300'}`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default StepIndicator;
