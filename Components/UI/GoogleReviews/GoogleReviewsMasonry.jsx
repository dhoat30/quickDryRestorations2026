import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ReviewCards, { Stars } from "./ReviewCards";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  getReviewRating, getReviewSummary, getReviewText,
  getSortedReviews, HOMEPAGE_REVIEW_LIMIT,
} from "@/utils/reviews";
import GoogleIcon from "../Icons/GoogleIcon";
import styles from "./GoogleReviewsMasonry.module.scss";

export default function GoogleReviewsMasonry({
  data,
  title = "What QuickDry customers say",
  description = "Read customer feedback about QuickDry Restorations’ cleaning services in Auckland.",
  preview = true,
  limit = HOMEPAGE_REVIEW_LIMIT,
  asPage = false,
}) {
  const reviews = getSortedReviews(data);

  if (!Array.isArray(reviews) || reviews.length === 0) return null;

  const selected = preview ? reviews.filter((review) => {
    const text = getReviewText(review);
    return getReviewRating(review) === 5 && typeof text === "string" && text.trim().length > 0;
  }) : reviews;
  const visibleReviews = Number.isInteger(limit) ? selected.slice(0, limit) : selected;

  if (visibleReviews.length === 0) return null;

  const { averageRating, totalReviewCount } = getReviewSummary(data);

  return (
    <section id="google-reviews" className={`${styles.section} ${asPage ? styles.fullPage : ""}`} aria-labelledby="reviews-title">
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerText}>
            <Typography variant="h2" component={asPage ? "h1" : "h2"} className={styles.title} id="reviews-title">
              {title}
            </Typography>
            <Typography component="p" className={styles.description}>
              {description}
            </Typography>
          </div>

          <div className={styles.summary}>
            <div className={styles.score}>{averageRating.toFixed(1)}</div>
            <div className={styles.summaryMeta}>
              <Stars className={styles.summaryStars} rating={Number(averageRating.toFixed(1))} />
              <Typography component="p" className={styles.summaryCount}>
                <strong>{totalReviewCount} reviews</strong>
                <span>from Google</span>
              </Typography>
            </div>
            <div className={styles.summaryLogo}>
              <GoogleIcon />
            </div>
          </div>
        </div>

        <ReviewCards reviews={visibleReviews} showSource={asPage} showResponse={asPage} />
        {preview ? (
          <div className={styles.actions}>
            <Button href="/reviews" variant="contained" size="large" endIcon={<ArrowForwardIcon />}>
              Read all reviews
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
