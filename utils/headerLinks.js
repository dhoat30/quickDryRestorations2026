import { LANDING_PAGE_LINKS } from './serviceLandingPages.mjs';
export const headerLinks = [
 { id: 'services', label: 'Our Services', url: '/#our-services', width: '380px', subLinks: LANDING_PAGE_LINKS.map(page => ({label: page.label, url: '/' + page.slug})) },
 {label: 'Our Work', url: '/#before-after-gallery'},
 {label: 'Reviews', url: '/#google-reviews'},
 {label: 'Contact Us', url: '/#contact'},
];
