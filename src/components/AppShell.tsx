'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface AppShellProps {
    children: React.ReactNode;
    showBackButton?: boolean;
    title?: string;
}

export default function AppShell({
    children,
    showBackButton = false,
    title = 'THAR DRAW'
}: AppShellProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-charcoal text-off-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-charcoal/80 backdrop-blur-md border-b border-sand/20">
                <div className="safe-area-inset-top">
                    <div className="flex items-center justify-between px-4 py-3">
                        {showBackButton ? (
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 text-sand hover:text-off-white transition-colors focus:outline-none focus:ring-2 focus:ring-sand/50 rounded-lg p-1"
                                aria-label="Go back"
                            >
                                <ArrowLeftIcon className="w-6 h-6" />
                            </button>
                        ) : (
                            <div className="w-8" />
                        )}

                        <h1 className="text-lg font-bold tracking-tight text-center">
                            {title}
                        </h1>

                        <div className="w-8" />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <div className="container mx-auto max-w-md px-4 py-6 safe-area-inset-bottom">
                    {children}
                </div>
            </main>
        </div>
    );
}
