import React, { useState, useEffect } from 'react';

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

const ToastContext = React.createContext<{ showToast: (toast: Omit<ToastMessage, 'id'>) => void } | undefined>(undefined);

let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  function showToast(toast: Omit<ToastMessage, 'id'>) {
    const id = toastId++;
    setMessages(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== id));
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {messages.map(({ id, title, description, variant }) => (
          <div
            key={id}
            className={`max-w-xs px-4 py-2 rounded shadow text-white font-semibold ${
              variant === 'destructive' ? 'bg-red-600' : 'bg-gray-800'
            }`}
          >
            <div>{title}</div>
            {description && <div className="text-sm font-normal mt-1">{description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.showToast;
}

// Helper to trigger toast messages outside React components
export function toast(toast: Omit<ToastMessage, 'id'>) {
  const event = new CustomEvent('toast-trigger', { detail: toast });
  window.dispatchEvent(event);
}

// Setup event listener for toast-trigger events
if (typeof window !== 'undefined') {
  window.addEventListener('toast-trigger', (e: any) => {
    // Just a place-holder, real usage is inside React component
    // Use toast() inside React components instead
  });
}
