import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 shadow">
      <h1 className="font-bold text-2xl">SaaS Offres</h1>
      <div className="flex gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/history">Historique</Link>
        <Link href="/pricing">Abonnements</Link>
        <Link href="/sign-in">Connexion</Link> {/* ICI on remplace /login par /sign-in */}
      </div>
    </nav>
  );
}
