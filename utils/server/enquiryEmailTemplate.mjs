import { SERVICE_LANDING_PAGES } from "../serviceLandingPages.mjs";

const siteUrl = "https://quote.quickdryrestorations.co.nz";
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

export function enquiryEmailTemplate(payload, imageCount, replyTo) {
  const fields = new Map((payload.hubspotFormObject || []).filter(field => typeof field?.value === "string").map(field => [field.name, field.value.trim()]));
  const firstName = (fields.get("firstname") || "").split(/\s+/)[0].slice(0, 80) || "there";
  const propertyAddress = fields.get("address") || fields.get("property_address");
  const phone = "09 971 1101";
  const phoneLink = phone.replace(/[^+\d]/g, "");
  const service = Object.values(SERVICE_LANDING_PAGES).find(page => payload.formName === `QuickDry ${page.label} Enquiry`)?.label;
  const photoLine = `${imageCount} photo${imageCount === 1 ? "" : "s"} received`;
  const details = [
    [service ? "Service" : "Enquiry", service || "Cleaning and restoration"],
    ...(propertyAddress ? [["Property", propertyAddress.slice(0, 500)]] : []),
    ...(imageCount ? [["Photos", photoLine]] : []),
  ];
  const text = `Hi ${firstName},\n\nThanks for getting in touch with QuickDry Restorations. We've received your enquiry and will get back to you soon.\n\nOur team will review your details, then contact you to discuss what you need and the next steps.\n\n${details.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nNeed to add anything? Simply reply to this email. If you'd prefer to speak with the team, call ${phone}.\n\nThanks,\nThe QuickDry Restorations team\n${replyTo}\n${siteUrl}\n\nYou're receiving this confirmation because an enquiry was submitted on our website using this email address.`;
  const rows = details.map(([label, value]) => `<tr><td width="82" style="padding:8px 12px 8px 0;vertical-align:top;font-size:13px;line-height:22px;color:#5c6e79;">${escapeHtml(label)}</td><td style="padding:8px 0;font-size:14px;line-height:22px;font-weight:bold;color:#173b50;word-break:break-word;">${escapeHtml(value)}</td></tr>`).join("");
  const html = `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>We've received your enquiry | QuickDry Restorations</title>
<style>@media only screen and (max-width:600px){.outer{padding:16px 10px!important}.content{padding:28px 24px!important}.header{padding:24px!important}.hero{padding:30px 24px!important}.title{font-size:29px!important;line-height:36px!important}.footer{padding:24px!important}}</style></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:Arial,Helvetica,sans-serif;color:#344854;-webkit-text-size-adjust:100%;">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">Your enquiry is with the QuickDry team. We’ll get back to you soon.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f0f4f8;"><tr><td class="outer" align="center" style="padding:40px 16px;">
<!--[if mso]><table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border:1px solid #dce5ed;border-top:5px solid #174b70;border-radius:16px;overflow:hidden;">
<tr><td class="header" style="padding:28px 36px;"><a href="${siteUrl}" style="display:inline-block;text-decoration:none;"><img src="${siteUrl}/logo.png" width="195" height="63" alt="QuickDry Restorations" border="0" style="display:block;width:195px;max-width:100%;height:auto;font-size:20px;font-weight:bold;color:#174b70;"></a></td></tr>
<tr><td class="hero" bgcolor="#eef5fa" style="padding:32px 36px;background:#eef5fa;border-top:1px solid #e3edf4;border-bottom:1px solid #e3edf4;">
<p style="margin:0 0 12px;font-size:11px;line-height:18px;font-weight:bold;letter-spacing:1.5px;color:#174b70;">ENQUIRY RECEIVED</p>
<h1 class="title" style="margin:0 0 12px;font-size:34px;line-height:41px;font-weight:700;color:#123b53;">We’ve received<br>your enquiry.</h1>
<p style="margin:0;font-size:18px;line-height:28px;color:#174b70;">We’ll get back to you soon.</p>
</td></tr>
<tr><td class="content" style="padding:32px 36px 36px;">
<p style="margin:0 0 14px;font-size:16px;line-height:26px;color:#173b50;">Hi ${escapeHtml(firstName)},</p>
<p style="margin:0 0 24px;font-size:16px;line-height:26px;">Thanks for getting in touch with QuickDry Restorations. Our team will review your details, then contact you to discuss what you need and the next steps.</p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f6f8fb;border:1px solid #e3eaf1;border-radius:10px;"><tr><td style="padding:18px 20px;"><h2 style="margin:0 0 8px;font-size:15px;line-height:22px;color:#173b50;">Your enquiry</h2><table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">${rows}</table></td></tr></table>
<h2 style="margin:26px 0 8px;font-size:18px;line-height:26px;color:#173b50;">Need to add anything?</h2>
<p style="margin:0 0 20px;font-size:15px;line-height:25px;">Simply reply to this email. If you’d prefer to speak with the team, give us a call.</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td bgcolor="#174b70" style="border-radius:8px;mso-padding-alt:14px 22px;"><a href="tel:${escapeHtml(phoneLink)}" style="display:inline-block;padding:14px 22px;font-size:15px;font-weight:bold;line-height:22px;color:#ffffff;text-decoration:none;">Call ${escapeHtml(phone)}</a></td></tr></table>
<p style="margin:26px 0 0;font-size:15px;line-height:25px;">Thanks,<br><strong style="color:#173b50;">The QuickDry Restorations team</strong></p>
</td></tr>
<tr><td class="footer" style="padding:24px 36px;background:#f8fafc;border-top:1px solid #e3eaf1;"><p style="margin:0 0 10px;font-size:12px;line-height:20px;color:#174b70;">Honest advice &nbsp;·&nbsp; Free quotes &nbsp;·&nbsp; No obligation</p><p style="margin:0;font-size:12px;line-height:21px;word-break:break-word;"><a href="mailto:${escapeHtml(replyTo)}" style="color:#516775;text-decoration:underline;">${escapeHtml(replyTo)}</a><br><a href="${siteUrl}" style="color:#516775;text-decoration:underline;">quote.quickdryrestorations.co.nz</a></p></td></tr>
</table>
<!--[if mso]></td></tr></table><![endif]-->
<p style="max-width:520px;margin:20px auto 0;padding:0 16px;font-size:11px;line-height:18px;color:#667985;">You’re receiving this confirmation because an enquiry was submitted on our website using this email address.</p>
</td></tr></table></body></html>`;
  return { subject: "We've received your enquiry | QuickDry Restorations", text, html };
}
