// pages/api/generate.js

import { getAuth } from "@clerk/nextjs/server";
import { ClerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Non authentifié" });

  const user = await ClerkClient.users.getUser(userId);
  const credits = user.publicMetadata.free_credits ?? 0;

  if (credits <= 0) {
    return res.status(403).json({ error: "Crédits gratuits épuisés." });
  }

  const { offer, style } = req.body;

  if (!offer || !style) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  let prompt = `Tu es un expert freelance. Voici l'appel d'offre : """${offer}"""`;

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

  await ClerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      free_credits: credits - 1,
    },
  });

  return res.status(200).json({ result: data.choices[0].message.content });
}
