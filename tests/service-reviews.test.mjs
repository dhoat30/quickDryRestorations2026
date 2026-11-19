import assert from "node:assert/strict";
import test from "node:test";
import { getServiceReviews } from "../utils/reviews.js";

const carpet = "carpet-upholstery-cleaning-auckland";
const vinyl = "vinyl-floor-cleaning-and-polishing-auckland";
const flood = "flood-restoration-auckland";
const fire = "fire-restoration-auckland";
const meth = "meth-cleaning-auckland";

test("uses five-star customer comments and returns the newest matches first", () => {
  const earlier = { stars: 5, text: "They cleaned our couch.", iso_date: "2025-10-12" };
  const latest = { rating: 5, snippet: "Excellent CARPET CLEANING.", iso_date: "2026-03-01" };
  const reviews = [
    earlier, { ...latest, rating: 4 }, { rating: 5 },
    { rating: 5, snippet: "Great team!", response: { snippet: "Thanks for booking carpet cleaning." } },
    latest,
  ];
  assert.deepEqual(getServiceReviews({ reviews }, carpet), [latest, earlier]);
  assert.deepEqual(getServiceReviews(reviews, meth), []);
});

test("distinguishes surface cleaning from installation and unrelated work", () => {
  const review = { rating: 5, snippet: "They polished our vinyl floor and cleaned our rugs." };
  const reviews = [
    { rating: 5, snippet: "We had carpet installation. They cleaned up afterwards." },
    { rating: 5, snippet: "Great vinyl flooring installation. The floor looks clean." },
    { rating: 5, snippet: "We had our vehicle cleaned and the upholstery done." },
    { rating: 5, snippet: "They polished the timber floors." },
    review,
  ];
  assert.deepEqual(getServiceReviews(reviews, vinyl), [review]);
  assert.deepEqual(getServiceReviews(reviews, carpet), [review]);
});

test("matches restoration work and leaves unrelated services empty", () => {
  const water = { rating: 5, snippet: "They helped us recover from water damage." };
  const smoke = { rating: 5, snippet: "Quick response to the smoke damage." };
  const contamination = { rating: 5, snippet: "Thorough methamphetamine decontamination." };
  const reviews = [water, smoke, contamination, { rating: 5, snippet: "They were methodical." }];
  assert.deepEqual(getServiceReviews(reviews, flood), [water]);
  assert.deepEqual(getServiceReviews(reviews, fire), [smoke]);
  assert.deepEqual(getServiceReviews(reviews, meth), [contamination]);
  assert.deepEqual(getServiceReviews(reviews, carpet), []);
});
