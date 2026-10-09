import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, interests, message } = body;

    if (!name || !phone) {
      return Response.json({ error: "Name and phone are required." }, { status: 400 });
    }

    const interestList = Array.isArray(interests) && interests.length
      ? interests.join(", ")
      : "None selected";

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 32px; border-radius: 12px;">
        <div style="background: #070B11; padding: 24px 28px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #00D4B2; margin: 0; font-size: 22px; letter-spacing: 1px;">SPECTRA ASSETS</h1>
          <p style="color: #8A99AD; margin: 6px 0 0; font-size: 13px;">New Website Enquiry</p>
        </div>
        <div style="background: #fff; padding: 28px; border-radius: 0 0 8px 8px; border: 1px solid #E5E7EB; border-top: none;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-size: 13px; width: 130px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #111827; font-size: 15px; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Mobile</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #111827; font-size: 15px; font-weight: 500;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #111827; font-size: 15px; font-weight: 500;">${email || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #6B7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Interested In</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #F3F4F6; color: #00D4B2; font-size: 15px; font-weight: 500;">${interestList}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 10px 0; color: #6B7280; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top; padding-top: 14px;">Message</td>
              <td style="padding: 10px 0; color: #374151; font-size: 15px; line-height: 1.7; padding-top: 14px;">${message.replace(/\n/g, "<br/>")}</td>
            </tr>` : ""}
          </table>
        </div>
        <p style="text-align: center; color: #9CA3AF; font-size: 12px; margin-top: 20px;">
          Sent from spectraasset.com contact form
        </p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Spectra Assets Website <onboarding@resend.dev>",
      to: ["operations@spectraasset.com"],
      replyTo: email || undefined,
      subject: `New enquiry from ${name} — Spectra Assets`,
      html: htmlBody,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: "Failed to send email." }, { status: 500 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return Response.json({ error: "Server error." }, { status: 500 });
  }
}
