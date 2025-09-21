'use client';

import { useState, useEffect } from 'react';
import { ArrowDownTrayIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export default function InstallButton() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        const isIOSStandalone = (window.navigator as any).standalone === true;

        if (isStandalone || isIOSStandalone) {
            setIsInstalled(true);
            return;
        }

        // Listen for beforeinstallprompt event
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        // Listen for app installed event
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            // Show manual instructions
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

            if (isIOS) {
                alert('To install this app on iOS:\n1. Tap the Share button (□↗)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to confirm');
            } else {
                alert('To install this app:\n1. Look for the install icon in your browser address bar\n2. Or check your browser menu for "Install" or "Add to Home Screen" option');
            }
            return;
        }

        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }

            setDeferredPrompt(null);
        } catch (error) {
            console.error('Error showing install prompt:', error);
        }
    };

    // Show different content based on install status
    if (isInstalled) {
        return (
            <button
                disabled
                className="flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded-xl text-sm font-medium cursor-not-allowed"
            >
                <DevicePhoneMobileIcon className="w-4 h-4" />
                App Installed
            </button>
        );
    }

    return (
        <button
            onClick={handleInstallClick}
            className="flex items-center gap-2 px-4 py-2 bg-sand/10 text-sand border border-sand/30 rounded-xl text-sm font-medium hover:bg-sand/20 transition-colors focus:outline-none focus:ring-2 focus:ring-sand/50"
        >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Install App
        </button>
    );
}
