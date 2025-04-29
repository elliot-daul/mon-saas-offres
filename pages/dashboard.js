import Navbar from "../components/Navbar";
import AnalyzeForm from "../components/AnalyzeForm";
import { useUser } from "@clerk/nextjs";
import Link from "next/link"; // pour rediriger vers pricing

export default function Dashboard() {
  const { isSignedIn, user } = useUser();
  const credits = user?.publicMetadata?.free_credits ?? 0;

  if (!isSignedIn) return <div className="p-8">Veuillez vous connecter</div>;

  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Nouvelle Analyse</h1>

        {/* Affichage du compteur */}
        <p className="mb-4 text-gray-700">
          Essais gratuits restants : {credits} / 3
        </p>

        {/* Si crédits > 0, afficher AnalyzeForm */}
        {credits > 0 ? (
          <AnalyzeForm />
        ) : (
          // Si plus de crédits ➔ afficher message et bouton abonnement
          <div className="flex flex-col items-center gap-4">
            <p className="text-red-500 font-semibold">Vous n'avez plus d'essais gratuits disponibles.</p>
            <Link href="/pricing">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
                Devenir Premium
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
