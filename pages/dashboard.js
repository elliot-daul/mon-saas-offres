import Navbar from "../components/Navbar";
import AnalyzeForm from "../components/AnalyzeForm";
import { useUser } from "@clerk/nextjs";

export default function Dashboard() {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) return <div className="p-8">Chargement...</div>;
  if (!isSignedIn) return <div className="p-8">Veuillez vous connecter</div>;

  const credits = user?.publicMetadata?.free_credits ?? 0;

  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Nouvelle Analyse</h1>
        {credits > 0 ? (
          <>
            <p className="mb-2 text-gray-700">
              Essais gratuits restants : {credits}/3
            </p>
            <AnalyzeForm />
          </>
        ) : (
          <p className="text-red-500 font-semibold">
            Vous n&#39;avez plus d&#39;essais gratuits disponibles.
          </p>
        )}
      </main>
    </div>
  );
}
