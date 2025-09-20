import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                charcoal: '#111111',
                sand: '#D2B48C',
                'off-white': '#F7F4EF',
                'accent-red': '#B22222',
                olive: '#6B775A',
            },
            fontFamily: {
                sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'confetti': 'confetti 2s ease-out infinite',
                'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-4px)' },
                },
                confetti: {
                    '0%': { transform: 'translateY(0px) rotate(0deg)', opacity: '1' },
                    '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
            },
            spacing: {
                'safe-area-inset-top': 'env(safe-area-inset-top)',
                'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
                'safe-area-inset-left': 'env(safe-area-inset-left)',
                'safe-area-inset-right': 'env(safe-area-inset-right)',
            },
        },
    },
    plugins: [],
}

export default config
