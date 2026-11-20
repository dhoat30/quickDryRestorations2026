import { BUSINESS_PHONE } from '@/utils/businessContact';
import ServiceContentSections from './ServiceContentSections';
import styles from './ServiceDetails.module.scss';

export default function ServiceDetails({ page, slug, children }) {
  return (
    <section className={styles.details} aria-label={page.label + ' service details'}>
      <div className={styles.layout}>
        <div>
          <h2>{page.scopeTitle}</h2>
          <ol className={styles.steps}>
            {page.steps.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
        <aside className={styles.panel} aria-labelledby="quote-guide">
          <h2 id="quote-guide">{page.quoteTitle}</h2>
          {page.rates ? (
            <dl className={styles.rates}>
              {page.rates.map(([label, price, detail]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd><strong>{price}</strong><span>{detail}</span></dd>
                </div>
              ))}
            </dl>
          ) : (
            <ul className={styles.checklist}>
              {page.checklist.map(item => <li key={item}>{item}</li>)}
            </ul>
          )}
          <p>{page.quoteNote}</p>
          {!page.rates && (
            <a className={styles.source} href={'https://www.quickdryrestorations.co.nz/' + slug}>
              Full service information
            </a>
          )}
        </aside>
      </div>
      <ServiceContentSections page={page} />
      {children}
      <div className={styles.followUp}>
        <h2>Questions about {page.label.toLowerCase()}</h2>
        {page.questions.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
        <div className={styles.actions}>
          {page.emergency && <a className={styles.call} href={`tel:${BUSINESS_PHONE.replace(/\s/g, '')}`}>Call {BUSINESS_PHONE}</a>}
          <a className={styles.quote} href="#get-free-quote">{page.action}</a>
        </div>
      </div>
    </section>
  );
}
