'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { Field } from '@/lib/schema';

interface DateFieldProps {
    field: Field;
    register: UseFormRegister<any>;
    error?: FieldError;
}

export default function DateField({ field, register, error }: DateFieldProps) {
    return (
        <div className="space-y-2">
            {field.label && (
                <label htmlFor={field.id} className="block text-sm font-medium text-sand">
                    {field.label}
                    {field.required && <span className="text-accent-red ml-1">*</span>}
                </label>
            )}

            <input
                id={field.id}
                type="date"
                {...register(field.id, {
                    required: field.required ? `${field.label || field.id} is required` : false,
                    min: typeof field.min === 'string' ? {
                        value: field.min,
                        message: `Date must be after ${field.min}`
                    } : undefined,
                    max: typeof field.max === 'string' ? {
                        value: field.max,
                        message: `Date must be before ${field.max}`
                    } : undefined,
                })}
                className={`
          w-full px-4 py-3 bg-charcoal/30 border rounded-xl text-off-white 
          focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand transition-colors
          [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-60
          ${error ? 'border-accent-red/50' : 'border-sand/30'}
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
