import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../lib/supabaseClient";
import { saveAs } from "file-saver";

export default function History() {
  const { user } = useUser();
  const [analyzes, setAnalyzes] = useState([]);

  useEffect(() => {
    if (user) fetchAnalyzes();
  }, [user]);

  async function fetchAnalyzes() {
    const { data, error } = await supabase
      .from('analyzes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) console.error(error);
    else setAnalyzes(data);
  }

  function handleDownload(content, index) {
    const blob = new Blob([content], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    saveAs(blob, `réponse-${index + 1}.docx`);
  }

  async function handleSendEmail(content) {
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.emailAddresses[0].emailAddress, content }),
    });
    alert('Email envoyé avec succès !');
  }

  return (
    <div>
      <Navbar />
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-8">Historique de vos réponses</h1>

        {analyzes.length === 0 ? (
          <p className="text-gray-500">Aucune réponse générée pour le moment.</p>
        ) : (
          <div className="grid gap-6">
            {analyzes.map((analyze, index) => (
              <div key={analyze.id} className="p-6 border rounded-lg bg-gray-50">
                <p className="mb-4 whitespace-pre-wrap">{analyze.response_text}</p>
                <div className="flex gap-4">
                  <button onClick={() => handleDownload(analyze.response_text, index)} className="bg-green-600 text-white px-4 py-2 rounded">
                    Télécharger
                  </button>
                  <button onClick={() => handleSendEmail(analyze.response_text)} className="bg-purple-600 text-white px-4 py-2 rounded">
                    Envoyer par Email
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
