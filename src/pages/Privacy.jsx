import PageLayout from '../layouts/PageLayout';

export default function Privacy() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <h1 className="font-display font-medium text-4xl md:text-5xl text-luxury-charcoal mb-8">Privacy Policy</h1>
                <div className="h-1 w-20 bg-luxury-gold mb-12" />

                <div className="prose prose-sm md:prose-base text-gray-600 font-sans leading-relaxed space-y-6">
                    <p>Last Updated: February 2026</p>
                    <p>
                        Your privacy is of paramount importance to UrbanPlot. This policy outlines how we collect, use, and protect your personal information.
                    </p>
                    <h3 className="font-serif text-xl text-luxury-charcoal mt-8 mb-4">1. Information Collection</h3>
                    <p>
                        We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or request property information.
                    </p>
                    <h3 className="font-serif text-xl text-luxury-charcoal mt-8 mb-4">2. Use of Information</h3>
                    <p>
                        We use the information to provide, maintain, and improve our services, including to personalize your experience and send you technical notices and support messages.
                    </p>
                    <h3 className="font-serif text-xl text-luxury-charcoal mt-8 mb-4">3. Data Security</h3>
                    <p>
                        We implement appropriate security measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
