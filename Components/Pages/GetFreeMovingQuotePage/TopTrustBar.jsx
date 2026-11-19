"use client";

import { BUSINESS_PHONE, BUSINESS_EMAIL } from "@/utils/businessContact";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Container from "@mui/material/Container";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import styles from "./GetFreeMovingQuotePage.module.scss";

const topBarItems = [
  { icon: <VerifiedOutlinedIcon sx={{ fontSize: 18 }} />, text: "Auckland Cleaning & Restoration" },
  { icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 18 }} />, text: "Homes & Commercial Properties" },
  { icon: <RequestQuoteOutlinedIcon sx={{ fontSize: 18 }} />, text: "24/7 Fire & Flood Response" },
];

const mobileSlides = [
  ...topBarItems,
  {
    icon: <MailOutlineIcon sx={{ fontSize: 18 }} />,
    text: BUSINESS_EMAIL,
    href: `mailto:${BUSINESS_EMAIL}`,
  },
];

export default function TopTrustBar() {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      dragFree: true,
    },
    [
      AutoScroll({
        speed: 0.8,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ]
  );

  return (
    <div className={styles.topBar}>
      <Container maxWidth="xl" className={styles.topBarInner}>
        <div className={styles.topBarDesktop}>
          <div className={styles.topBarItems}>
            {topBarItems.map((item) => (
              <div key={item.text} className={styles.topBarItem}>
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <a href={`mailto:${BUSINESS_EMAIL}`} className={styles.topBarLink}>
            <MailOutlineIcon sx={{ fontSize: 18 }} />
            <span>{BUSINESS_EMAIL}</span>
          </a>
        </div>

        <div className={`${styles.topBarMobile} embla`}>
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {mobileSlides.map((item) => {
                const content = (
                  <div className={styles.topBarMobileSlide}>
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                );

                return (
                  <div key={item.text} className={`embla__slide ${styles.topBarMobileSlideWrapper}`}>
                    {item.href ? (
                      <a href={item.href} className={styles.topBarMobileLink}>
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
