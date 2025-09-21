'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline';
import AppShell from '@/components/AppShell';
import Hero from '@/components/Hero';
import InstallButton from '@/components/InstallButton';
import { getUserId } from '@/lib/db';
import { uuid } from '@/lib/ids';

export default function OnboardPage() {
  const router = useRouter();
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleEnterDraw = () => {
    // Generate user ID and ticket seed for the form
    const userId = getUserId();
    const ticketSeed = uuid();

    router.push(`/form?uid=${userId}&seed=${ticketSeed}`);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <Hero className="mb-8" />

        {/* Features List */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sand">
            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-off-white">Dynamic schema-driven forms</span>
          </div>
          <div className="flex items-center gap-3 text-sand">
            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-off-white">Real-time validation & conditional fields</span>
          </div>
          <div className="flex items-center gap-3 text-sand">
            <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-off-white">Admin interface for form editing</span>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          onClick={handleEnterDraw}
          className="w-full bg-sand text-charcoal font-bold py-4 rounded-2xl hover:bg-sand/90 active:scale-95 transition-all duration-200 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-sand/50"
        >
          Enter Lucky Draw
        </button>

        {/* How it Works */}
        <div className="border border-sand/20 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-sand/5 transition-colors focus:outline-none focus:ring-2 focus:ring-sand/50"
          >
            <span className="text-sand font-medium">How it works</span>
            <ChevronDownIcon
              className={`w-5 h-5 text-sand transition-transform duration-200 ${showHowItWorks ? 'rotate-180' : ''
                }`}
            />
          </button>

          {showHowItWorks && (
            <div className="px-4 pb-4 text-off-white/80 text-sm leading-relaxed border-t border-sand/10">
              <p className="mt-4">
                1) Fill the dynamic form (schema-driven). 2) Get your ticket ID. 3) Complete simulated payment.
                4) View your dashboard. Admins can edit form schemas at /admin.
              </p>
            </div>
          )}
        </div>

        {/* Install App Button */}
        <div className="flex justify-center">
          <InstallButton />
        </div>

        {/* Admin Link */}
        <div className="text-center">
          <Link
            href="/admin"
            className="text-sand/70 hover:text-sand text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sand/50 rounded"
          >
            Admin Interface
          </Link>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 pt-4">
          <Link
            href="/terms"
            className="text-sand/70 hover:text-sand text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sand/50 rounded"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-sand/70 hover:text-sand text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-sand/50 rounded"
          >
            Privacy
          </Link>
        </div>

        {/* Legal Notice */}
        <p className="text-xs text-sand/50 text-center leading-relaxed">
          Demo only. Payments are simulated.
        </p>
      </div>
    </AppShell>
  );
}
