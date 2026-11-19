// The business's confirmed Google total can be higher than the saved snapshot.
export const GOOGLE_REVIEW_COUNT = 0;
export const HOMEPAGE_REVIEW_LIMIT = 8;

export const getReviewText = (review) => review.text ?? review.snippet ?? "";
export const getReviewRating = (review) => review.stars ?? review.rating;

export function getSortedReviews(data) {
  const reviews = Array.isArray(data) ? data : data?.reviews;
  if (!Array.isArray(reviews)) return [];
  return [...reviews].sort((a, b) =>
    (Date.parse(b.iso_date) || 0) - (Date.parse(a.iso_date) || 0)
  );
}

// Match the customer's own description of the work. Surface names alone can
// refer to installation or repair, so cleaning pages also require a treatment.
const cleaning = /\b(?:clean(?:s|ed|ing)?|shampoo(?:ed|ing)?|steam(?:ed|ing)?|stain(?:s|ed)?|deodori[sz](?:ed|ing))\b/i;
const vinylTreatment = /\b(?:polish(?:ed|ing)?|strip(?:ped|ping)?|seal(?:ed|ing)?|buff(?:ed|ing)?|scrub(?:bed|bing)?|shine)\b/i;
const installation = /\b(?:install(?:s|ed|ing|ation)?|fitting)\b/i;
const vehicle = /\b(?:cars?|vehicles?|automotive)\b/i;

const matchesService = {
  "carpet-upholstery-cleaning-auckland": text =>
    /\b(?:carpets?|upholstery|sofas?|couch(?:es)?|rugs?|lounge suites?)\b/i.test(text)
    && cleaning.test(text) && !vehicle.test(text) && !installation.test(text),
  "vinyl-floor-cleaning-and-polishing-auckland": text =>
    /\bvinyl\b/i.test(text) && (cleaning.test(text) || vinylTreatment.test(text)) && !installation.test(text),
  "flood-restoration-auckland": text =>
    /\b(?:flood(?:s|ed|ing)?|water[- ](?:damag(?:e|ed)|extraction|restoration)|structural drying)\b/i.test(text),
  "fire-restoration-auckland": text =>
    /\b(?:fire|soot|smoke[- ](?:damage|removal|clean(?:up|ing)))\b/i.test(text),
  "meth-cleaning-auckland": text => /\b(?:meth|methamphetamine)\b/i.test(text),
};

export function getServiceReviews(data, slug) {
  if (!Object.hasOwn(matchesService, slug)) return [];
  const matches = matchesService[slug];
  return getSortedReviews(data).filter(review => {
    const text = getReviewText(review);
    return getReviewRating(review) === 5 && typeof text === "string"
      && text.split(/[.!?;\n]+/).some(matches);
  });
}

export function getReviewSummary(data) {
  const reviews = getSortedReviews(data);
  const rated = reviews.filter((review) => {
    const rating = getReviewRating(review);
    return typeof rating === "number" && rating >= 1 && rating <= 5;
  });
  const averageRating = rated.length
    ? rated.reduce((total, review) => total + getReviewRating(review), 0) / rated.length
    : 0;
  return {
    averageRating,
    totalReviewCount: Math.max(GOOGLE_REVIEW_COUNT, Number(data?.total) || reviews.length),
  };
}

export function formatReviewDate(isoDate) {
  const date = new Date(isoDate);
  if (!Number.isFinite(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric", month: "short", year: "numeric", timeZone: "Pacific/Auckland",
  }).format(date);
}
