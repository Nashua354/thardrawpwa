'use client';

interface Step {
    number: number;
    label: string;
    isActive?: boolean;
    isCompleted?: boolean;
}

interface StepBarProps {
    currentStep: number;
    className?: string;
    steps?: Step[];
}

const defaultSteps: Step[] = [
    { number: 1, label: 'Form' },
    { number: 2, label: 'Ticket' },
    { number: 3, label: 'Pay' },
    { number: 4, label: 'Dashboard' },
];

export default function StepBar({
    currentStep,
    className = '',
    steps = defaultSteps
}: StepBarProps) {
    return (
        <div className={`flex items-center justify-between max-w-sm mx-auto ${className}`}>
            {steps.map((step, index) => {
                const isActive = step.number === currentStep;
                const isCompleted = step.number < currentStep;
                const isLast = index === steps.length - 1;

                return (
                    <div key={step.number} className="flex items-center">
                        {/* Step Circle */}
                        <div className="flex flex-col items-center">
                            <div
                                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                  ${isCompleted
                                        ? 'bg-sand text-charcoal'
                                        : isActive
                                            ? 'bg-sand text-charcoal ring-2 ring-sand/30'
                                            : 'bg-charcoal border-2 border-sand/30 text-sand/60'
                                    }
                `}
                            >
                                {isCompleted ? '✓' : step.number}
                            </div>

                            {/* Step Label */}
                            <span
                                className={`
                  text-xs mt-1 font-medium transition-colors duration-200
                  ${isActive
                                        ? 'text-sand'
                                        : isCompleted
                                            ? 'text-sand/80'
                                            : 'text-sand/50'
                                    }
                `}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Connector Line */}
                        {!isLast && (
                            <div
                                className={`
                  h-0.5 w-12 mx-2 mb-5 transition-colors duration-200
                  ${isCompleted
                                        ? 'bg-sand'
                                        : 'bg-sand/20'
                                    }
                `}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
