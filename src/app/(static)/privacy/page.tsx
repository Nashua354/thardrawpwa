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
                            This is a demonstration application. All data is stored locally in your browser&apos;s
                            localStorage and is not transmitted to external servers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Information We Collect</h2>
                        <p className="mb-4">
                            In this demo application, we collect and store the following information locally:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>A randomly generated user ID for session tracking</li>
                            <li>Form submission data as entered by users</li>
                            <li>Ticket information and simulated payment status</li>
                            <li>Admin-created form schemas (when using admin interface)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">How We Use Your Information</h2>
                        <p className="mb-4">
                            The locally stored information is used to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Maintain user sessions across browser visits</li>
                            <li>Display form submissions and ticket information</li>
                            <li>Demonstrate the complete user flow from form to dashboard</li>
                            <li>Allow admin users to create and modify form schemas</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Data Storage</h2>
                        <p className="mb-4">
                            All data is stored using your browser&apos;s localStorage:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Data persists only on your current device and browser</li>
                            <li>No data is transmitted to external servers</li>
                            <li>You can clear all data by clearing your browser&apos;s storage</li>
                            <li>Data is automatically deleted when you clear browser data</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Third-Party Services</h2>
                        <p className="mb-4">
                            This demo may integrate with:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li><strong>Hosting Platform:</strong> Vercel for application hosting</li>
                            <li><strong>CDN Services:</strong> For serving static assets</li>
                            <li><strong>External Schemas:</strong> If configured, may fetch form schemas from external URLs</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Your Rights</h2>
                        <p className="mb-4">
                            Since all data is stored locally:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>You have complete control over your information</li>
                            <li>You can delete all data by clearing browser storage</li>
                            <li>No data persists beyond your local browser session</li>
                            <li>No data is shared with third parties</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Contact</h2>
                        <p>
                            Questions about this privacy policy or the demo application:{' '}
                            <a
                                href="mailto:hello@thardraw.example"
                                className="text-sand hover:text-off-white transition-colors"
                            >
                                hello@thardraw.example
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </AppShell>
    );
}
