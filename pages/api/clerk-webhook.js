import { ClerkClient } from "@clerk/nextjs/server";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const event = req.body;

  if (event.type === "user.created") {
    const userId = event.data.id;

    await ClerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        free_credits: 3,
      },
    });

    return res.status(200).json({ success: true });
  }

  return res.status(200).json({ received: true });
}
