import Container from "@mui/material/Container";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import styles from "./ThankYou.module.scss";
export default function ThankYou({
  title = "Thanks for your enquiry.",
  description = "The QuickDry Restorations team has received your enquiry. We’ll be in touch to discuss your needs and arrange your quote.",
}) {
  return (
    <section className={`${styles.section} flex align-center justify-center`}>
      <Container maxWidth="sm" className={`${styles.container} border-radius-12`}>
        <div className={styles.imageContainer} style={{ textAlign: "center" }}>
          <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 88 }} aria-hidden="true" />
        </div>
        <div className="content-wrapper mt-16">
          <Typography
            variant="h4"
            component="h1"
            align="center"
            color="var(--light-on-surface)"
          >
            {title}
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            align="center"
            color="var(--light-on-surface-variant)"
          >
            {description}
          </Typography>
          <div className="button-wrapper mt-16 flex justify-center align-center gap-16 flex-wrap">
            <Link href="/">
              <Button variant="outlined" color="primary" size="large">
                Go back
              </Button>
            </Link>
        
          </div>
        </div>
      </Container>
    </section>
  );
}
