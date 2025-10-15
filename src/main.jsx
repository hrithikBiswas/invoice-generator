import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import './index.css';
import App from './App.jsx';
import InvoiceProvider from './context/invoiceContext.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <InvoiceProvider>
            <HeroUIProvider>
                <ToastProvider placement="top-right" />
                <App />
            </HeroUIProvider>
        </InvoiceProvider>
    </StrictMode>
);
