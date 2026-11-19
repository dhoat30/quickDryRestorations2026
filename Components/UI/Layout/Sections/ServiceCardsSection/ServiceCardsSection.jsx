import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import YardOutlinedIcon from "@mui/icons-material/YardOutlined";
import GarageOutlinedIcon from "@mui/icons-material/GarageOutlined";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import { RESTORATION_SERVICE_CARDS } from "@/utils/restorationServices";
import styles from "./ServiceCardsSection.module.scss";

const SERVICE_ICONS = {
  fire: LocalFireDepartmentOutlinedIcon,
  flood: WaterDropOutlinedIcon,
  floor: LayersOutlinedIcon,
  decontamination: HealthAndSafetyOutlinedIcon,
  household: HomeOutlinedIcon,
  furniture: ChairOutlinedIcon,
  appliances: KitchenOutlinedIcon,
  garden: YardOutlinedIcon,
  clearance: GarageOutlinedIcon,
  estate: VolunteerActivismOutlinedIcon,
  tenancy: VpnKeyOutlinedIcon,
  building: ConstructionOutlinedIcon,
};

export default function ServiceCardsSection({
  title = "Cleaning services for your home",
  description,
  cards = RESTORATION_SERVICE_CARDS,
  quoteHref = "/#get-free-quote",
  columns = 4,
}) {
  if (!cards?.length) return null;

  return (
    <section id="our-services" className={styles.section}>
      <Container maxWidth="xl">
        <div className={styles.header}>
          <Typography variant="h2" component="h2" className={styles.title}>
            {title}
          </Typography>
          {description ? (
            <Typography variant="body1" component="p" className={styles.introduction}>
              {description}
            </Typography>
          ) : null}
        </div>

        <div className={`${styles.grid} ${columns === 3 ? styles.threeColumns : ""}`}>
          {cards.map((card) => {
            const Icon = SERVICE_ICONS[card.icon] || HomeOutlinedIcon;
            return (
              <article id={card.id} key={card.title} className={styles.card}>
                <div className={styles.iconWrapper} aria-hidden="true">
                  <Icon />
                </div>
                <Typography variant="h5" component="h3" className={styles.cardTitle}>
                  {card.title}
                </Typography>
                <Typography variant="body1" component="p" className={styles.cardDescription}>
                  {card.description}
                </Typography>
                <Button
                  component="a"
                  href={card.cta_link?.url || quoteHref}
                  variant="outlined"

                  aria-label={`View ${card.title} details`}
                  className={styles.priceButton}
                >
                  View service
                </Button>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
