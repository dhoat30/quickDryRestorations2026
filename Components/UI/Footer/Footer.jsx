import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Copyright from "./Copyright";
import ContactInfo from "./ContactInfo";
import FooterCta from "../CTA/FooterCta";
import styles from "./Footer.module.scss";
import Link from "next/link";
import { LANDING_PAGE_LINKS } from "@/utils/serviceLandingPages.mjs";
export default function Footer({
  footerCtaData,
  showFooterCta = true,
  contactInfo,
}) {
  return (
    <>
      {showFooterCta && (
        <FooterCta
          title={footerCtaData.title}
          description={footerCtaData.description}
          ctaArray={footerCtaData.cta}
        />
      )}

      <div className={`${styles.footerSection}`}>
        <Container maxWidth="xl" className="row">
          <div className={`${styles.footerWrapper}`}>
            <div className={`${styles.footerMessage}`}>
              <Typography component="p" variant="overline" className={`${styles.eyebrow}`}>
                QuickDry Restorations Auckland
              </Typography>
              <Typography component="h2" variant="h5" className={`${styles.messageTitle}`}>
             Speak with the Auckland team
              </Typography>
              <Typography component="p" variant="body1" className={`${styles.messageText}`}>
Call for urgent fire or flood restoration. For planned work, tell us about the property and the service you need.              </Typography>
            </div>

            <div className={`${styles.contactWrapper}`}>

              <div className="contact-section">
           
                <ContactInfo contactInfo={contactInfo} />
              </div>


            </div>
          </div>
          <nav className={styles.serviceLinks} aria-label="Cleaning and restoration services">
            {LANDING_PAGE_LINKS.map(page => <Link key={page.slug} href={`/${page.slug}`}>{page.label}</Link>)}
          </nav>
        </Container>
      </div>
      {/* copyright container */}
      <Copyright />
    </>
  );
}
