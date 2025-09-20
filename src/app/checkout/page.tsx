'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import StepBar from '@/components/StepBar';
import CheckoutModal from '@/components/CheckoutModal';
import { getActiveTicket, type Ticket } from '@/lib/db';

export default function CheckoutPage() {
    const router = useRouter();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const activeTicket = getActiveTicket();
        if (!activeTicket) {
            router.push('/');
            return;
        }

        // If already paid, redirect to dashboard
        if (activeTicket.paymentStatus === 'success') {
            router.push('/dashboard');
            return;
        }

        setTicket(activeTicket);
        setIsLoading(false);
    }, [router]);

    const handlePaymentSuccess = () => {
        setIsModalOpen(false);
        router.push('/dashboard');
    };

    if (isLoading) {
        return (
            <AppShell showBackButton title="Checkout">
                <div className="flex items-center justify-center h-64">
                    <div className="text-sand">Loading checkout...</div>
                </div>
            </AppShell>
        );
    }

    if (!ticket) {
        return (
            <AppShell showBackButton title="Checkout">
                <div className="text-center space-y-4">
                    <p className="text-accent-red">No ticket found</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-sand text-charcoal px-6 py-3 rounded-2xl font-medium"
                    >
                        Start Over
                    </button>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell showBackButton title="Checkout">
            <div className="space-y-8">
                {/* Step Bar */}
                <StepBar currentStep={3} />

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-off-white">Checkout</h1>
                    <p className="text-sand/80">Complete your entry payment</p>
                </div>

                {/* Order Summary */}
                <div className="bg-charcoal/50 border border-sand/20 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                    <h2 className="text-lg font-semibold text-off-white mb-4">Order Summary</h2>

                    <div className="space-y-4">
                        {/* Item */}
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-off-white font-medium">Lucky Draw Entry</h3>
                                <p className="text-sand/70 text-sm">Ticket ID: {ticket.ticketId}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-off-white">₹499</div>
                                <div className="text-sand/70 text-sm">Qty: 1</div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-sand/20"></div>

                        {/* Total */}
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-off-white">Total</span>
                            <span className="text-2xl font-bold text-accent-red">₹499</span>
                        </div>
                    </div>
                </div>

                {/* Payment Button */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-sand text-charcoal font-bold py-4 rounded-2xl hover:bg-sand/90 active:scale-95 transition-all duration-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sand/50"
                >
                    Pay ₹499
                </button>

                {/* Security Notice */}
                <div className="bg-olive/10 border border-olive/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        </div>
                        <div>
                            <h3 className="text-off-white font-medium text-sm">Secure Payment</h3>
                            <p className="text-sand/70 text-xs mt-1">
                                Your payment information is protected with industry-standard encryption.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Demo Notice */}
                <p className="text-xs text-sand/60 text-center leading-relaxed">
                    Demo only. Payments are simulated.
                </p>
            </div>

            {/* Checkout Modal */}
            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handlePaymentSuccess}
            />
        </AppShell>
    );
}
