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
    | 'info'
    | 'divider'
    | 'hidden';

// Field Schema
export const FieldSchema = z.object({
    id: z.string(),
    type: z.enum(['text', 'textarea', 'email', 'phone', 'number', 'select', 'multiselect', 'radio', 'checkbox', 'date', 'info', 'divider', 'hidden']),
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
    type: z.enum(['navigate', 'localStore', 'webhook']),
    to: z.string().optional(), // for navigate
    key: z.string().optional(), // for localStore
    url: z.string().optional(), // for webhook
    method: z.enum(['GET', 'POST', 'PUT']).optional(), // for webhook
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
    version: "1.0",
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
            hint: "Your legal name as it appears on ID"
        },
        {
            id: "email",
            type: "email",
            label: "Email Address",
            required: true,
            placeholder: "your.email@example.com",
            hint: "We'll send updates to this email"
        },
        {
            id: "phone",
            type: "phone",
            label: "Phone Number",
            required: true,
            placeholder: "+91 98765 43210",
            hint: "10-digit mobile number"
        },
        {
            id: "age",
            type: "number",
            label: "Age",
            required: true,
            min: 18,
            max: 100,
            hint: "Must be 18+ to participate"
        },
        {
            id: "city",
            type: "select",
            label: "City",
            required: true,
            options: [
                { value: "mumbai", label: "Mumbai" },
                { value: "delhi", label: "Delhi" },
                { value: "bangalore", label: "Bangalore" },
                { value: "chennai", label: "Chennai" },
                { value: "kolkata", label: "Kolkata" },
                { value: "hyderabad", label: "Hyderabad" },
                { value: "pune", label: "Pune" },
                { value: "ahmedabad", label: "Ahmedabad" },
                { value: "other", label: "Other" }
            ]
        },
        {
            id: "experience",
            type: "radio",
            label: "Driving Experience",
            required: true,
            options: [
                { value: "beginner", label: "Beginner (0-2 years)" },
                { value: "intermediate", label: "Intermediate (3-5 years)" },
                { value: "experienced", label: "Experienced (5+ years)" }
            ]
        },
        {
            id: "interests",
            type: "multiselect",
            label: "Interests",
            options: [
                { value: "off_road", label: "Off-road driving" },
                { value: "adventure", label: "Adventure sports" },
                { value: "travel", label: "Travel" },
                { value: "photography", label: "Photography" },
                { value: "camping", label: "Camping" }
            ]
        },
        {
            id: "newsletter",
            type: "checkbox",
            label: "Subscribe to newsletter",
            hint: "Get updates about future contests and offers"
        },
        {
            id: "terms",
            type: "checkbox",
            label: "I agree to the Terms & Conditions",
            required: true,
            showWhen: "newsletter != undefined"
        },
        {
            id: "info_note",
            type: "info",
            label: "Contest Information",
            hint: "Winner will be announced on social media. Entry fee is non-refundable."
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
