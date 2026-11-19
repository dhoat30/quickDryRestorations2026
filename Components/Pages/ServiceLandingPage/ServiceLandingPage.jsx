import Header from '@/Components/UI/Header/Header';
import Footer from '@/Components/UI/Footer/Footer';
import LandingPageHeroSection from '@/Components/UI/Layout/Sections/LandingPageHeroSection/LandingPageHeroSection';
import { SITE_NAME, SITE_URL } from '@/utils/siteMetadata';
import { BUSINESS_PHONE } from '@/utils/businessContact';
import reviewData from '@/data/google-reviews.json';
import { getServiceReviews } from '@/utils/reviews';
import ServiceReviews from '@/Components/UI/GoogleReviews/ServiceReviews';
import ServiceDetails from './ServiceDetails';
import BeforeAfterGallerySection from '@/Components/UI/Layout/Sections/BeforeAfterGallerySection/BeforeAfterGallerySection';
import { getServiceMedia } from '@/utils/server/serviceMedia.mjs';

export default async function ServiceLandingPage({ page, slug }) {
  const reviews = getServiceReviews(reviewData, slug);
  const gallery = await getServiceMedia(slug);
  const showGallery = slug === 'carpet-upholstery-cleaning-auckland' && gallery.length > 0;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.headline,
    description: page.description,
    url: `${SITE_URL}/${slug}`,
    serviceType: page.label,
    areaServed: { '@type': 'City', name: 'Auckland' },
    provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL, telephone: BUSINESS_PHONE },
  };

  return (
    <>
      <Header localSections hasServiceReviews={reviews.length > 0} hasServiceGallery={showGallery} />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
        <LandingPageHeroSection
          title={page.headline}
          description={page.intro}
          aboveTitleUsp="QuickDry Restorations · Auckland"
          uspData={{ text_usp: page.benefits.map(value => ({ value })) }}
          image={page.image}
          comparison={gallery.find(item => item.before && item.after)}
          formName={`QuickDry ${page.label} Enquiry`}
          serviceName={page.label}
          formCopy={page.form}
          emergency={page.emergency}
        />
        <ServiceDetails page={page} slug={slug}>
          <ServiceReviews serviceName={page.label} reviews={reviews} />
        </ServiceDetails>
        {showGallery && (
          <BeforeAfterGallerySection
            title="Carpet and upholstery cleaning results"
            description="See our carpet and upholstery cleaning work. Drag the handles to compare before and after."
            images={gallery}
          />
        )}
      </main>
      <Footer showFooterCta={false} />
    </>
  );
}
