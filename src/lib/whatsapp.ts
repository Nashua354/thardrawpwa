/**
 * WhatsApp integration utilities
 */

export interface WhatsAppMessage {
    to: string;
    from: string;
    message: string;
    formData?: Record<string, any>;
    ticketId?: string;
}

/**
 * Send WhatsApp message using web.whatsapp.com URL scheme
 * This opens WhatsApp Web/App with pre-filled message
 */
export function sendWhatsAppMessage({ to, message }: Pick<WhatsAppMessage, 'to' | 'message'>) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${to}?text=${encodedMessage}`;

    // Open in new window/tab
    window.open(whatsappUrl, '_blank');
}

/**
 * Generate confirmation message template
 */
export function generateConfirmationMessage(data: {
    ticketId: string;
    fullName: string;
    phone: string;
    email?: string;
    referencePhone?: string;
    hasCar: string;
    incomeBracket: string;
    paymentRef?: string;
}): string {
    const {
        ticketId,
        fullName,
        phone,
        email,
        referencePhone,
        hasCar,
        incomeBracket,
        paymentRef
    } = data;

    let message = `🎉 *THAR DRAW - ENTRY CONFIRMATION*\n\n`;
    message += `✅ *Entry Confirmed*\n`;
    message += `🎫 *Ticket ID:* ${ticketId}\n\n`;

    message += `👤 *Participant Details:*\n`;
    message += `• Name: ${fullName}\n`;
    message += `• Phone: ${phone}\n`;

    if (email) {
        message += `• Email: ${email}\n`;
    }

    if (referencePhone) {
        message += `• Reference Phone: ${referencePhone}\n`;
    }

    message += `• Has Car: ${hasCar === 'yes' ? 'Yes' : 'No'}\n`;
    message += `• Income Bracket: ${formatIncomeBracket(incomeBracket)}\n\n`;

    if (paymentRef) {
        message += `💳 *Payment Details:*\n`;
        message += `• Payment Ref: ${paymentRef}\n`;
        message += `• Amount: ₹499\n`;
        message += `• Status: Confirmed\n\n`;
    }

    message += `📅 *Entry Time:* ${new Date().toLocaleString('en-IN')}\n\n`;
    message += `🔥 *Next Steps:*\n`;
    message += `• Keep your ticket ID safe\n`;
    message += `• Winner announcement on social media\n`;
    message += `• Good luck! 🍀\n\n`;
    message += `_This is an automated confirmation message._`;

    return message;
}

/**
 * Format income bracket for display
 */
function formatIncomeBracket(bracket: string): string {
    const brackets: Record<string, string> = {
        'below_5': 'Below ₹5 LPA',
        '5_to_10': '₹5 LPA - ₹10 LPA',
        '10_to_20': '₹10 LPA - ₹20 LPA',
        '20_to_30': '₹20 LPA - ₹30 LPA',
        '30_to_40': '₹30 LPA - ₹40 LPA',
        '40_to_50': '₹40 LPA - ₹50 LPA',
        'above_50': '₹50 LPA+',
    };

    return brackets[bracket] || bracket;
}

/**
 * Trigger WhatsApp confirmation after payment
 * This is called after successful payment
 */
export function triggerWhatsAppConfirmation(
    formData: Record<string, any>,
    ticketId: string,
    paymentRef?: string
) {
    try {
        const message = generateConfirmationMessage({
            ticketId,
            fullName: formData.full_name || 'N/A',
            phone: formData.phone || 'N/A',
            email: formData.email,
            referencePhone: formData.reference_phone,
            hasCar: formData.has_car || 'N/A',
            incomeBracket: formData.income_bracket || 'N/A',
            paymentRef,
        });

        // Send to the specified WhatsApp number
        sendWhatsAppMessage({
            to: '919958212050', // Remove + and spaces
            message,
        });

        console.log('WhatsApp confirmation triggered:', {
            to: '919958212050',
            from: '918800668205',
            ticketId,
            paymentRef,
        });
    } catch (error) {
        console.error('Failed to trigger WhatsApp confirmation:', error);
    }
}
