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

    useEffect(() => {
        const activeTicket = getActiveTicket();
        if (!activeTicket) {
            router.push('/');
            return;
        }

        if (activeTicket.paymentStatus === 'success') {
            router.push('/dashboard');
            return;
        }

        setTicket(activeTicket);
    }, [router]);

    const handlePaymentSuccess = () => {
        setIsModalOpen(false);
        router.push('/dashboard');
    };

    if (!ticket) {
        return (
            <AppShell showBackButton title="Checkout">
                <div className="flex items-center justify-center h-64">
                    <div className="text-sand">Loading checkout...</div>
                </div>
            </AppShell>
        );
    }

    const amount = Number(process.env.NEXT_PUBLIC_PRICE) || 499;

    return (
        <AppShell showBackButton title="Checkout">
            <div className="space-y-8">
                <StepBar currentStep={3} />

                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold text-off-white">Checkout</h1>
                    <p className="text-sand/80">Complete your entry payment</p>
                </div>

                <div className="bg-charcoal/50 border border-sand/20 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
                    <h2 className="text-lg font-semibold text-off-white mb-4">Order Summary</h2>

                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-off-white font-medium">Lucky Draw Entry</h3>
                                <p className="text-sand/70 text-sm">Ticket ID: {ticket.ticketId}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-off-white">₹{amount}</div>
                                <div className="text-sand/70 text-sm">Qty: 1</div>
                            </div>
                        </div>

                        <div className="border-t border-sand/20"></div>

                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold text-off-white">Total</span>
                            <span className="text-2xl font-bold text-accent-red">₹{amount}</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-sand text-charcoal font-bold py-4 rounded-2xl hover:bg-sand/90 active:scale-95 transition-all duration-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sand/50"
                >
                    Pay ₹{amount}
                </button>

                <p className="text-xs text-sand/60 text-center leading-relaxed">
                    Demo only. Payments are simulated.
                </p>
            </div>

            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handlePaymentSuccess}
                amount={amount}
            />
        </AppShell>
    );
}
