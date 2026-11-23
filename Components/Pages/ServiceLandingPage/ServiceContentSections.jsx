import Image from 'next/image';
import { BUSINESS_PHONE } from '@/utils/businessContact';
import styles from './ServiceDetails.module.scss';

export default function ServiceContentSections({ page }) {
  return (
    <>
      {page.cleaningNeeds && (
        <section className={styles.contentSection} aria-labelledby="cleaning-needs-title">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>A clean that suits your home</p>
            <h2 id="cleaning-needs-title">{page.cleaningNeeds.title}</h2>
            <p>{page.cleaningNeeds.intro}</p>
          </div>
          <div className={styles.needsGrid}>
            {page.cleaningNeeds.cards.map(([title, text]) => (
              <article className={styles.needsCard} key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {page.pricing && (
        <section className={styles.contentSection} aria-labelledby="extra-pricing-title">
          <div className={styles.sectionIntro}>
            {page.pricing.eyebrow && <p className={styles.eyebrow}>{page.pricing.eyebrow}</p>}
            <h2 id="extra-pricing-title">{page.pricing.title}</h2>
            <p>{page.pricing.intro}</p>
          </div>
          <div className={styles.pricingGroups}>
            {page.pricing.groups.map(group => (
              <details className={styles.pricingGroup} key={group.title} open={group.initiallyOpen}>
                <summary>{group.title}</summary>
                <div className={styles.pricingBody}>
                  <div className={styles.tableWrap}>
                    <table>
                      <caption className={styles.srOnly}>{group.title}</caption>
                      <thead>
                        <tr>{group.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr>
                      </thead>
                      <tbody>
                        {group.rows.map(([label, ...values]) => (
                          <tr key={label}>
                            <th scope="row">{label}</th>
                            {values.map((value, index) => <td key={index}>{value}</td>)}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {group.note && <p className={styles.pricingNote}>{group.note}</p>}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {page.visitPlanning && (
        <section className={`${styles.contentSection} ${styles.visitPlanning}`} aria-labelledby="visit-planning-title">
          <Image
            src={page.visitPlanning.image.src}
            alt={page.visitPlanning.image.alt}
            width={page.visitPlanning.image.width}
            height={page.visitPlanning.image.height}
            sizes="(max-width: 760px) 100vw, (max-width: 1256px) 40vw, 490px"
            className={styles.visitPhoto}
          />
          <div className={styles.visitCopy}>
            <h2 id="visit-planning-title">{page.visitPlanning.title}</h2>
            {page.visitPlanning.items.map(([heading, body]) => (
              <div key={heading}>
                <h3>{heading}</h3>
                <p>{body}</p>
              </div>
            ))}
            <div className={styles.actions}>
              <a className={styles.quote} href="#get-free-quote">{page.action}</a>
            </div>
          </div>
        </section>
      )}

      {page.assurance && (
        <section className={`${styles.contentSection} ${styles.assurance}`} aria-labelledby="service-assurance-title">
          <h2 id="service-assurance-title">{page.assurance.title}</h2>
          <div className={styles.assuranceGrid}>
            {page.assurance.cards.map(([title, text]) => (
              <div key={title}>
                <span className={styles.assuranceCheck} aria-hidden="true">✓</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {page.coverage && (
        <section className={`${styles.contentSection} ${styles.coverage}`} aria-labelledby="service-coverage-title">
          <div>
            <p className={styles.eyebrow}>Your local Auckland team</p>
            <h2 id="service-coverage-title">{page.coverage.title}</h2>
            <p>{page.coverage.intro}</p>
            <p>{page.coverage.note}</p>
          </div>
          <div className={styles.coverageCta}>
            <a className={styles.quote} href="#get-free-quote">Get my carpet quote</a>
            <a className={styles.phoneLink} href={`tel:${BUSINESS_PHONE.replace(/\s/g, '')}`}>Or call {BUSINESS_PHONE}</a>
          </div>
        </section>
      )}
    </>
  );
}
