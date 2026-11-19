# Predeployment check

Checked locally on 20 November 2026. No deployment was performed.

## Verification

- A fresh `npm ci` and production build succeeded with Node 24. The production build also succeeded without the local `.env` file.
- `npm run lint` completed with no warnings or errors.
- All 54 tests passed.
- `npm audit` reported zero vulnerabilities, including development dependencies.
- The home page, five service pages, reviews, thank-you page, sitemap and robots file returned HTTP 200. An unknown URL returned 404. The old vinyl URL redirected to the current URL with HTTP 308.
- All 57 unique local images referenced by generated page markup exist and passed Next.js image optimization.
- No configured server API key, secret or token values were found in the 32 generated client JavaScript files.
- Malformed JSON, `null` and array requests returned HTTP 400 for the email, HubSpot, Google Ads and Meta endpoints. GET on the Meta endpoint returned HTTP 405.
- Browser checks covered required form validation, a simulated temporary HubSpot failure, retry and the thank-you page. The successful email requests were not repeated on retry. These checks used fake credentials and mocked providers. They did not create a real contact or send an email.
- The sticky desktop form was checked at 1440 × 1080 and 1440 × 700. It stops at the hero boundary and allows the submit button to remain reachable when the form is taller than the available space. At 390 × 844 the form remains in the normal stacked layout with no horizontal overflow.

## Corrections made during the check

- Matched the submitted property address to the live HubSpot form's `address` field. Email rendering continues to support the older `property_address` name.
- Replaced a deleted thank-you image with an existing MUI success icon.
- Fixed malformed request handling and an ignored Meta upstream failure. Removed its invalid GET handler.
- Added noninteractive ESLint configuration and corrected the issues it found, including hook ordering, link usage and a missing section component reference.
- Guarded the active-section hook against missing elements.
- Prevented GTM requests with an unset or invalid container ID.
- Added the desktop sticky form wrapper. The two-column breakpoint remains 1101px.

## Deployment configuration

Use Node 24 and copy the appropriate local environment values into Vercel's Production environment. The local `.env` file is ignored by Git and is not transferred automatically.

The active quote flow uses these settings.

```text
GTM_ID
NEXT_PUBLIC_SITE_URL=https://quote.quickdryrestorations.co.nz
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
NEXT_PUBLIC_HUBSPOT_PORTAL_ID
NEXT_PUBLIC_HUBSPOT_QUOTE_FORM_ID
HUBSPOT_API_KEY
MAILGUN_API_KEY
MAILGUN_DOMAIN
EMAIL_ADDRESS
```

If configured locally, also transfer `MAILGUN_FROM_EMAIL` and `MAILGUN_REPLY_TO`. Keep the sender on the authenticated Mailgun domain. The current configured domain was active and its sending DNS records validated through Mailgun's API.

Leave `NEXT_PUBLIC_QUOTE_PHOTOS_ENABLED` unset or `false` to keep uploads hidden. Review sections read the saved review JSON. Review synchronization credentials are needed only to fetch updated review data.

Include new source files, images and `.gitignore` in the Git changes sent to Vercel. New components and service media currently include untracked files.

## Items still requiring attention

### HubSpot click ID

The live HubSpot form does not contain `hs_google_click_id`. The website forwards this property when a valid Google click ID is available. The user authorized adding it as a hidden field.

Three API update attempts were rejected with HTTP 400 validation errors. Read-back checks confirmed the field was not added and the existing fields were preserved. The browser account could not open the form editor. The exact cause of the API validation failure is unverified, and the connected token also lacks permission to inspect the CRM property's definition.

Resolve the form update or account access in HubSpot before relying on click-ID capture. A real end-to-end submission to HubSpot and Mailgun has not been performed during this audit.

### Optional advertising integrations

The optional server Google Ads integration is unconfigured in the local environment and still defaults to API v21. Review and migrate its version and authentication before enabling it. See Google's [API sunset schedule](https://developers.google.com/google-ads/api/docs/sunset-dates) and [deprecation guidance](https://developers.google.com/google-ads/api/docs/deprecations). The Meta server integration is also unconfigured. GTM conversion delivery requires its own container and Google Ads verification after deployment.

### Legacy components and framework logging

Six unused legacy moving/removal components reference missing helper or component files. They are outside the current route dependency graph and do not affect the verified production build. Resolve them if those legacy components are brought back into use.

Unknown slugs correctly return 404, but the current Next.js version logs `Internal: NoFallbackError` when `dynamicParams = false` rejects them. This matches a [reported Next.js issue](https://github.com/vercel/next.js/issues/90537). It does not change the verified HTTP status.

Next.js also prints a deprecation notice for `next lint`. The configured lint command currently passes. Move to the ESLint CLI as part of a future Next.js upgrade.
