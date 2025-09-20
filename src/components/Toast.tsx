'use client';

import { Toaster } from 'react-hot-toast';

export default function Toast() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
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
            }}
        />
    );
}
