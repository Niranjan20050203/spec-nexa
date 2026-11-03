import toast from 'react-hot-toast';
import { ToastOptions } from '@/types';

export const showToast = ({ type, message, duration = 3000 }: ToastOptions) => {
  const options = {
    duration,
    style: {
      background: '#111827',
      color: '#F8FAFC',
      border: '1px solid #263449',
      borderRadius: '0.75rem',
      fontSize: '0.875rem',
      padding: '0.75rem 1rem',
    },
  };

  switch (type) {
    case 'success':
      return toast.success(message, options);
    case 'error':
      return toast.error(message, options);
    case 'warning':
      return toast(message, { ...options, icon: '⚠️' });
    case 'info':
    default:
      return toast(message, { ...options, icon: 'ℹ️' });
  }
};

export default showToast;
