# Enquiry notifications and customer confirmations

`/api/sendmail` now sends two separate transactional messages after validating the enquiry and any photos:

1. The admin notification goes to `EMAIL_ADDRESS` and includes all prepared photo attachments.
2. Once Mailgun accepts the admin message, the customer receives a branded HTML acknowledgement with a plain-text alternative. It confirms the enquiry was received and says the team will get back to them soon. It includes their first name, the service when submitted from a service landing page, property address when supplied, next steps, a call link, and a reply address. A photo count appears only when photos are attached. It does not reattach photos or echo arbitrary customer messages.

The acknowledgement confirms receipt by the team, not a booking or quoted price. HubSpot submission continues through its existing separate endpoint. An email API success means Mailgun accepted both messages for delivery; it does not prove either landed in the inbox.

## Sender authentication and spam

Previously, the admin notification's From header was the customer's email address. Sending Gmail, Yahoo or other customer addresses through our Mailgun domain impersonates an unrelated sender and can fail DMARC alignment. This is a likely contributor to junk-folder placement; the headers from an affected message would confirm its exact authentication results.

Both outgoing messages use `QuickDry Restorations <enquiries@${MAILGUN_DOMAIN}>` by default, matching the configured verified Mailgun sending domain. The admin message sets Reply-To to the customer so staff can reply normally. The customer acknowledgement sets Reply-To to the business inbox configured in `MAILGUN_REPLY_TO` or `EMAIL_ADDRESS`.

The predeployment check confirmed the configured Mailgun domain is active and its sending DNS records are verified. No DNS or mailbox filtering settings were changed.

After deploying, check a real received message's original headers for SPF, DKIM and DMARC passes. Mark existing legitimate messages as Not spam and add the business sender to trusted contacts if needed. Authentication fixes do not guarantee inbox placement; sender reputation and recipient filtering also matter.

References: [Mailgun DMARC and Reply-To guidance](https://help.mailgun.com/hc/en-us/articles/13285772266011-DMARC), [Mailgun sending-domain verification](https://documentation.mailgun.com/docs/mailgun/user-manual/domains/domains-verify).

## Configuration

Existing variables continue to work without new secrets:

- `MAILGUN_DOMAIN`: verified sending domain.
- `MAILGUN_API_KEY`: existing server-only Mailgun credential.
- `EMAIL_ADDRESS`: admin recipient and default business Reply-To.
- Optional `MAILGUN_FROM_EMAIL`: a single sender address on the exact verified Mailgun domain. Defaults to `enquiries@${MAILGUN_DOMAIN}`.
- Optional `MAILGUN_REPLY_TO`: a single business address for customer replies. Defaults to `EMAIL_ADDRESS`.

The confirmation call button uses QuickDry's phone number, `09 971 1101`. The subject is `We've received your enquiry | QuickDry Restorations`.

Customer confirmations disable Mailgun tracking and set automatic-response headers. The template uses inline styling, presentation tables and system fonts. Its logo loads from the deployed quote site's `/logo.png`, with descriptive alternative text. All essential content remains visible with remote images blocked. Customer values are escaped, and arbitrary enquiry text is excluded from the customer template. Service names come from matching one of the five configured landing-page forms.

## Partial delivery and retries

If the admin notification fails, no customer confirmation is attempted. If the confirmation fails after admin acceptance, the endpoint returns a clear retry message and a signed admin-delivery receipt. The hero form retains that receipt and its original submission timestamp, and a retry sends only the confirmation. This receipt is bound to the recipient, quote details and image contents, expires after 24 hours, and uses the existing Mailgun key for its signature.

The hero's existing mounted-form state also skips any provider that already succeeded for an unchanged enquiry. Changes to fields or photos start a new delivery. These receipts are not a durable outbox: reloading the page resets client retry state, and ambiguous network failures can still cause duplicates. Legacy forms receive the acknowledgement through the same endpoint, but only the hero currently retains partial-delivery receipts for retries.

## Verification and preview

Run `node --test tests/*.test.mjs` and `npm run build`. Tests mock Mailgun; they cover sender alignment, both recipients, HTML escaping, attachments, header injection, failed sends and safe retries. No live admin or customer email was sent during this work.

[Open the sample confirmation](previews/enquiry-confirmation.html). The preview uses fictional details. It was inspected at desktop and mobile widths with no horizontal overflow. Browser preview is not a substitute for live Gmail/Outlook inbox rendering tests.
