"use client";

import { useEffect, useRef } from "react";
import styles from "./LandingPageHeroSection.module.scss";

export default function StickyFormColumn({ children }) {
  const columnRef = useRef(null);

  useEffect(() => {
    const column = columnRef.current;
    const header = document.querySelector(".header-offset");
    const updatePosition = () => {
      const headerOffset = (header?.offsetHeight || 0) + 16;
      // Tall forms scroll until their submit button fits above the viewport edge.
      const bottomOffset = window.innerHeight - column.offsetHeight - 16;
      column.style.setProperty("--quote-form-sticky-top", `${Math.min(headerOffset, bottomOffset)}px`);
    };

    const observer = new ResizeObserver(updatePosition);
    observer.observe(column);
    if (header) observer.observe(header);
    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    <div ref={columnRef} className={styles.formColumn} id="get-free-quote">
      {children}
    </div>
  );
}
