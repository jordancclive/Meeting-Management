import React from 'react';
import { AlertTriangleIcon, InfoIcon, CheckCircleIcon, XCircleIcon, XIcon } from 'lucide-react';
export type AlertVariant = 'info' | 'warning' | 'success' | 'error' | 'danger';
interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}
export const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  children,
  dismissible = false,
  onDismiss
}) => {
  // Styling based on variant
  const getStyles = () => {
    switch (variant) {
      case 'info':
        return {
          container: 'bg-azure-50 border border-azure-200 text-azure-800',
          icon: <InfoIcon className="h-5 w-5 text-azure-500 flex-shrink-0" />
        };
      case 'warning':
        return {
          container: 'bg-amber-50 border border-amber-200 text-amber-800',
          icon: <AlertTriangleIcon className="h-5 w-5 text-amber-500 flex-shrink-0" />
        };
      case 'success':
        return {
          container: 'bg-emerald-50 border border-emerald-200 text-emerald-800',
          icon: <CheckCircleIcon className="h-5 w-5 text-emerald-500 flex-shrink-0" />
        };
      case 'error':
      case 'danger':
        return {
          container: 'bg-red-50 border border-red-200 text-red-800',
          icon: <XCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
        };
      default:
        return {
          container: 'bg-slate-50 border border-slate-200 text-slate-800',
          icon: <InfoIcon className="h-5 w-5 text-slate-500 flex-shrink-0" />
        };
    }
  };
  const styles = getStyles();
  return <div className={`${styles.container} rounded-md p-4 relative`}>
      <div className="flex">
        <div className="flex-shrink-0 mr-3">{styles.icon}</div>
        <div className="flex-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={`text-sm ${title ? 'mt-1' : ''}`}>{children}</div>
        </div>
        {dismissible && <button onClick={onDismiss} className="ml-auto flex-shrink-0 -mr-1 -mt-1 p-1 rounded-md hover:bg-opacity-10 hover:bg-slate-900">
            <XIcon className="h-4 w-4" />
          </button>}
      </div>
    </div>;
};