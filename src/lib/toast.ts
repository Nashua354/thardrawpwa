import toast from 'react-hot-toast';

// Custom toast styles matching our theme
const toastOptions = {
    duration: 4000,
    style: {
        background: '#111111',
        color: '#F7F4EF',
        border: '1px solid #D2B48C',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: '500',
    },
    success: {
        iconTheme: {
            primary: '#22C55E',
            secondary: '#111111',
        },
    },
    error: {
        iconTheme: {
            primary: '#B22222',
            secondary: '#111111',
        },
    },
};

export const showToast = {
    success: (message: string) => toast.success(message, toastOptions),
    error: (message: string) => toast.error(message, toastOptions),
    loading: (message: string) => toast.loading(message, toastOptions),
    dismiss: () => toast.dismiss(),
};

// Utility for copying text to clipboard with toast feedback
export async function copyToClipboard(text: string, successMessage?: string) {
    try {
        await navigator.clipboard.writeText(text);
        showToast.success(successMessage || 'Copied to clipboard');
    } catch (error) {
        console.error('Failed to copy:', error);
        showToast.error('Failed to copy');
    }
}
