'use client';

import { UseFormRegister, FieldError, Controller, Control } from 'react-hook-form';
import { Field } from '@/lib/schema';
import { CloudArrowUpIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface FileFieldProps {
    field: Field;
    register: UseFormRegister<any>;
    control: Control<any>;
    error?: FieldError;
}

export default function FileField({ field, control, error }: FileFieldProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (file: File | null, onChange: (value: any) => void) => {
        if (!file) {
            setPreview(null);
            setFileName('');
            onChange(null);
            return;
        }

        setFileName(file.name);
        onChange(file);

        // Create preview for images
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const isImage = field.id === 'selfie' || field.label?.toLowerCase().includes('photo') || field.label?.toLowerCase().includes('selfie');

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
                    <div className="space-y-3">
                        {/* File Input */}
                        <div className="relative">
                            <input
                                type="file"
                                accept={isImage ? "image/*" : "*/*"}
                                onChange={(e) => handleFileChange(e.target.files?.[0] || null, controllerField.onChange)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id={field.id}
                            />

                            <div className={`
                border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer
                ${error ? 'border-accent-red/50 bg-accent-red/5' : 'border-sand/30 bg-sand/5 hover:border-sand/50 hover:bg-sand/10'}
              `}>
                                <div className="flex flex-col items-center gap-3">
                                    {isImage ? (
                                        <PhotoIcon className="w-8 h-8 text-sand/60" />
                                    ) : (
                                        <CloudArrowUpIcon className="w-8 h-8 text-sand/60" />
                                    )}

                                    <div>
                                        <p className="text-off-white font-medium">
                                            {fileName ? 'File selected' : 'Choose file'}
                                        </p>
                                        <p className="text-sand/60 text-sm mt-1">
                                            {isImage ? 'PNG, JPG up to 10MB' : 'Any file up to 10MB'}
                                        </p>
                                    </div>

                                    {fileName && (
                                        <p className="text-sand text-sm font-medium">
                                            {fileName}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Image Preview */}
                        {preview && (
                            <div className="relative">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-xl border border-sand/30"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleFileChange(null, controllerField.onChange)}
                                    className="absolute -top-2 -right-2 bg-accent-red text-off-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-accent-red/80 transition-colors"
                                >
                                    ×
                                </button>
                            </div>
                        )}
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
