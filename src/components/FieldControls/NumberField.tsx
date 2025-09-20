'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { Field } from '@/lib/schema';

interface NumberFieldProps {
    field: Field;
    register: UseFormRegister<any>;
    error?: FieldError;
}

export default function NumberField({ field, register, error }: NumberFieldProps) {
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
                type="number"
                placeholder={field.placeholder}
                min={typeof field.min === 'number' ? field.min : undefined}
                max={typeof field.max === 'number' ? field.max : undefined}
                {...register(field.id, {
                    required: field.required ? `${field.label || field.id} is required` : false,
                    valueAsNumber: true,
                    min: typeof field.min === 'number' ? {
                        value: field.min,
                        message: `Minimum value is ${field.min}`
                    } : undefined,
                    max: typeof field.max === 'number' ? {
                        value: field.max,
                        message: `Maximum value is ${field.max}`
                    } : undefined,
                })}
                className={`
          w-full px-4 py-3 bg-charcoal/30 border rounded-xl text-off-white placeholder-sand/50 
          focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand transition-colors
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
