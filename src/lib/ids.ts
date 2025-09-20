import { nanoid } from 'nanoid';

/**
 * Generate a unique ticket ID in format: TCK-YYYY-XXXXX
 */
export function ticketId(): string {
    const year = new Date().getFullYear();
    const id = nanoid(5).toUpperCase();
    return `TCK-${year}-${id}`;
}

/**
 * Generate a UUID using nanoid
 */
export function uuid(): string {
    return nanoid();
}

/**
 * Generate a short ID for various purposes
 */
export function shortId(length: number = 8): string {
    return nanoid(length);
}
