'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { Field } from '@/lib/schema';

interface RadioFieldProps {
    field: Field;
    register: UseFormRegister<any>;
    error?: FieldError;
}

export default function RadioField({ field, register, error }: RadioFieldProps) {
    return (
        <div className="space-y-3">
            {field.label && (
                <label className="block text-sm font-medium text-sand">
                    {field.label}
                    {field.required && <span className="text-accent-red ml-1">*</span>}
                </label>
            )}

            <div className="space-y-3">
                {field.options?.map((option) => (
                    <label
                        key={option.value}
                        className="flex items-center space-x-3 cursor-pointer group"
                    >
                        <input
                            type="radio"
                            value={option.value}
                            {...register(field.id, {
                                required: field.required ? `${field.label || field.id} is required` : false,
                            })}
                            className="w-4 h-4 text-sand border-sand/30 bg-charcoal/30 focus:ring-sand/50 focus:ring-2"
                        />
                        <span className="text-off-white group-hover:text-sand transition-colors">
                            {option.label}
                        </span>
                    </label>
                ))}
            </div>

            {field.hint && (
                <p className="text-xs text-sand/60">{field.hint}</p>
            )}

            {error && (
                <p className="text-xs text-accent-red">{error.message}</p>
            )}
        </div>
    );
}
