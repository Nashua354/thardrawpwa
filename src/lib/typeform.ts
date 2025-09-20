/**
 * Build Typeform embed URL with hidden fields
 */
export function buildEmbedUrl(
    userId: string,
    seed: string,
    source: string = 'web'
): string {
    const baseUrl = 'https://form.typeform.com/to/vKRiD5Hy';
    const params = new URLSearchParams({
        'hidden': `user_id=${userId}&ticket_seed=${seed}&source=${source}`
    });

    return `${baseUrl}?${params.toString()}`;
}

/**
 * Parse query parameters from Typeform redirect
 */
export function parseTypeformRedirect(searchParams: URLSearchParams) {
    return {
        seed: searchParams.get('seed'),
        uid: searchParams.get('uid'),
        source: searchParams.get('source') || 'web'
    };
}
