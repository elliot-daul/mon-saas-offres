import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, name } = req.body;

  await resend.emails.send({
    from: 'no-reply@tondomaine.com',
    to: email,
    subject: 'Bienvenue sur SaaS Offres 🚀',
    html: `
      <h1>Bienvenue ${name} !</h1>
      <p>Vous pouvez commencer votre première analyse dès maintenant.</p>
    `,
  });

  res.status(200).json({ message: 'Email de bienvenue envoyé' });
}
