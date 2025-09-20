import { FormSchema, DEFAULT_FORM_SCHEMA } from './schema';

const STORAGE_KEYS = {
    publishedSchema: 'thardraw:schema:published',
    draftSchema: 'thardraw:schema:draft',
    formSubmission: 'thardraw:form_submission',
} as const;

/**
 * Load published schema from localStorage or URL
 */
export async function loadPublishedSchema(): Promise<FormSchema> {
    // Try to fetch from URL if configured
    const schemaUrl = process.env.NEXT_PUBLIC_SCHEMA_URL;
    if (schemaUrl) {
        try {
            const response = await fetch(schemaUrl);
            if (response.ok) {
                const schema = await response.json();
                return schema as FormSchema;
            }
        } catch (error) {
            console.warn('Failed to fetch schema from URL, falling back to localStorage:', error);
        }
    }

    // Fall back to localStorage
    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.publishedSchema);
            if (stored) {
                return JSON.parse(stored) as FormSchema;
            }
        } catch (error) {
            console.warn('Failed to parse stored schema:', error);
        }
    }

    // Final fallback to default schema
    return DEFAULT_FORM_SCHEMA;
}

/**
 * Save published schema to localStorage
 */
export function savePublishedSchema(schema: FormSchema): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEYS.publishedSchema, JSON.stringify(schema, null, 2));
    } catch (error) {
        console.error('Failed to save published schema:', error);
        throw new Error('Failed to save schema to localStorage');
    }
}

/**
 * Load draft schema from localStorage
 */
export function loadDraftSchema(): FormSchema | null {
    if (typeof window === 'undefined') return null;

    try {
        const stored = localStorage.getItem(STORAGE_KEYS.draftSchema);
        if (stored) {
            return JSON.parse(stored) as FormSchema;
        }
    } catch (error) {
        console.warn('Failed to parse draft schema:', error);
    }

    return null;
}

/**
 * Save draft schema to localStorage
 */
export function saveDraftSchema(schema: FormSchema): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEYS.draftSchema, JSON.stringify(schema, null, 2));
    } catch (error) {
        console.error('Failed to save draft schema:', error);
        throw new Error('Failed to save draft schema to localStorage');
    }
}

/**
 * Store form submission data
 */
export function storeFormSubmission(data: Record<string, any>): void {
    if (typeof window === 'undefined') return;

    try {
        const submissions = getFormSubmissions();
        submissions.push({
            ...data,
            submittedAt: new Date().toISOString(),
        });

        localStorage.setItem(STORAGE_KEYS.formSubmission, JSON.stringify(submissions));
    } catch (error) {
        console.error('Failed to store form submission:', error);
    }
}

/**
 * Get all form submissions
 */
export function getFormSubmissions(): any[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEYS.formSubmission);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.warn('Failed to parse form submissions:', error);
        return [];
    }
}

/**
 * Clear all stored data (for testing/reset)
 */
export function clearAllStoredData(): void {
    if (typeof window === 'undefined') return;

    Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
}

/**
 * Check if local storage is available and has space
 */
export function checkStorageAvailability(): { available: boolean; error?: string } {
    if (typeof window === 'undefined') {
        return { available: false, error: 'Not in browser environment' };
    }

    try {
        const testKey = 'thardraw:test';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return { available: true };
    } catch (error) {
        return {
            available: false,
            error: error instanceof Error ? error.message : 'Storage not available'
        };
    }
}
