'use client';

import { UseFormRegister, FieldError, Controller, Control } from 'react-hook-form';
import { Field } from '@/lib/schema';

interface MultiSelectFieldProps {
    field: Field;
    register: UseFormRegister<any>;
    control: Control<any>;
    error?: FieldError;
}

export default function MultiSelectField({ field, control, error }: MultiSelectFieldProps) {
    return (
        <div className="space-y-3">
            {field.label && (
                <label className="block text-sm font-medium text-sand">
                    {field.label}
                    {field.required && <span className="text-accent-red ml-1">*</span>}
                </label>
            )}

            <Controller
                name={field.id}
                control={control}
                rules={{
                    required: field.required ? `${field.label || field.id} is required` : false,
                }}
                render={({ field: controllerField }) => (
                    <div className="space-y-2">
                        {field.options?.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center space-x-3 cursor-pointer group"
                            >
                                <input
                                    type="checkbox"
                                    value={option.value}
                                    checked={controllerField.value?.includes(option.value) || false}
                                    onChange={(e) => {
                                        const currentValue = controllerField.value || [];
                                        if (e.target.checked) {
                                            controllerField.onChange([...currentValue, option.value]);
                                        } else {
                                            controllerField.onChange(
                                                currentValue.filter((v: string) => v !== option.value)
                                            );
                                        }
                                    }}
                                    className="w-4 h-4 text-sand border-sand/30 bg-charcoal/30 rounded focus:ring-sand/50 focus:ring-2"
                                />
                                <span className="text-off-white group-hover:text-sand transition-colors">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
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
