import { z } from 'zod';

// Field Types
export type FieldType =
    | 'text'
    | 'textarea'
    | 'email'
    | 'phone'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'radio'
    | 'checkbox'
    | 'date'
    | 'file'
    | 'info'
    | 'divider'
    | 'hidden';

// Field Schema
export const FieldSchema = z.object({
    id: z.string(),
    type: z.enum(['text', 'textarea', 'email', 'phone', 'number', 'select', 'multiselect', 'radio', 'checkbox', 'date', 'file', 'info', 'divider', 'hidden']),
    label: z.string().optional(),
    required: z.boolean().optional(),
    placeholder: z.string().optional(),
    hint: z.string().optional(),
    options: z.array(z.object({
        value: z.string(),
        label: z.string()
    })).optional(),
    regex: z.string().optional(),
    min: z.union([z.number(), z.string()]).optional(),
    max: z.union([z.number(), z.string()]).optional(),
    showWhen: z.string().optional(), // Simple expression like "agree == true"
    defaultValue: z.any().optional(),
});

export type Field = z.infer<typeof FieldSchema>;

// Action Types
export const ActionSchema = z.object({
    type: z.enum(['navigate', 'localStore', 'webhook', 'whatsapp']),
    to: z.string().optional(), // for navigate
    key: z.string().optional(), // for localStore
    url: z.string().optional(), // for webhook
    method: z.enum(['GET', 'POST', 'PUT']).optional(), // for webhook
    whatsappTo: z.string().optional(), // for whatsapp - recipient number
    whatsappFrom: z.string().optional(), // for whatsapp - sender number
    whatsappTemplate: z.string().optional(), // for whatsapp - message template
});

export type Action = z.infer<typeof ActionSchema>;

// Form Schema
export const FormSchema = z.object({
    version: z.string(),
    title: z.string(),
    description: z.string().optional(),
    hidden: z.object({
        inject: z.array(z.string())
    }).optional(),
    layout: z.object({
        columns: z.number().optional()
    }).optional(),
    fields: z.array(FieldSchema),
    afterSubmit: z.object({
        actions: z.array(ActionSchema)
    }).optional(),
});

export type FormSchema = z.infer<typeof FormSchema>;

// Default Example Schema
export const DEFAULT_FORM_SCHEMA: FormSchema = {
    version: "2.0",
    title: "Lucky Draw Entry",
    description: "Enter your details for the lucky draw",
    hidden: {
        inject: ["user_id", "ticket_seed", "source"]
    },
    layout: {
        columns: 1
    },
    fields: [
        {
            id: "full_name",
            type: "text",
            label: "Full Name",
            required: true,
            placeholder: "Enter your full name",
            hint: "Your legal name as it appears on official documents"
        },
        {
            id: "phone",
            type: "phone",
            label: "Phone Number",
            required: true,
            placeholder: "+91 98765 43210",
            hint: "10-digit mobile number for verification"
        },
        {
            id: "reference_phone",
            type: "phone",
            label: "Reference Mobile Number",
            required: false,
            placeholder: "+91 98765 43210",
            hint: "Optional - Alternative contact number"
        },
        {
            id: "email",
            type: "email",
            label: "Email Address",
            required: false,
            placeholder: "your.email@example.com",
            hint: "Optional - We'll send updates if provided"
        },
        {
            id: "selfie",
            type: "file",
            label: "Upload Selfie",
            required: true,
            hint: "Please upload a clear selfie for verification"
        },
        {
            id: "has_car",
            type: "radio",
            label: "Do you have a car?",
            required: true,
            options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" }
            ],
            hint: "Select whether you currently own a car"
        },
        {
            id: "page_break_1",
            type: "divider"
        },
        {
            id: "income_info",
            type: "info",
            label: "Income Information",
            hint: "This information helps us understand our audience better and is kept confidential."
        },
        {
            id: "income_bracket",
            type: "radio",
            label: "Annual Income Bracket",
            required: true,
            options: [
                { value: "below_5", label: "Below ₹5 LPA" },
                { value: "5_to_10", label: "₹5 LPA - ₹10 LPA" },
                { value: "10_to_20", label: "₹10 LPA - ₹20 LPA" },
                { value: "20_to_30", label: "₹20 LPA - ₹30 LPA" },
                { value: "30_to_40", label: "₹30 LPA - ₹40 LPA" },
                { value: "40_to_50", label: "₹40 LPA - ₹50 LPA" },
                { value: "above_50", label: "₹50 LPA+" }
            ],
            hint: "Select your current annual income range"
        },
        {
            id: "marketing_consent",
            type: "checkbox",
            label: "I consent to receive marketing communications",
            required: false,
            hint: "Optional - You can unsubscribe anytime"
        }
    ],
    afterSubmit: {
        actions: [
            {
                type: "localStore",
                key: "form_submission"
            },
            {
                type: "navigate",
                to: "/ticket-created"
            }
        ]
    }
};

// Validation Schema Generator
export function generateZodSchema(fields: Field[]): z.ZodObject<any> {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    fields.forEach(field => {
        if (field.type === 'hidden' || field.type === 'info' || field.type === 'divider') {
            return;
        }

        let fieldSchema: z.ZodTypeAny;

        switch (field.type) {
            case 'email':
                fieldSchema = z.string().email('Invalid email address');
                break;
            case 'phone':
                fieldSchema = z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number');
                break;
            case 'number':
                fieldSchema = z.coerce.number();
                if (field.min !== undefined) {
                    fieldSchema = (fieldSchema as z.ZodNumber).min(Number(field.min));
                }
                if (field.max !== undefined) {
                    fieldSchema = (fieldSchema as z.ZodNumber).max(Number(field.max));
                }
                break;
            case 'date':
                fieldSchema = z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date');
                break;
            case 'multiselect':
                fieldSchema = z.array(z.string());
                break;
            case 'checkbox':
                fieldSchema = z.boolean();
                break;
            case 'file':
                fieldSchema = z.any().refine((file) => {
                    if (!field.required) return true;
                    return file instanceof File || (typeof file === 'string' && file.length > 0);
                }, 'File is required');
                break;
            default:
                fieldSchema = z.string();
                if (field.regex) {
                    fieldSchema = (fieldSchema as z.ZodString).regex(new RegExp(field.regex));
                }
                if (field.min !== undefined && typeof field.min === 'number') {
                    fieldSchema = (fieldSchema as z.ZodString).min(field.min);
                }
                if (field.max !== undefined && typeof field.max === 'number') {
                    fieldSchema = (fieldSchema as z.ZodString).max(field.max);
                }
        }

        if (!field.required) {
            fieldSchema = fieldSchema.optional();
        }

        schemaFields[field.id] = fieldSchema;
    });

    return z.object(schemaFields);
}
