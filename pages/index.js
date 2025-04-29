import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
        <h1 className="text-5xl font-bold mb-6 text-center">
          Répondez aux appels d'offres <span className="text-blue-600">en 1 clic</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
          Générez automatiquement vos réponses professionnelles aux appels d’offres grâce à l'IA. Gagnez du temps, décrochez plus de missions.
        </p>
        <Link href="/pricing">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
            Commencer
          </button>
        </Link>
      </main>
    </div>
  );
}
