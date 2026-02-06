import PageLayout from '../layouts/PageLayout';

export default function About() {
    return (
        <PageLayout>
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
                <h1 className="font-display font-medium text-4xl md:text-5xl text-luxury-charcoal mb-8">About UrbanPlot</h1>
                <div className="h-1 w-20 bg-luxury-gold mb-12" />

                <div className="prose prose-lg text-gray-600 font-sans leading-relaxed space-y-6">
                    <p>
                        Welcome to <strong>UrbanPlot</strong>, where architectural vision meets exclusive living.
                        We are a premier digital estate agency dedicated to curating the world's most exceptional properties.
                    </p>
                    <p>
                        Founded on the principles of integrity, discretion, and aesthetic excellence, UrbanPlot serves a global clientele
                        seeking more than just a residence—we help you find a legacy. From penthouse sanctuaries in New York to
                        modernist villas in Kyoto, our portfolio is a testament to the art of living well.
                    </p>
                    <p>
                        Our team of expert consultants and design aficionados work tirelessly to ensure that every listing meets our
                        rigorous standards for location, design, and craftsmanship.
                    </p>
                </div>
            </div>
        </PageLayout>
    );
}
