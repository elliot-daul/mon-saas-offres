import { ClerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { type, data } = req.body;

  // Vérifier que c'est bien un nouvel utilisateur
  if (type === "user.created") {
    const userId = data.id;

    // Ajouter 3 crédits gratuits
    await ClerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        free_credits: 3,
      },
    });

    return res.status(200).json({ message: "Crédits gratuits ajoutés !" });
  }

  return res.status(200).json({ message: "Event ignoré" });
}
