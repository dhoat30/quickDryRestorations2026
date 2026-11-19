# QuickDry Restorations conversion

The local project now uses QuickDry Restorations branding and content, based on https://quote.quickdryrestorations.co.nz/ and its public CMS entry `quick-dry-restoration`.

- The homepage links to five service landing pages: carpet cleaning, fire restoration, flood restoration, vinyl floor cleaning and meth decontamination. Each uses the matching service page on www.quickdryrestorations.co.nz as its source.
- Logo and optimised service and comparison photos are stored locally. Run `npm run sync:reviews` to refresh the saved Google reviews using the configured Place ID, then rebuild to update the landing pages. A service page shows five-star reviews that mention its work, newest first. The section appears when at least one review matches.
- Contact details match the live quote website: 09 971 1101, info@quickdryrestorations.co.nz, 13 Westglen Place, Ranui, Auckland 0612.
- The homepage no longer loads content from the junk-removal CMS entry.
- Canonical URLs, sitemap, robots directive and confirmation emails use the QuickDry quote domain.

## Integration configuration

The existing HubSpot and Mailgun credentials are retained. Set `NEXT_PUBLIC_SITE_URL=https://quote.quickdryrestorations.co.nz` on the deployment host. `EMAIL_ADDRESS` remains the admin recipient and default reply-to address; it should point to QuickDry’s inbox. `MAILGUN_DOMAIN` and sender must correspond to the existing verified domain, without assuming that QuickDry’s root domain is verified.

The photo property retains the inherited `junk_photo` default for compatibility. Set `NEXT_PUBLIC_HUBSPOT_PHOTO_FIELD` to the actual file-upload property in the destination QuickDry form. Confirm that the portal, form, address and file field match that form before live submissions. No real customer enquiry was sent during this conversion.

Historical documentation describing the previous project is retained for reference; it does not establish QuickDry deployment or provider verification.
