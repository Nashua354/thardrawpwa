'use client';

import { Field } from '@/lib/schema';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

interface InfoFieldProps {
    field: Field;
}

export default function InfoField({ field }: InfoFieldProps) {
    if (field.type === 'divider') {
        return (
            <div className="py-4">
                <hr className="border-sand/20" />
            </div>
        );
    }

    return (
        <div className="bg-sand/5 border border-sand/20 rounded-xl p-4">
            <div className="flex items-start space-x-3">
                <InformationCircleIcon className="w-5 h-5 text-sand flex-shrink-0 mt-0.5" />
                <div>
                    {field.label && (
                        <h3 className="text-sm font-medium text-sand mb-1">
                            {field.label}
                        </h3>
                    )}
                    {field.hint && (
                        <p className="text-sm text-off-white/80">
                            {field.hint}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
