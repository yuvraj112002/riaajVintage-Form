import emailjs from "emailjs-com";
type FormData = {
  // brands: string[];
  budgetFrom?: number;
  budgetTo?: number;
  // businessType: string;
  categories: Array<{
    name: string; grade: string; size: string; color: string; quantity: number; description?: string;
  }>;
  company?: string;
  consent: boolean;
  currency: string;
  date: Date;
  email: string;
  name: string;
  notes?: string;
  region: string;
  scheduleTimezone: string;
  timeSlot: string;
  timezone: string;
  whatsapp: string;
};

const fmtDate = (d: Date) =>
  new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(d);

function buildSummaryHTML(v: FormData) {
  // const brandChips = (v.brands || []).map(b =>
  //   `<span style="display:inline-block;padding:4px 8px;border:1px solid #ddd;border-radius:999px;margin:0 6px 6px 0;font-size:12px;">${b}</span>`
  // ).join("");

  const rows = (v.categories || []).map((c, i) => `
    <tr>
      <td style="padding:8px;border:1px solid #eee;">${i+1}</td>
      <td style="padding:8px;border:1px solid #eee;">${c.name}</td>
      <td style="padding:8px;border:1px solid #eee;">${c.grade}</td>
      <td style="padding:8px;border:1px solid #eee;">${c.size || "-"}</td>
      <td style="padding:8px;border:1px solid #eee;">${c.color || "-"}</td>
      <td style="padding:8px;border:1px solid #eee;">${c.quantity}</td>
      <td style="padding:8px;border:1px solid #eee;">${c.description || "-"}</td>
    </tr>
  `).join("");

  const budget = [
    v.currency ? `Currency: <b>${v.currency}</b>` : "",
    v.budgetFrom != null ? `From: <b>${v.budgetFrom}</b>` : "",
    v.budgetTo != null ? `To: <b>${v.budgetTo}</b>` : ""
  ].filter(Boolean).join(" &nbsp; ");

  return `
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#111;line-height:1.5;">
    <tr>
      <td style="padding:12px;border:1px solid #eee;background:#fafafa;width:180px;">Name</td>
      <td style="padding:12px;border:1px solid #eee;">${v.name}</td>
    </tr>
    <tr>
      <td style="padding:12px;border:1px solid #eee;background:#fafafa;">Email</td>
      <td style="padding:12px;border:1px solid #eee;">${v.email}</td>
    </tr>
    <tr>
      <td style="padding:12px;border:1px solid #eee;background:#fafafa;">WhatsApp</td>
      <td style="padding:12px;border:1px solid #eee;">${v.whatsapp}</td>
    </tr>
    <tr>
      <td style="padding:12px;border:1px solid #eee;background:#fafafa;">Company / Type</td>
      <td style="padding:12px;border:1px solid #eee;">${v.company || "-"} </td>
    </tr>
    <tr>
      <td style="padding:12px;border:1px solid #eee;background:#fafafa;">Region / TZ</td>
      <td style="padding:12px;border:1px solid #eee;">${v.region} &nbsp; | &nbsp; ${v.timezone}</td>
    </tr>

  

    <tr>
      <td style="padding:12px;border:1px solid #eee;background:#fafafa;">Budget</td>
      <td style="padding:12px;border:1px solid #eee;">${budget || "-"}</td>
    </tr>

    <tr>
      <td colspan="2" style="padding:0;border:none;"></td>
    </tr>

    <tr>
      <td colspan="2" style="padding:0;border:none;">
        <h3 style="margin:16px 0 8px;">Categories</h3>
        <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
          <thead>
            <tr>
              <th style="padding:8px;border:1px solid #eee;background:#f5f5f5;text-align:left;">#</th>
              <th style="padding:8px;border:1px solid #eee;background:#f5f5f5;text-align:left;">Category</th>
              <th style="padding:8px;border:1px solid #eee;background:#f5f5f5;text-align:left;">Grade</th>
              <th style="padding:8px;border:1px solid #eee;background:#f5f5f5;text-align:left;">Size</th>
              <th style="padding:8px;border:1px solid #eee;background:#f5f5f5;text-align:left;">Color</th>
              <th style="padding:8px;border:1px solid #eee;background:#f5f5f5;text-align:left;">Qty</th>
              <th style="padding:8px;border:1px solid #eee;background:#f5f5f5;text-align:left;">Description</th>
            </tr>
          </thead>
          <tbody>${rows || `
            <tr><td colspan="7" style="padding:10px;border:1px solid #eee;">No categories provided.</td></tr>`}
          </tbody>
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:12px;border:1px solid #eee;background:#fafafa;">Schedule</td>
      <td style="padding:12px;border:1px solid #eee;">
        Date: <b>${fmtDate(v.date)}</b> &nbsp; | &nbsp; Slot: <b>${v.timeSlot}</b> &nbsp; | &nbsp; TZ: <b>${v.scheduleTimezone}</b>
      </td>
    </tr>

    <tr>
      <td style="padding:12px;border:1px solid #eee;background:#fafafa;">Notes</td>
      <td style="padding:12px;border:1px solid #eee;white-space:pre-wrap;">${(v.notes || "-")
        .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</td>
    </tr>

    <tr>
      <td style="padding:12px;border:1px solid #eee;background:#fafafa;">Consent</td>
      <td style="padding:12px;border:1px solid #eee;">${v.consent ? "✅ Granted" : "❌ Not granted"}</td>
    </tr>
  </table>
  `;
}
const currentDate = new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata",
});


export async function sendHandpickEmail(values: FormData) {
  const summary_html = buildSummaryHTML(values);



  const serviceId  = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const publicKey  = import.meta.env.VITE_EMAIL_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS env vars missing. Check .env and restart dev server.");
  }

  const templateParams = {
    summary_html,
    submittedAt: currentDate,
    name: values.name,
    email: values.email,
    whatsapp: values.whatsapp,
    region: values.region,
    timezone: values.timezone,
  };

  const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
}

