'use client';

import { UseFormRegister, FieldError } from 'react-hook-form';
import { Field } from '@/lib/schema';

interface CheckboxFieldProps {
    field: Field;
    register: UseFormRegister<any>;
    error?: FieldError;
}

export default function CheckboxField({ field, register, error }: CheckboxFieldProps) {
    return (
        <div className="space-y-2">
            <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                    type="checkbox"
                    {...register(field.id, {
                        required: field.required ? `${field.label || field.id} is required` : false,
                    })}
                    className="w-4 h-4 mt-0.5 text-sand border-sand/30 bg-charcoal/30 rounded focus:ring-sand/50 focus:ring-2"
                />
                <div className="flex-1">
                    {field.label && (
                        <span className="text-off-white group-hover:text-sand transition-colors">
                            {field.label}
                            {field.required && <span className="text-accent-red ml-1">*</span>}
                        </span>
                    )}
                    {field.hint && (
                        <p className="text-xs text-sand/60 mt-1">{field.hint}</p>
                    )}
                </div>
            </label>

            {error && (
                <p className="text-xs text-accent-red ml-7">{error.message}</p>
            )}
        </div>
    );
}
