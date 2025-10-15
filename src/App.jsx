import useInvoice from './hooks/useInvoice';
import StepIndicator from './components/StepIndicator';
import RenderContent from './components/RenderContent';

const App = () => {
    const { downloadStatus } = useInvoice();

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <header className="p-4 bg-white shadow-lg sticky top-0 z-20">
                <h1 className="text-3xl font-extrabold text-indigo-700 text-center">
                    Invoice Generator
                </h1>
            </header>

            <StepIndicator />

            <main className="pb-10 bg-gray-50">
                <RenderContent />
            </main>

            {downloadStatus === 'error' && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-red-500 text-white rounded-lg shadow-xl font-semibold z-50">
                    Error generating PDF. Please check the console for details
                    and ensure external libraries are available.
                </div>
            )}
        </div>
    );
};

export default App;
