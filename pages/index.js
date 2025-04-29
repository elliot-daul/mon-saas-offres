import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
        <h1 className="text-5xl font-bold mb-6 text-center">
          Répondez aux appels d&apos;offres <span className="text-blue-600">en 1 clic</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-2xl">
          Générez automatiquement vos réponses professionnelles aux appels d&apos;offres grâce à l&apos;IA. Gagnez du temps, décrochez plus de missions.
        </p>
        <Link href="/pricing">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
            Commencer
          </button>
        </Link>

        {/*  Section Essai Gratuit */}
        <section className="bg-blue-50 py-12 px-6 text-center rounded-lg mt-16 w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
             Essai gratuit
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Profitez de 3 analyses offertes dès la création de votre compte. Testez gratuitement la puissance de notre IA avant de vous abonner.
          </p>
          <Link href="/sign-up">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
              Créer un compte gratuit
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}
