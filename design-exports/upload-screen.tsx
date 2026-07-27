"use client";

import { useRef, useState } from "react";
import { Upload, X, Plus } from "lucide-react";

export default function UploadScreen() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<string | null>(null);
  const [participants, setParticipants] = useState(["", ""]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) simulateUpload(dropped.name);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (picked) simulateUpload(picked.name);
  }

  function simulateUpload(name: string) {
    setFile(name);
    setUploading(true);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) { p = 100; clearInterval(interval); setUploading(false); }
      setProgress(Math.min(p, 100));
    }, 200);
  }

  function updateParticipant(i: number, val: string) {
    setParticipants((prev) => prev.map((p, idx) => (idx === i ? val : p)));
  }

  function addParticipant() {
    if (participants.length < 6) setParticipants((prev) => [...prev, ""]);
  }

  function removeParticipant(i: number) {
    if (participants.length > 2) setParticipants((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #3f3f46 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-zinc-800">
        <span className="text-amber-400 font-semibold tracking-tight text-lg">Violência Verbal</span>
        <button className="border border-zinc-600 hover:border-zinc-400 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors">
          Fazer login
        </button>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center px-6 pt-16 pb-20 gap-10 max-w-2xl mx-auto w-full">
        <div className="text-center">
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
            Nova análise
          </span>
          <h1 className="text-3xl font-bold text-white mt-3">
            Envie sua conversa
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Áudio (mp3, m4a, wav) ou texto (txt, pdf). Máximo 50 MB.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`w-full border-2 border-dashed rounded-xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-colors ${
            dragging
              ? "border-amber-400 bg-amber-400/5"
              : "border-zinc-700 hover:border-zinc-500 bg-zinc-900/50"
          }`}
        >
          <input ref={inputRef} type="file" className="hidden" onChange={handleFile} accept=".mp3,.m4a,.wav,.txt,.pdf" />
          <Upload className={`w-8 h-8 ${dragging ? "text-amber-400" : "text-zinc-500"}`} />
          {file ? (
            <p className="text-white font-medium text-sm">{file}</p>
          ) : (
            <>
              <p className="text-zinc-300 font-medium">Arraste o arquivo aqui</p>
              <p className="text-zinc-500 text-sm">ou clique para selecionar</p>
            </>
          )}
        </div>

        {/* Progress bar */}
        {file && (
          <div className="w-full">
            <div className="flex justify-between text-xs text-zinc-500 mb-2">
              <span>{uploading ? "Enviando…" : "Concluído"}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-200 ${uploading ? "bg-amber-400" : "bg-green-500"}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Participants */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
              Participantes
            </h2>
            <button
              onClick={addParticipant}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {participants.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 font-semibold shrink-0">
                  {i + 1}
                </div>
                <input
                  type="text"
                  value={p}
                  onChange={(e) => updateParticipant(i, e.target.value)}
                  placeholder={`Participante ${i + 1}`}
                  className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-amber-400 outline-none text-white text-sm px-4 py-2.5 rounded-md placeholder:text-zinc-600 transition-colors"
                />
                {participants.length > 2 && (
                  <button onClick={() => removeParticipant(i)} className="text-zinc-600 hover:text-red-400 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          disabled={!file || uploading}
          className="w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-30 disabled:cursor-not-allowed text-zinc-950 font-semibold py-3 rounded-md transition-colors"
        >
          {uploading ? "Aguarde o upload…" : "Analisar conversa"}
        </button>
      </main>
    </div>
  );
}