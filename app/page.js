import Header from '@/Components/UI/Header/Header';
import Footer from '@/Components/UI/Footer/Footer';
import LandingPageHeroSection from '@/Components/UI/Layout/Sections/LandingPageHeroSection/LandingPageHeroSection';
import ServiceCardsSection from '@/Components/UI/Layout/Sections/ServiceCardsSection/ServiceCardsSection';
import BeforeAfterGallerySection from '@/Components/UI/Layout/Sections/BeforeAfterGallerySection/BeforeAfterGallerySection';
import GoogleReviewsMasonry from '@/Components/UI/GoogleReviews/GoogleReviewsMasonry';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/utils/siteMetadata';
import { DEFAULT_SERVICE_CARDS_SECTION } from '@/utils/restorationServices';
import { getAllServiceMedia } from '@/utils/server/serviceMedia.mjs';
import reviewsData from '@/data/google-reviews.json';

export const metadata = {
  title: 'Auckland Cleaning & Restoration | QuickDry Restorations',
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
  openGraph: { title: SITE_NAME, description: SITE_DESCRIPTION, url: SITE_URL, siteName: SITE_NAME, locale: 'en_NZ', type: 'website', images: [{ url: '/logo.png', alt: SITE_NAME }] },
};

export default async function Home() {
  const gallery = await getAllServiceMedia();
  return <>
    <Header />
    <main>
      <LandingPageHeroSection
        title="Cleaning and restoration in Auckland"
        description="Book carpet and vinyl cleaning, arrange a meth decontamination assessment, or call our 24/7 team for fire and flood restoration."
        aboveTitleUsp="QuickDry Restorations · Auckland"
        uspData={{ text_usp: [{ value: 'Carpet cleaning from $180' }, { value: 'Carpet and upholstery cleaning' }, { value: '24/7 fire and flood response' }, { value: 'Vinyl cleaning and polishing' }, { value: 'Meth decontamination' }, { value: 'Homes and commercial properties' }] }}
        image={{ url: '/quickdry/hero.webp', alt: 'Upholstery cleaning by QuickDry Restorations', width: 1600, height: 1200 }}
        comparison={gallery.find(item => item.before && item.after)}
        formName="QuickDry Property Enquiry"
        formCopy={{ title: "Request A Quote", subtitle: "Tell us about your property and the service you need.", highlightText: "Auckland homes and businesses" }}
      />
      <ServiceCardsSection {...DEFAULT_SERVICE_CARDS_SECTION} columns={3} />
      <BeforeAfterGallerySection
        title="Our cleaning and restoration work"
        description="Explore QuickDry’s cleaning and restoration work. Drag the handles to compare before and after."
        images={gallery}
      />
      <GoogleReviewsMasonry data={reviewsData} title="What our customers say" description="Customer feedback from QuickDry Restorations’ Google reviews." />
    </main>
    <Footer showFooterCta={false} />
  </>;
}
