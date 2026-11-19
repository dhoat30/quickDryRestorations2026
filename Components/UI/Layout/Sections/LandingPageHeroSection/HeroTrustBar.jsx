import Image from "next/image";
import Link from "next/link";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Stars } from "@/Components/UI/GoogleReviews/ReviewCards";
import { getReviewSummary } from "@/utils/reviews";
import reviews from "@/data/google-reviews.json";
import styles from "./LandingPageHeroSection.module.scss";

export default function HeroTrustBar() {
  const { averageRating, totalReviewCount } = getReviewSummary(reviews);

  return (
    <div className={styles.trustBar} aria-label="QuickDry credentials and Google reviews">
      <div className={styles.trustItem}>
        <VerifiedUserOutlinedIcon className={styles.trustIcon} aria-hidden="true" />
        <div>
          <strong>$5 million</strong>
          <span>Liability cover</span>
        </div>
      </div>
      <div className={styles.trustItem}>
        <LocationOnOutlinedIcon className={styles.trustIcon} aria-hidden="true" />
        <div>
          <strong>Auckland</strong>
          <span>Local team</span>
        </div>
      </div>
      {totalReviewCount > 0 && (
        <Link className={styles.googleTrust} href="/reviews">
          <Image src="/google-logo.png" alt="Google" width={30} height={30} />
          <div>
            <div className={styles.googleRating}>
              <strong>{averageRating.toFixed(1)}/5</strong>
              <Stars className={styles.trustStars} rating={averageRating} />
            </div>
            <span>{totalReviewCount} Google reviews</span>
          </div>
        </Link>
      )}
    </div>
  );
}
