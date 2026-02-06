import PageLayout from '../layouts/PageLayout';

export default function Terms() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <h1 className="font-display font-medium text-4xl md:text-5xl text-luxury-charcoal mb-8">Terms & Conditions</h1>
                <div className="h-1 w-20 bg-luxury-gold mb-12" />

                <div className="prose prose-sm md:prose-base text-gray-600 font-sans leading-relaxed space-y-6">
                    <p>Last Updated: February 2026</p>
                    <p>
                        Please read these Terms and Conditions ("Terms") carefully before using the UrbanPlot website operated by us.
                    </p>
                    <h3 className="font-serif text-xl text-luxury-charcoal mt-8 mb-4">1. Acceptance of Terms</h3>
                    <p>
                        By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
                    </p>
                    <h3 className="font-serif text-xl text-luxury-charcoal mt-8 mb-4">2. Purchases</h3>
                    <p>
                        If you wish to purchase any product or service made available through the Service, you may be asked to supply certain information relevant to your purchase.
                    </p>
                    <h3 className="font-serif text-xl text-luxury-charcoal mt-8 mb-4">3. Content</h3>
                    <p>
                        Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
