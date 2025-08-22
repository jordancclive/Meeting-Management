import React, { useEffect, useState, Component } from 'react';
import { CheckCircle as CheckCircleIcon, X as CloseIcon, AlertCircle as AlertCircleIcon, AlertTriangle as AlertTriangleIcon } from 'lucide-react';
interface ToastProps {
  message: string;
  variant?: 'success' | 'warning' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}
export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'success',
  isVisible,
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible && autoClose) {
      timer = setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, autoClose, autoCloseTime, onClose]);
  if (!isVisible) return null;
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <CheckCircleIcon className="h-5 w-5 text-emerald-500" />;
      case 'warning':
        return <AlertTriangleIcon className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircleIcon className="h-5 w-5 text-red-500" />;
      case 'info':
        return <AlertCircleIcon className="h-5 w-5 text-azure-500" />;
      default:
        return <CheckCircleIcon className="h-5 w-5 text-emerald-500" />;
    }
  };
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'info':
        return 'bg-azure-50 border-azure-200';
      default:
        return 'bg-emerald-50 border-emerald-200';
    }
  };
  const getTextColor = () => {
    switch (variant) {
      case 'success':
        return 'text-emerald-800';
      case 'warning':
        return 'text-amber-800';
      case 'error':
        return 'text-red-800';
      case 'info':
        return 'text-azure-800';
      default:
        return 'text-emerald-800';
    }
  };
  return <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`${getBackgroundColor()} ${getTextColor()} p-4 rounded-lg border shadow-md max-w-md flex items-start`} role="alert">
        <div className="flex-shrink-0 mr-3 mt-0.5">{getIcon()}</div>
        <div className="flex-1 mr-2">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button className="flex-shrink-0 text-slate-400 hover:text-slate-600" onClick={onClose}>
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>;
};
export const useToast = () => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    variant: 'success' as const
  });
  const showToast = (message: string, variant: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    setToast({
      isVisible: true,
      message,
      variant
    });
  };
  const hideToast = () => {
    setToast(prev => ({
      ...prev,
      isVisible: false
    }));
  };
  const ToastComponent = <Toast message={toast.message} variant={toast.variant} isVisible={toast.isVisible} onClose={hideToast} />;
  return {
    showToast,
    hideToast,
    ToastComponent
  };
};