import AppShell from '@/components/AppShell';

export default function PrivacyPage() {
    return (
        <AppShell showBackButton title="Privacy Policy">
            <div className="prose prose-invert prose-sand max-w-none">
                <h1 className="text-2xl font-bold text-off-white mb-6">
                    Privacy Policy
                </h1>

                <div className="space-y-6 text-off-white/90 leading-relaxed">
                    <section className="bg-sand/5 border border-sand/20 rounded-xl p-4">
                        <h2 className="text-lg font-semibold text-accent-red mb-2">Demo Application Notice</h2>
                        <p className="text-sm">
                            This is a demonstration application. No personal data is transmitted to external servers.
                            All data is stored locally in your browser&apos;s localStorage and is automatically deleted when you clear your browser data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Information We Collect</h2>
                        <p className="mb-4">
                            In this demo application, we collect and store the following information locally in your browser:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>A randomly generated user ID to track your session</li>
                            <li>Ticket information including ticket ID and creation timestamp</li>
                            <li>Payment status (simulated - no real payment processing occurs)</li>
                            <li>Form data submitted through the embedded Typeform (in a real application)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">How We Use Your Information</h2>
                        <p className="mb-4">
                            The information collected is used to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Provide you with a consistent experience across app sessions</li>
                            <li>Display your ticket information and payment status</li>
                            <li>Demonstrate the complete user flow from entry to dashboard</li>
                        </ul>
                        <p>
                            Since this is a demo, no information is sent to external servers or used for any commercial purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Data Storage</h2>
                        <p className="mb-4">
                            All data in this demo is stored locally using your browser&apos;s localStorage feature. This means:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Data persists only on the device and browser you&apos;re currently using</li>
                            <li>No data is transmitted to external servers</li>
                            <li>You can clear all stored data by clearing your browser&apos;s localStorage</li>
                            <li>Data is automatically deleted when you clear your browser data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Third-Party Services</h2>
                        <p className="mb-4">
                            This demo application integrates with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Typeform:</strong> The embedded form is hosted by Typeform. Their privacy policy applies to any data you submit through the form.</li>
                            <li><strong>Vercel:</strong> This demo is hosted on Vercel&apos;s platform. Their privacy policy applies to hosting and analytics data.</li>
                        </ul>
                        <p>
                            In a production application, additional third-party services for payment processing and analytics would have their own privacy policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Your Rights</h2>
                        <p className="mb-4">
                            Since all data is stored locally on your device, you have complete control over your information:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>You can clear all stored data by clearing your browser&apos;s localStorage</li>
                            <li>You can stop using the application at any time</li>
                            <li>No data persists beyond your local browser session</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Contact</h2>
                        <p>
                            If you have questions about this privacy policy or the demo application, contact us at:{' '}
                            <a
                                href="mailto:hello@thardraw.example"
                                className="text-sand hover:text-off-white transition-colors"
                            >
                                hello@thardraw.example
                            </a>
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Updates to This Policy</h2>
                        <p>
                            This privacy policy may be updated periodically to reflect changes in the demo application or
                            regulatory requirements. The current version will always be available at this URL.
                        </p>
                    </section>
                </div>
            </div>
        </AppShell>
    );
}
