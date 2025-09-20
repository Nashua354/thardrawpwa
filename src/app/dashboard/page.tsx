'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import StepBar from '@/components/StepBar';
import TicketCard from '@/components/TicketCard';
import { getActiveTicket, type Ticket } from '@/lib/db';
import { showToast } from '@/lib/toast';

export default function DashboardPage() {
    const router = useRouter();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const activeTicket = getActiveTicket();
        if (!activeTicket) {
            router.push('/');
            return;
        }

        setTicket(activeTicket);
        setIsLoading(false);
    }, [router]);

    const handleShare = async () => {
        if (!ticket) return;

        const shareData = {
            title: 'Thar Draw - My Entry',
            text: `I've entered the Thar Draw! My ticket ID: ${ticket.ticketId}`,
            url: window.location.origin,
        };

        try {
            if (navigator.share && navigator.canShare?.(shareData)) {
                await navigator.share(shareData);
            } else {
                // Fallback to copying link
                await navigator.clipboard.writeText(
                    `${shareData.text}\n\nJoin here: ${shareData.url}`
                );
                showToast.success('Link copied to clipboard');
            }
        } catch (error) {
            console.error('Error sharing:', error);
            showToast.error('Failed to share');
        }
    };

    const getStatusMessage = () => {
        if (!ticket) return '';

        switch (ticket.paymentStatus) {
            case 'success':
                return 'Thanks! Your entry is confirmed.';
            case 'pending':
                return 'Complete your payment to confirm your entry.';
            case 'failed':
                return 'Payment failed. Please try again to confirm your entry.';
        }
    };

    const getActionButton = () => {
        if (!ticket) return null;

        switch (ticket.paymentStatus) {
            case 'pending':
                return (
                    <button
                        onClick={() => router.push('/checkout')}
                        className="w-full bg-sand text-charcoal font-bold py-4 rounded-2xl hover:bg-sand/90 active:scale-95 transition-all duration-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sand/50"
                    >
                        Complete Payment
                    </button>
                );
            case 'failed':
                return (
                    <button
                        onClick={() => router.push('/checkout')}
                        className="w-full bg-accent-red text-off-white font-bold py-4 rounded-2xl hover:bg-accent-red/90 active:scale-95 transition-all duration-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-red/50"
                    >
                        Retry Payment
                    </button>
                );
            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <AppShell title="Your Ticket">
                <div className="flex items-center justify-center h-64">
                    <div className="text-sand">Loading your ticket...</div>
                </div>
            </AppShell>
        );
    }

    if (!ticket) {
        return (
            <AppShell title="Your Ticket">
                <div className="text-center space-y-4">
                    <p className="text-accent-red">No ticket found</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-sand text-charcoal px-6 py-3 rounded-2xl font-medium"
                    >
                        Enter Lucky Draw
                    </button>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell title="Your Ticket">
            <div className="space-y-8">
                {/* Step Bar */}
                <StepBar currentStep={4} />

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-off-white">Your Ticket</h1>
                    <p className="text-sand/80">{getStatusMessage()}</p>
                </div>

                {/* Ticket Card */}
                <TicketCard ticket={ticket} onShare={handleShare} />

                {/* Action Button */}
                <div className="space-y-4">
                    {getActionButton()}
                </div>

                {/* Support Link */}
                <div className="text-center">
                    <a
                        href="mailto:hello@thardraw.example"
                        className="text-sand/70 hover:text-sand text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sand/50 rounded inline-block"
                    >
                        Contact support
                    </a>
                </div>

                {/* Legal Notice */}
                <div className="bg-sand/5 border border-sand/10 rounded-xl p-4">
                    <p className="text-xs text-sand/70 leading-relaxed text-center">
                        This is a demo experience. Payments are simulated.{' '}
                        <Link
                            href="/terms"
                            className="text-sand hover:text-off-white transition-colors"
                        >
                            See Terms
                        </Link>
                        {' '}for contest details.
                    </p>
                </div>
            </div>
        </AppShell>
    );
}
