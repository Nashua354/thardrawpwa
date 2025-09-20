'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import AppShell from '@/components/AppShell';
import StepBar from '@/components/StepBar';
import { buildEmbedUrl } from '@/lib/typeform';

function FormContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const uid = searchParams.get('uid');
    const seed = searchParams.get('seed');

    if (!uid || !seed) {
        router.push('/');
        return null;
    }

    const typeformUrl = buildEmbedUrl(uid, seed);

    const handleSimulateSubmit = () => {
        router.push(`/ticket-created?seed=${seed}&uid=${uid}`);
    };

    return (
        <AppShell showBackButton title="Entry Form">
            <div className="space-y-6">
                {/* Step Bar */}
                <StepBar currentStep={1} />

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-off-white">Entry Form</h1>
                    <p className="text-sand/80">Help us with a few details. Takes about a minute.</p>
                </div>

                {/* Typeform Embed Container */}
                <div className="bg-sand/5 rounded-2xl p-1 border border-sand/20 shadow-lg">
                    <div className="bg-off-white rounded-xl overflow-hidden" style={{ height: '500px' }}>
                        <iframe
                            src={typeformUrl}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            marginHeight={0}
                            marginWidth={0}
                            title="Entry Form"
                            className="rounded-xl"
                        />
                    </div>
                </div>

                {/* Development Helper */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="fixed bottom-4 right-4">
                        <button
                            onClick={handleSimulateSubmit}
                            className="bg-accent-red/80 text-off-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:bg-accent-red transition-colors backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-red/50"
                        >
                            🧪 Simulate Submit
                        </button>
                    </div>
                )}

                {/* Note */}
                <p className="text-xs text-sand/60 text-center">
                    Note: This demo simulates the payment step. In production, your payment would be securely processed.
                </p>
            </div>
        </AppShell>
    );
}

export default function FormPage() {
    return (
        <Suspense fallback={
            <AppShell showBackButton title="Entry Form">
                <div className="flex items-center justify-center h-64">
                    <div className="text-sand">Loading form...</div>
                </div>
            </AppShell>
        }>
            <FormContent />
        </Suspense>
    );
}
