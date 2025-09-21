'use client';

import { useState, useEffect } from 'react';
import { ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
    prompt(): Promise<void>;
}

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
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

            // Show our custom prompt after a delay
            setTimeout(() => {
                setShowPrompt(true);
            }, 5000); // Show after 5 seconds
        };

        // Listen for app installed event
        const handleAppInstalled = () => {
            setIsInstalled(true);
            setShowPrompt(false);
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
            // Fallback instructions for browsers that don't support programmatic install
            showManualInstructions();
            return;
        }

        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }

            setDeferredPrompt(null);
            setShowPrompt(false);
        } catch (error) {
            console.error('Error showing install prompt:', error);
            showManualInstructions();
        }
    };

    const showManualInstructions = () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (isIOS) {
            alert('To install this app on your iOS device, tap the Share button and then "Add to Home Screen".');
        } else {
            alert('To install this app, look for the install button in your browser\'s address bar or menu.');
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        // Don't show again for this session
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('installPromptDismissed', 'true');
        }
    };

    // Don't show if already installed or dismissed this session
    if (isInstalled || (typeof window !== 'undefined' && sessionStorage.getItem('installPromptDismissed'))) {
        return null;
    }

    if (!showPrompt) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm">
            <div className="bg-charcoal border border-sand/30 rounded-2xl p-4 shadow-2xl backdrop-blur-sm">
                <div className="flex items-start gap-3">
                    <div className="bg-sand/20 rounded-full p-2 flex-shrink-0">
                        <ArrowDownTrayIcon className="w-5 h-5 text-sand" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-off-white mb-1">
                            Install Thar Draw
                        </h3>
                        <p className="text-xs text-sand/80 mb-3">
                            Add to your home screen for quick access and offline use
                        </p>

                        <div className="flex gap-2">
                            <button
                                onClick={handleInstallClick}
                                className="bg-sand text-charcoal text-xs font-semibold px-3 py-2 rounded-lg hover:bg-sand/90 transition-colors"
                            >
                                Install
                            </button>
                            <button
                                onClick={handleDismiss}
                                className="text-sand/70 hover:text-sand text-xs px-3 py-2 transition-colors"
                            >
                                Not now
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleDismiss}
                        className="text-sand/60 hover:text-sand transition-colors p-1"
                        aria-label="Dismiss"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
