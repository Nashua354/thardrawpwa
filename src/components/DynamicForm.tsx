'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FormSchema, generateZodSchema } from '@/lib/schema';
import { shouldShowField } from '@/lib/eval';
import { storeFormSubmission } from '@/lib/storage';
import { showToast } from '@/lib/toast';

// Field Controls
import TextField from './FieldControls/TextField';
import SelectField from './FieldControls/SelectField';
import RadioField from './FieldControls/RadioField';
import CheckboxField from './FieldControls/CheckboxField';
import MultiSelectField from './FieldControls/MultiSelectField';
import DateField from './FieldControls/DateField';
import NumberField from './FieldControls/NumberField';
import FileField from './FieldControls/FileField';
import InfoField from './FieldControls/InfoField';

interface DynamicFormProps {
    schema: FormSchema;
    onSubmit?: (data: any) => void;
    className?: string;
    hiddenFields?: Record<string, any>;
}

export default function DynamicForm({
    schema,
    onSubmit,
    className = '',
    hiddenFields = {}
}: DynamicFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate validation schema
    const validationSchema = generateZodSchema(schema.fields);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
    } = useForm({
        resolver: zodResolver(validationSchema),
        mode: 'onChange',
    });

    // Watch form values for conditional field display
    const watchedValues = useWatch({ control });

    const renderField = (field: any) => {
        // Check if field should be visible
        if (field.showWhen && !shouldShowField(field.showWhen, watchedValues)) {
            return null;
        }

        const error = errors[field.id] as any;
        const commonProps = {
            field,
            register,
            error,
        };

        switch (field.type) {
            case 'text':
            case 'textarea':
            case 'email':
            case 'phone':
                return <TextField key={field.id} {...commonProps} />;

            case 'number':
                return <NumberField key={field.id} {...commonProps} />;

            case 'select':
                return <SelectField key={field.id} {...commonProps} />;

            case 'radio':
                return <RadioField key={field.id} {...commonProps} />;

            case 'checkbox':
                return <CheckboxField key={field.id} {...commonProps} />;

            case 'multiselect':
                return (
                    <MultiSelectField
                        key={field.id}
                        {...commonProps}
                        control={control}
                    />
                );

            case 'date':
                return <DateField key={field.id} {...commonProps} />;

            case 'file':
                return (
                    <FileField
                        key={field.id}
                        {...commonProps}
                        control={control}
                    />
                );

            case 'info':
            case 'divider':
                return <InfoField key={field.id} field={field} />;

            case 'hidden':
                return (
                    <input
                        key={field.id}
                        type="hidden"
                        {...register(field.id)}
                    />
                );

            default:
                console.warn(`Unknown field type: ${field.type}`);
                return null;
        }
    };

    const handleFormSubmit = async (data: any) => {
        setIsSubmitting(true);

        try {
            // Inject hidden fields
            const submissionData = {
                ...data,
                ...hiddenFields,
            };

            // Add system fields if configured
            if (schema.hidden?.inject) {
                schema.hidden.inject.forEach((fieldName) => {
                    if (hiddenFields[fieldName]) {
                        submissionData[fieldName] = hiddenFields[fieldName];
                    }
                });
            }

            // Execute actions
            if (schema.afterSubmit?.actions) {
                for (const action of schema.afterSubmit.actions) {
                    switch (action.type) {
                        case 'localStore':
                            if (action.key) {
                                storeFormSubmission({
                                    ...submissionData,
                                    _stored_key: action.key,
                                });
                            }
                            break;

                        case 'navigate':
                            if (action.to) {
                                // Small delay to ensure storage completes
                                setTimeout(() => {
                                    router.push(action.to!);
                                }, 100);
                            }
                            break;

                        case 'webhook':
                            // TODO: Implement webhook support
                            console.log('Webhook action not implemented:', action);
                            showToast.error('Webhook not implemented in demo');
                            break;
                    }
                }
            }

            // Custom onSubmit handler
            if (onSubmit) {
                onSubmit(submissionData);
            }

            showToast.success('Form submitted successfully!');
        } catch (error) {
            console.error('Form submission error:', error);
            showToast.error('Failed to submit form');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate progress
    const visibleFields = schema.fields.filter(field =>
        field.type !== 'hidden' &&
        field.type !== 'info' &&
        field.type !== 'divider' &&
        (!field.showWhen || shouldShowField(field.showWhen, watchedValues))
    );

    const completedFields = visibleFields.filter(field => {
        const value = watchedValues?.[field.id];
        return value !== undefined && value !== '' && value !== null;
    });

    const progress = visibleFields.length > 0 ? (completedFields.length / visibleFields.length) * 100 : 0;

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Form Header */}
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-off-white">
                    {schema.title}
                </h1>
                {schema.description && (
                    <p className="text-sand/80">
                        {schema.description}
                    </p>
                )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-sand/70">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-sand/20 rounded-full h-2">
                    <div
                        className="bg-sand h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className={`
          grid gap-6 
          ${schema.layout?.columns === 2 ? 'md:grid-cols-2' : 'grid-cols-1'}
        `}>
                    {schema.fields.map(renderField)}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        className="w-full bg-sand text-charcoal font-bold py-4 rounded-2xl hover:bg-sand/90 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-sand/50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Continue'}
                    </button>
                </div>

                {/* Terms Link */}
                <div className="text-center">
                    <p className="text-xs text-sand/60">
                        By continuing, you agree to our{' '}
                        <button
                            type="button"
                            onClick={() => router.push('/terms')}
                            className="text-sand hover:text-off-white transition-colors underline"
                        >
                            Terms & Conditions
                        </button>
                    </p>
                </div>
            </form>

            {/* Demo Notice */}
            <div className="text-center">
                <p className="text-xs text-sand/50">
                    Demo only. Payments are simulated.
                </p>
            </div>
        </div>
    );
}
