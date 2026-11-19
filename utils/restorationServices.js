import { SERVICE_LANDING_PAGES } from './serviceLandingPages.mjs';

export const RESTORATION_SERVICE_CARDS = Object.entries(SERVICE_LANDING_PAGES).map(([slug, page]) => ({
  title: page.label,
  description: page.card,
  icon: page.icon,
  cta_link: { url: '/' + slug },
}));

export const DEFAULT_SERVICE_CARDS_SECTION = {
  title: 'Cleaning and restoration services in Auckland',
  cards: RESTORATION_SERVICE_CARDS,
};
