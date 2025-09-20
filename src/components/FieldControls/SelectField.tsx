'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { Field } from '@/lib/schema';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface SelectFieldProps {
    field: Field;
    register: UseFormRegister<any>;
    error?: FieldError;
}

export default function SelectField({ field, register, error }: SelectFieldProps) {
    return (
        <div className="space-y-2">
            {field.label && (
                <label htmlFor={field.id} className="block text-sm font-medium text-sand">
                    {field.label}
                    {field.required && <span className="text-accent-red ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <select
                    id={field.id}
                    {...register(field.id, {
                        required: field.required ? `${field.label || field.id} is required` : false,
                    })}
                    className={`
            w-full px-4 py-3 bg-charcoal/30 border rounded-xl text-off-white 
            focus:outline-none focus:ring-2 focus:ring-sand/50 focus:border-sand transition-colors
            appearance-none cursor-pointer
            ${error ? 'border-accent-red/50' : 'border-sand/30'}
          `}
                >
                    <option value="" className="bg-charcoal text-sand/70">
                        {field.placeholder || `Select ${field.label || 'option'}...`}
                    </option>
                    {field.options?.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-charcoal text-off-white"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sand/60 pointer-events-none" />
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
