import ReviewCards from "./ReviewCards";
import styles from "./GoogleReviewsMasonry.module.scss";

const INITIAL_REVIEWS = 3;
const MIN_ADDITIONAL_REVIEWS = 5;

export default function ServiceReviews({ serviceName, reviews }) {
  if (!reviews.length) return null;
  const remaining = reviews.slice(INITIAL_REVIEWS);

  return (
    <section id="google-reviews" className={styles.serviceSection} aria-labelledby="service-reviews-title">
      <h2 id="service-reviews-title">Five-star Google reviews for {serviceName.toLowerCase()}</h2>
      <ReviewCards reviews={reviews.slice(0, INITIAL_REVIEWS)} showSource />
      {remaining.length >= MIN_ADDITIONAL_REVIEWS && (
        <details className={styles.moreReviews}>
          <summary>{remaining.length} more reviews</summary>
          <ReviewCards reviews={remaining} offset={INITIAL_REVIEWS} showSource />
        </details>
      )}
    </section>
  );
}
