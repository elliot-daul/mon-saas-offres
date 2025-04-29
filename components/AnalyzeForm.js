import { useState } from "react";
import { saveAs } from "file-saver";
import { useUser } from "@clerk/nextjs";

export default function AnalyzeForm() {
  const [offer, setOffer] = useState("");
  const [style, setStyle] = useState("standard");
  const [response, setResponse] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { user } = useUser();

  async function handleAnalyze() {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offer, style }),
    });
    const data = await res.json();
    setResponse(data.result);
  }

  function handleDownload() {
    const blob = new Blob([response], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
    saveAs(blob, "réponse-appel-offre.docx");
  }

  async function handleSendEmail() {
    setIsSending(true);
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user?.emailAddresses[0].emailAddress,
        content: response
      }),
    });
    setIsSending(false);
    alert('Email envoyé !');
  }

  return (
    <div className="flex flex-col">
      <textarea
        className="border p-2 mb-2"
        rows={8}
        placeholder="Collez votre appel d'offre ici..."
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
      />

      <select
        className="p-2 mb-4 border"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      >
        <option value="standard">Réponse classique</option>
        <option value="creatif">Réponse créative</option>
        <option value="technique">Réponse technique</option>
      </select>

      <button onClick={handleAnalyze} className="bg-blue-600 text-white p-2 rounded mb-6">
        Générer la réponse
      </button>

      {response && (
        <div className="mt-6">
          <h2 className="font-bold text-xl mb-2">Votre réponse :</h2>
          <textarea
            className="w-full p-4 border rounded bg-gray-50"
            rows={10}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />

          <div className="flex gap-4 mt-4">
            <button onClick={handleDownload} className="bg-green-600 text-white p-2 rounded">
              Télécharger en Word
            </button>
            <button
              onClick={handleSendEmail}
              className={`p-2 rounded ${isSending ? "bg-gray-400" : "bg-purple-600"} text-white`}
              disabled={isSending}
            >
              {isSending ? "Envoi en cours..." : "Envoyer par email"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
