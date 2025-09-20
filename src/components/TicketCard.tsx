'use client';

import { Ticket, PaymentStatus } from '@/lib/db';
import { ClipboardDocumentIcon, ShareIcon } from '@heroicons/react/24/outline';
import { copyToClipboard } from '@/lib/toast';

interface TicketCardProps {
    ticket: Ticket;
    onShare?: () => void;
}

function getStatusConfig(status: PaymentStatus) {
    switch (status) {
        case 'success':
            return {
                label: 'Payment received ✅',
                className: 'bg-green-600/15 text-green-400 border-green-500/30'
            };
        case 'pending':
            return {
                label: 'Payment pending',
                className: 'bg-yellow-600/15 text-yellow-400 border-yellow-500/30'
            };
        case 'failed':
            return {
                label: 'Payment failed',
                className: 'bg-red-600/15 text-red-400 border-red-500/30'
            };
    }
}

export default function TicketCard({ ticket, onShare }: TicketCardProps) {
    const statusConfig = getStatusConfig(ticket.paymentStatus);
    const createdDate = new Date(ticket.createdAt).toLocaleString();

    const handleCopyTicketId = () => {
        copyToClipboard(ticket.ticketId, 'Ticket ID copied');
    };

    return (
        <div className="bg-charcoal/50 border border-sand/20 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            {/* Status Badge */}
            <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.className}`}>
                    {statusConfig.label}
                </span>

                {onShare && (
                    <button
                        onClick={onShare}
                        className="p-2 text-sand hover:text-off-white transition-colors rounded-lg hover:bg-sand/10 focus:outline-none focus:ring-2 focus:ring-sand/50"
                        aria-label="Share ticket"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Ticket Info */}
            <div className="space-y-4">
                <div>
                    <label className="text-sm text-sand/70 font-medium">Ticket ID</label>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-off-white font-mono text-lg font-bold">
                            {ticket.ticketId}
                        </span>
                        <button
                            onClick={handleCopyTicketId}
                            className="p-1 text-sand/60 hover:text-sand transition-colors rounded focus:outline-none focus:ring-2 focus:ring-sand/50"
                            aria-label="Copy ticket ID"
                        >
                            <ClipboardDocumentIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="text-sm text-sand/70 font-medium">Created</label>
                    <div className="text-off-white mt-1">
                        {createdDate}
                    </div>
                </div>

                <div>
                    <label className="text-sm text-sand/70 font-medium">Payment Reference</label>
                    <div className="text-off-white mt-1 font-mono">
                        {ticket.paymentRef || '—'}
                    </div>
                </div>

                {ticket.formData && (
                    <div>
                        <label className="text-sm text-sand/70 font-medium">Entry Details</label>
                        <div className="mt-1 text-sm text-off-white/80">
                            {ticket.formData.full_name && (
                                <div>Name: {ticket.formData.full_name}</div>
                            )}
                            {ticket.formData.email && (
                                <div>Email: {ticket.formData.email}</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
