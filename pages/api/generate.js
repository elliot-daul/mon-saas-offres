import { getAuth } from "@clerk/nextjs/server";
import { ClerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId } = getAuth(req);

  if (!userId) return res.status(401).json({ error: "Non authentifié" });

  // Vérifier crédits gratuits
  const user = await ClerkClient.users.getUser(userId);
  const credits = user.publicMetadata.free_credits ?? 0;

  if (credits <= 0) {
    return res.status(403).json({ error: "Crédits gratuits épuisés. Passez premium pour continuer." });
  }

  // On récupère le body de la requête
  const { offer, style } = req.body;

  let prompt = "";

  if (style === "standard") {
    prompt = `
Tu es un expert freelance en rédaction de réponses à appels d'offres.
Voici l'appel d'offre : """${offer}""".
Génère une lettre professionnelle (introduction, compétences, plan d'action, conclusion), entre 200 et 300 mots.
    `;
  }

  if (style === "creatif") {
    prompt = `
Tu es un expert freelance en communication créative.
Voici l'appel d'offre : """${offer}""".
Génère une lettre inspirante adaptée aux missions créatives, 200-250 mots.
    `;
  }

  if (style === "technique") {
    prompt = `
Tu es un freelance technique spécialisé (dev, ingénierie).
Voici l'appel d'offre : """${offer}""".
Génère une réponse technique claire et professionnelle, entre 200 et 300 mots.
    `;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    }),
  });

  const data = await response.json();

  // Décrémenter les crédits restants après génération
  await ClerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      free_credits: credits - 1,
    },
  });

  res.status(200).json({ result: data.choices[0].message.content });
}
