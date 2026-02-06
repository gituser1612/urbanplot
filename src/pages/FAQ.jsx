import PageLayout from '../layouts/PageLayout';

export default function FAQ() {
    const faqs = [
        { q: "How do I schedule a viewing?", a: "You can schedule a private viewing directly through the property page or by contacting our concierge team." },
        { q: "Do you handle international transactions?", a: "Yes, UrbanPlot specializes in cross-border real estate transactions and can assist with legal frameworks in multiple jurisdictions." },
        { q: "What is your listing fee?", a: "Our fees are tailored to the specific requirements of each property. Please contact our sales team for a consultation." },
        { q: "Can I list my property off-market?", a: "Absolutely. We offer an exclusive 'Private Collection' service for sellers who value discretion." }
    ];

    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <h1 className="font-display font-medium text-4xl md:text-5xl text-luxury-charcoal mb-8">Frequently Asked Questions</h1>
                <div className="h-1 w-20 bg-luxury-gold mb-12" />

                <div className="space-y-8">
                    {faqs.map((item, i) => (
                        <div key={i} className="border-b border-gray-200 pb-8">
                            <h3 className="font-serif text-xl text-luxury-charcoal mb-3">{item.q}</h3>
                            <p className="font-sans text-gray-600 leading-relaxed">{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
}
