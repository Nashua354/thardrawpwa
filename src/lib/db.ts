import { uuid, ticketId } from './ids';

export type PaymentStatus = 'pending' | 'success' | 'failed';

export interface Ticket {
    id: string;
    ticketId: string;
    userId: string;
    seed: string;
    createdAt: string;
    paymentStatus: PaymentStatus;
    paymentRef?: string;
}

const STORAGE_KEYS = {
    userId: 'thardraw:userId',
    tickets: 'thardraw:tickets',
} as const;

/**
 * Get or create a persistent user ID
 */
export function getUserId(): string {
    if (typeof window === 'undefined') return uuid();

    let userId = localStorage.getItem(STORAGE_KEYS.userId);
    if (!userId) {
        userId = uuid();
        localStorage.setItem(STORAGE_KEYS.userId, userId);
    }
    return userId;
}

/**
 * Get all tickets for the current user
 */
export function getTickets(): Ticket[] {
    if (typeof window === 'undefined') return [];

    try {
        const tickets = localStorage.getItem(STORAGE_KEYS.tickets);
        return tickets ? JSON.parse(tickets) : [];
    } catch {
        return [];
    }
}

/**
 * Get the active (most recent) ticket for the current user
 */
export function getActiveTicket(): Ticket | null {
    const tickets = getTickets();
    const userId = getUserId();

    const userTickets = tickets
        .filter(ticket => ticket.userId === userId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return userTickets[0] || null;
}

/**
 * Create a new ticket
 */
export function createTicket(data: { seed: string }): Ticket {
    const userId = getUserId();
    const ticket: Ticket = {
        id: uuid(),
        ticketId: ticketId(),
        userId,
        seed: data.seed,
        createdAt: new Date().toISOString(),
        paymentStatus: 'pending',
    };

    if (typeof window !== 'undefined') {
        const tickets = getTickets();
        tickets.push(ticket);
        localStorage.setItem(STORAGE_KEYS.tickets, JSON.stringify(tickets));
    }

    return ticket;
}

/**
 * Update payment status for a ticket
 */
export function markPayment(
    status: PaymentStatus,
    paymentRef?: string
): Ticket | null {
    if (typeof window === 'undefined') return null;

    const tickets = getTickets();
    const activeTicket = getActiveTicket();

    if (!activeTicket) return null;

    const updatedTickets = tickets.map(ticket =>
        ticket.id === activeTicket.id
            ? { ...ticket, paymentStatus: status, paymentRef }
            : ticket
    );

    localStorage.setItem(STORAGE_KEYS.tickets, JSON.stringify(updatedTickets));

    return updatedTickets.find(ticket => ticket.id === activeTicket.id) || null;
}

/**
 * Get ticket by ID
 */
export function getTicketById(ticketId: string): Ticket | null {
    const tickets = getTickets();
    return tickets.find(ticket => ticket.ticketId === ticketId) || null;
}
