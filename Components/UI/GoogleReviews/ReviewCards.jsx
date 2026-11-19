import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  formatReviewDate, getReviewRating, getReviewText,
} from "@/utils/reviews";
import GoogleIcon from "../Icons/GoogleIcon";
import styles from "./GoogleReviewsMasonry.module.scss";

const STARS = Array.from({ length: 5 });

export function Stars({ className, rating = 5 }) {
  return (
    <div className={className} role="img" aria-label={`${rating} out of 5 stars`}>
      {STARS.map((_, index) => {
        const Icon = index < Math.round(rating) ? StarIcon : StarBorderIcon;
        return <Icon key={index} aria-hidden="true" sx={{ color: "#FABB05", fontSize: "1rem" }} />;
      })}
    </div>
  );
}

function ReviewCard({ review, index, showSource, showResponse }) {
  const name = review.name ?? review.user?.name ?? "Google reviewer";
  const text = getReviewText(review);
  const rating = getReviewRating(review);
  const avatar = review.reviewerPhotoUrl ?? review.user?.thumbnail;
  const absoluteDate = formatReviewDate(review.iso_date);
  const displayDate = absoluteDate || review.date;

  return (
    <figure className={styles.reviewCard} id={`review-${index + 1}`}>
      <div className={styles.reviewHead}>
        {avatar ? (
          <Image
            className={styles.avatar}
            src={avatar}
            alt={`${name} profile picture`}
            width={44}
            height={44}
          />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {name?.trim()?.charAt(0)?.toUpperCase() || "?"}
          </span>
        )}

        <figcaption className={styles.reviewMeta}>
          <Typography component="h3" className={styles.reviewName}>
            {name}
          </Typography>
          <div className={styles.reviewSub}>
            <Stars className={styles.reviewStars} rating={rating} />
            {displayDate ? (
              <time className={styles.reviewDate} dateTime={review.iso_date}>{displayDate}</time>
            ) : null}
          </div>
        </figcaption>

        <span className={styles.reviewLogo}>
          <GoogleIcon />
        </span>
      </div>

      {text.trim() ? (
        <blockquote className={styles.reviewText}>{text}</blockquote>
      ) : (
        <p className={`${styles.reviewText} ${styles.ratingOnly}`}>Rated {rating} out of 5.</p>
      )}
      {showResponse && review.response?.snippet ? (
        <details className={styles.response}>
          <summary>Response from QuickDry Restorations</summary>
          <p>{review.response.snippet}</p>
        </details>
      ) : null}
      {showSource && review.link ? (
        <a href={review.link} className={styles.sourceLink} target="_blank" rel="noopener noreferrer">
          View on Google <ArrowForwardIcon aria-hidden="true" />
        </a>
      ) : null}
    </figure>
  );
}

export default function ReviewCards({ reviews, offset = 0, showSource = false, showResponse = false }) {
  return (
    <div className={styles.masonry}>
      {reviews.map((review, index) => (
        <ReviewCard
          key={review.review_id ?? index}
          review={review}
          index={offset + index}
          showSource={showSource}
          showResponse={showResponse}
        />
      ))}
    </div>
  );
}
