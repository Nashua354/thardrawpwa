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
                        <h2 className="text-xl font-semibold text-sand mb-3">Eligibility</h2>
                        <p className="mb-4">
                            This promotional contest is open to legal residents of India who are 18 years of age or older at the time of entry.
                            Employees of the organizing company and their immediate family members are not eligible to participate.
                        </p>
                        <p>
                            Participants must provide accurate and complete information during registration.
                            False or misleading information may result in disqualification.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">How to Enter</h2>
                        <p className="mb-4">
                            To enter the contest, participants must:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Complete the online entry form with accurate information</li>
                            <li>Pay the entry fee of ₹499</li>
                            <li>Receive confirmation of successful entry via their dashboard</li>
                        </ul>
                        <p>
                            Each participant may enter only once. Multiple entries from the same person will result in disqualification.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Selection & Announcement</h2>
                        <p className="mb-4">
                            The winner will be selected through a random draw conducted by an independent third party.
                            The draw will be held on the announced date and time.
                        </p>
                        <p className="mb-4">
                            The winner will be announced live on our official social media handles and will be contacted
                            directly via the contact information provided during entry.
                        </p>
                        <p>
                            The winner must respond within 48 hours of notification to claim their prize.
                            Failure to respond may result in forfeiture of the prize.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Fees & Refunds</h2>
                        <p className="mb-4">
                            The entry fee is non-refundable except in cases where the contest is cancelled by the organizers.
                            All payments must be completed before the contest closing date.
                        </p>
                        <p>
                            In case of technical issues preventing successful entry after payment, participants should contact
                            support immediately for assistance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Fair Play & Fraud</h2>
                        <p className="mb-4">
                            Any attempt to manipulate the contest, use automated systems, or engage in fraudulent activity
                            will result in immediate disqualification and may be reported to relevant authorities.
                        </p>
                        <p>
                            The organizers reserve the right to verify the eligibility of all participants and may request
                            additional documentation as needed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Data & Privacy</h2>
                        <p className="mb-4">
                            Personal information collected during entry will be used solely for contest administration and
                            winner notification. We do not share personal data with third parties except as required for
                            contest fulfillment.
                        </p>
                        <p>
                            For complete details on data handling, please refer to our Privacy Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-sand mb-3">Contact</h2>
                        <p>
                            For questions about these terms or the contest, contact us at:{' '}
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
                            Brand names are property of respective owners. This demo uses a generic SUV silhouette
                            and does not imply endorsement. This is a demonstration application and no actual prizes
                            will be awarded.
                        </p>
                    </section>
                </div>
            </div>
        </AppShell>
    );
}
