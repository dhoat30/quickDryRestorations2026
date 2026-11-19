'use client'
import { BUSINESS_PHONE, BUSINESS_EMAIL, BUSINESS_ADDRESS } from "@/utils/businessContact";
import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
// import EmailCircleIcon from "../Icons/EmailCircleIcon";
// import PhoneCircleIcon from "../Icons/PhoneCircleIcon";
// import LocationCircleIcon from "../Icons/LocationCircleIcon";
import Image from "next/image";
import styles from "./Footer.module.scss";
import Fab from '@mui/material/Fab';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const cleanPhoneHref = (phone) => `tel:${String(phone).replace(/[^+\d]/g, "")}`;

export default function ContactInfo({ contactInfo, className }) {
  const fallbackContactInfo = [
    BUSINESS_PHONE && {
      label: BUSINESS_PHONE,
      url: cleanPhoneHref(BUSINESS_PHONE),
      icon: <LocalPhoneIcon fontSize="small" />,
      type: "phone",
    },
    BUSINESS_EMAIL && {
      label: BUSINESS_EMAIL,
      url: `mailto:${BUSINESS_EMAIL}`,
      icon: <EmailIcon fontSize="small" />,
      type: "email",
    },
    BUSINESS_ADDRESS && {
      label: BUSINESS_ADDRESS,
      url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS)}`,
      icon: <LocationOnIcon fontSize="small" />,
      type: "address",
    },
  ].filter(Boolean);

  const backendContactInfo = contactInfo?.info?.filter((info) => info?.url && info?.label) || [];
  const contactItems = backendContactInfo.length > 0 ? backendContactInfo : fallbackContactInfo;
  const phoneItem = contactItems.find((info) => info.type === "phone" || info.url?.startsWith("tel:"));

  if (contactItems.length === 0) return null;

  const infoComponent = contactItems.map((info, index) => {
    return (
      <Link href={info.url} key={index} className={`${styles.infoWrapper} flex gap-8 align-center mb-8`}>
        {info.icon?.url ? (
          <Image src={info.icon.url} alt={info.icon.alt} width={info.icon.width} height={info.icon.height} />
        ) : (
          <span className={styles.infoIcon}>{info.icon}</span>
        )}
        <div className={`footer-contact-label body2`}  dangerouslySetInnerHTML={{ __html: info.label }}></div>
      </Link>
    );
  });
  return (
    <>
    <div className={`${className} ${styles.contactInfoWrapper} footer-contact-wrapper flex flex-column gap-8`} id="contact">
      <Typography variant="subtitle1" component="div" sx={{ marginBottom: "8px" }}>
        Contact
      </Typography>
      {infoComponent}
    </div>


      {phoneItem && (
        <Fab className={styles.fabPhone} href={phoneItem.url} aria-label="Phone" > <LocalPhoneIcon sx={{fontSize: "2rem", color: "var(--light-on-primary)"}}/> </Fab>
      )}

    </>
  );
}
