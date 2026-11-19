import Header from '@/Components/UI/Header/Header';
import Footer from '@/Components/UI/Footer/Footer';
import GoogleReviewsMasonry from '@/Components/UI/GoogleReviews/GoogleReviewsMasonry';
import reviews from '@/data/google-reviews.json';
import { SITE_URL } from '@/utils/siteMetadata';

export const metadata = { title: 'Customer Reviews | QuickDry Restorations', description: 'Read customer feedback about QuickDry Restorations’ cleaning services in Auckland.', metadataBase: new URL(SITE_URL), alternates: { canonical: '/reviews' } };
export default function ReviewsPage() {
  return <><Header /><main><GoogleReviewsMasonry data={reviews} title="QuickDry customer reviews" preview={false} limit={null} asPage /></main><Footer showFooterCta={false} /></>;
}
