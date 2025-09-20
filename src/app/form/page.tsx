'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import AppShell from '@/components/AppShell';
import StepBar from '@/components/StepBar';
import DynamicForm from '@/components/DynamicForm';
import { loadPublishedSchema } from '@/lib/storage';
import { FormSchema } from '@/lib/schema';
import { createTicket } from '@/lib/db';

function FormContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [schema, setSchema] = useState<FormSchema | null>(null);
    const [loading, setLoading] = useState(true);

    const uid = searchParams.get('uid');
    const seed = searchParams.get('seed');

    useEffect(() => {
        if (!uid || !seed) {
            router.push('/');
            return;
        }

        loadPublishedSchema()
            .then(setSchema)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [uid, seed, router]);

    const handleFormSubmit = (data: any) => {
        // Create ticket with form data
        createTicket({
            seed: seed!,
            formData: data
        });

        // Navigate to ticket created
        router.push(`/ticket-created?seed=${seed}&uid=${uid}`);
    };

    if (loading) {
        return (
            <AppShell showBackButton title="Loading Form...">
                <div className="flex items-center justify-center h-64">
                    <div className="text-sand animate-pulse">Loading form schema...</div>
                </div>
            </AppShell>
        );
    }

    if (!schema) {
        return (
            <AppShell showBackButton title="Form Error">
                <div className="text-center space-y-4">
                    <p className="text-accent-red">Failed to load form schema</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-sand text-charcoal px-6 py-3 rounded-2xl font-medium"
                    >
                        Go Back
                    </button>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell showBackButton title="Entry Form">
            <div className="space-y-6">
                {/* Step Bar */}
                <StepBar currentStep={1} />

                {/* Dynamic Form */}
                <DynamicForm
                    schema={schema}
                    onSubmit={handleFormSubmit}
                    hiddenFields={{
                        user_id: uid,
                        ticket_seed: seed,
                        source: 'web'
                    }}
                />
            </div>
        </AppShell>
    );
}

export default function FormPage() {
    return (
        <Suspense fallback={
            <AppShell showBackButton title="Entry Form">
                <div className="flex items-center justify-center h-64">
                    <div className="text-sand">Loading...</div>
                </div>
            </AppShell>
        }>
            <FormContent />
        </Suspense>
    );
}
