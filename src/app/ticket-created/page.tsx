'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import AppShell from '@/components/AppShell';
import StepBar from '@/components/StepBar';
import { getActiveTicket, type Ticket } from '@/lib/db';

function ConfettiDot({ delay }: { delay: number }) {
    return (
        <div
            className="absolute w-2 h-2 bg-sand rounded-full opacity-60 animate-confetti"
            style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${delay}ms`,
            }}
        />
    );
}

function TicketCreatedContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [ticket, setTicket] = useState<Ticket | null>(null);

    useEffect(() => {
        const activeTicket = getActiveTicket();
        if (activeTicket) {
            setTicket(activeTicket);
        } else {
            router.push('/');
        }
    }, [router]);

    if (!ticket) {
        return (
            <AppShell showBackButton title="Loading...">
                <div className="flex items-center justify-center h-64">
                    <div className="text-sand">Loading ticket...</div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell showBackButton title="Ticket Created">
            <div className="space-y-8">
                <StepBar currentStep={2} />

                {/* Confetti Animation */}
                <div className="relative overflow-hidden h-0">
                    {[...Array(12)].map((_, i) => (
                        <ConfettiDot key={i} delay={i * 200} />
                    ))}
                </div>

                <div className="text-center space-y-3">
                    <h1 className="text-3xl font-bold text-off-white">Ticket created!</h1>
                    <p className="text-sand/80 text-lg">
                        Your entry is secured. Keep your Ticket ID safe.
                    </p>
                </div>

                <div className="bg-gradient-to-br from-sand/10 to-olive/10 border border-sand/30 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                    <div className="text-center space-y-4">
                        <div>
                            <label className="text-sm text-sand/70 font-medium block mb-2">
                                Your Ticket ID
                            </label>
                            <div className="text-2xl font-bold text-off-white font-mono tracking-wide">
                                {ticket.ticketId}
                            </div>
                        </div>

                        <div className="text-sm text-sand/60">
                            Created: {new Date(ticket.createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-sand text-charcoal font-bold py-4 rounded-2xl hover:bg-sand/90 active:scale-95 transition-all duration-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sand/50"
                >
                    Proceed to Payment
                </button>
            </div>
        </AppShell>
    );
}

export default function TicketCreatedPage() {
    return (
        <Suspense fallback={
            <AppShell showBackButton title="Creating Ticket...">
                <div className="flex items-center justify-center h-64">
                    <div className="text-sand">Creating your ticket...</div>
                </div>
            </AppShell>
        }>
            <TicketCreatedContent />
        </Suspense>
    );
}
