'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { markPayment } from '@/lib/db';
import { shortId } from '@/lib/ids';
import { showToast } from '@/lib/toast';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }: CheckoutModalProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSuccess = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        const paymentRef = `pay_demo_${shortId()}`;
        markPayment('success', paymentRef);

        setIsProcessing(false);
        showToast.success('Payment successful!');
        onSuccess();
    };

    const handleFailure = async () => {
        setIsProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 1500));

        markPayment('failed');

        setIsProcessing(false);
        showToast.error('Payment failed — try again.');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-charcoal border border-sand/20 rounded-t-2xl sm:rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-sand/20">
                    <h2 className="text-xl font-bold text-off-white">Secure Checkout</h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-sand hover:text-off-white transition-colors rounded-lg hover:bg-sand/10 focus:outline-none focus:ring-2 focus:ring-sand/50"
                        disabled={isProcessing}
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Order Summary */}
                    <div className="bg-sand/5 rounded-xl p-4 border border-sand/10">
                        <h3 className="font-semibold text-off-white mb-3">Order Summary</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-sand">Lucky Draw Entry</span>
                            <span className="text-off-white font-bold">₹499</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-sand/20">
                            <span className="font-semibold text-off-white">Total Due</span>
                            <span className="text-xl font-bold text-accent-red">₹499</span>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-sand mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-charcoal/50 border border-sand/30 rounded-xl text-off-white placeholder-sand/50 focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand"
                                placeholder="Enter your full name"
                                disabled={isProcessing}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-sand mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-charcoal/50 border border-sand/30 rounded-xl text-off-white placeholder-sand/50 focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand"
                                placeholder="Enter your email"
                                disabled={isProcessing}
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-sand mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-charcoal/50 border border-sand/30 rounded-xl text-off-white placeholder-sand/50 focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand"
                                placeholder="Enter your phone number"
                                disabled={isProcessing}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleSuccess}
                            disabled={isProcessing}
                            className="w-full bg-sand text-charcoal font-bold py-4 rounded-2xl hover:bg-sand/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sand/50"
                        >
                            {isProcessing ? 'Processing...' : 'Simulate Success'}
                        </button>

                        <button
                            onClick={handleFailure}
                            disabled={isProcessing}
                            className="w-full bg-transparent border-2 border-accent-red/30 text-accent-red font-semibold py-3 rounded-2xl hover:bg-accent-red/10 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent-red/50"
                        >
                            {isProcessing ? 'Processing...' : 'Simulate Failure'}
                        </button>
                    </div>

                    {/* Demo Notice */}
                    <p className="text-xs text-sand/60 text-center">
                        Demo only. Payments are simulated.
                    </p>
                </div>
            </div>
        </div>
    );
}
