// components/ToastProvider.jsx
import { Toaster } from 'react-hot-toast';

function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Default options
        duration: 3000,
        style: {
          background: '#fff',
          color: 'oklch(41% 0.112 45.904)',
          borderRadius: '10px',
          padding: '16px',
        },
        
        // Success
        success: {
          duration: 3000,
          theme: {
            primary: '#4ade80',
          },
          iconTheme: {
            primary: '#4ade80',
            secondary: '#fff',
          },
        },
        
        // Error
        error: {
          duration: 4000,
          theme: {
            primary: '#ef4444',
          },
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
        
        // Loading
        loading: {
          theme: {
            primary: '#3b82f6',
          },
        },
      }}
    />
  );
}

export default ToastProvider;
