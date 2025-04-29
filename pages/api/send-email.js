import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, content } = req.body;

  await resend.emails.send({
    from: 'no-reply@tondomaine.com',
    to: email,
    subject: 'Votre lettre générée',
    html: `<pre>${content}</pre>`,
  });

  res.status(200).json({ message: 'Email envoyé' });
}
