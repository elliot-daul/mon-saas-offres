import Navbar from "../components/Navbar";
import { useUser } from "@clerk/nextjs";

export default function Pricing() {
  const { user } = useUser();

  async function handleCheckout(priceId) {
    const res = await fetch("/api/stripe/start-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, userId: user?.id }),
    });
    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
        <h1 className="text-4xl font-bold mb-10">Choisissez votre abonnement</h1>

        <div className="flex flex-col md:flex-row gap-8">

          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Starter</h2>
            <p className="text-4xl mb-4">9€<span className="text-sm text-gray-500">/mois</span></p>
            <p className="text-gray-600 mb-6">15 analyses par mois</p>
            <button
              onClick={() => handleCheckout('TON_PRICE_ID_STARTER')}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Choisir Starter
            </button>
          </div>

          <div className="bg-blue-600 p-8 rounded-lg shadow-lg text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Premium</h2>
            <p className="text-4xl mb-4">19€<span className="text-sm text-gray-300">/mois</span></p>
            <p className="mb-6">Analyses illimitées</p>
            <button
              onClick={() => handleCheckout('TON_PRICE_ID_PREMIUM')}
              className="bg-white text-blue-600 px-6 py-2 rounded hover:bg-gray-100 transition"
            >
              Choisir Premium
            </button>
          </div>

        </div>

        <p className="mt-10 text-gray-500 text-sm">
          Sans engagement. Résiliable à tout moment.
        </p>
      </main>
    </div>
  );
}
