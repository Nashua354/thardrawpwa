'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { Field } from '@/lib/schema';

interface TextFieldProps {
    field: Field;
    register: UseFormRegister<any>;
    error?: FieldError;
}

export default function TextField({ field, register, error }: TextFieldProps) {
    const isTextArea = field.type === 'textarea';
    const Component = isTextArea ? 'textarea' : 'input';

    return (
        <div className="space-y-2">
            {field.label && (
                <label htmlFor={field.id} className="block text-sm font-medium text-sand">
                    {field.label}
                    {field.required && <span className="text-accent-red ml-1">*</span>}
                </label>
            )}

            <Component
                id={field.id}
                type={isTextArea ? undefined : field.type}
                placeholder={field.placeholder}
                rows={isTextArea ? 4 : undefined}
                {...register(field.id, {
                    required: field.required ? `${field.label || field.id} is required` : false,
                    pattern: field.regex ? {
                        value: new RegExp(field.regex),
                        message: `Invalid ${field.label || field.id} format`
                    } : undefined,
                    minLength: typeof field.min === 'number' ? {
                        value: field.min,
                        message: `Minimum ${field.min} characters required`
                    } : undefined,
                    maxLength: typeof field.max === 'number' ? {
                        value: field.max,
                        message: `Maximum ${field.max} characters allowed`
                    } : undefined,
                })}
                className={`
          w-full px-4 py-3 bg-charcoal/30 border rounded-xl text-off-white placeholder-sand/50 
          focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand transition-colors
          ${error ? 'border-accent-red/50' : 'border-sand/30'}
          ${isTextArea ? 'resize-vertical min-h-[100px]' : ''}
        `}
            />

            {field.hint && (
                <p className="text-xs text-sand/60">{field.hint}</p>
            )}

            {error && (
                <p className="text-xs text-accent-red">{error.message}</p>
            )}
        </div>
    );
}
