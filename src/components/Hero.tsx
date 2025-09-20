'use client';

import Image from 'next/image';

interface HeroProps {
    headline?: string;
    subtitle?: string;
    showSUV?: boolean;
    className?: string;
}

export default function Hero({
    headline = "Enter. Play fair. Win big.",
    subtitle = "Join our lucky draw for a brand-new off-road SUV experience. One ticket. One chance.",
    showSUV = true,
    className = ""
}: HeroProps) {
    return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-charcoal to-olive ${className}`}>
            {/* Background Dunes */}
            <div className="absolute inset-0 opacity-40">
                <Image
                    src="/images/dunes.svg"
                    alt=""
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                />
            </div>

            {/* Texture Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 p-8">
                {showSUV && (
                    <div className="flex justify-center mb-6">
                        <div className="text-sand animate-float">
                            <Image
                                src="/images/hero-suv.svg"
                                alt="Off-road SUV silhouette"
                                width={200}
                                height={100}
                                className="w-48 h-24 opacity-90"
                                priority
                            />
                        </div>
                    </div>
                )}

                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-off-white leading-tight tracking-tight">
                        {headline}
                    </h1>

                    <p className="text-sand/90 text-lg leading-relaxed max-w-sm mx-auto">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}
