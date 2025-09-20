import AppShell from '@/components/AppShell';

export default function TermsPage() {
    return (
        <AppShell showBackButton title="Terms & Conditions">
            <div className="prose prose-invert prose-sand max-w-none">
                <h1 className="text-2xl font-bold text-off-white mb-6">
                    Promotional Contest – Terms & Conditions
                </h1>

                <div className="space-y-6 text-off-white/90 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Demo Application</h2>
                        <div className="bg-accent-red/10 border border-accent-red/20 rounded-xl p-4 mb-4">
                            <p className="text-sm text-accent-red font-medium">
                                This is a demonstration application showcasing dynamic form capabilities.
                                No real contest is running and no actual prizes will be awarded.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Technology Demo</h2>
                        <p className="mb-4">
                            This application demonstrates:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Dynamic schema-driven forms with real-time validation</li>
                            <li>Admin interface for form schema editing</li>
                            <li>Progressive Web App (PWA) capabilities</li>
                            <li>Simulated payment processing workflow</li>
                            <li>LocalStorage-based data persistence</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Data Handling</h2>
                        <p className="mb-4">
                            All data in this demo is stored locally in your browser&apos;s localStorage.
                            No information is transmitted to external servers except for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Loading form schemas from configured URLs (if enabled)</li>
                            <li>Standard web hosting and CDN requests</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Admin Access</h2>
                        <p className="mb-4">
                            The admin interface (/admin) allows editing of form schemas. Access is controlled
                            by a password set in environment variables. In a production environment, this would
                            be secured with proper authentication and authorization.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Contact</h2>
                        <p>
                            For questions about this demo application, contact:{' '}
                            <a
                                href="mailto:hello@thardraw.example"
                                className="text-sand hover:text-off-white transition-colors"
                            >
                                hello@thardraw.example
                            </a>
                        </p>
                    </section>

                    <section className="bg-sand/5 border border-sand/20 rounded-xl p-4 mt-8">
                        <h2 className="text-lg font-semibold text-accent-red mb-2">Important Disclaimer</h2>
                        <p className="text-sm">
                            This is a technology demonstration. Brand names and references are used for
                            illustrative purposes only and do not imply endorsement. No actual contest
                            or prizes are involved.
                        </p>
                    </section>
                </div>
            </div>
        </AppShell>
    );
}
