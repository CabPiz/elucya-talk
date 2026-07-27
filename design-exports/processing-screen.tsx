"use client";

import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

const STEPS = [
  { label: "Transcrevendo áudio", desc: "Convertendo fala em texto..." },
  { label: "Identificando participantes", desc: "Separando as vozes da conversa..." },
  { label: "Analisando padrões", desc: "Detectando tom e comportamentos verbais..." },
  { label: "Calculando métricas", desc: "Medindo intensidade e frequência dos padrões..." },
  { label: "Gerando relatório", desc: "Compilando recomendações personalizadas..." },
];

type Status = "done" | "active" | "pending";

export default function ProcessingScreen() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current >= STEPS.length) return;
    const timer = setTimeout(() => setCurrent((c) => c + 1), 1800);
    return () => clearTimeout(timer);
  }, [current]);

  function getStatus(i: number): Status {
    if (i < current) return "done";
    if (i === current) return "active";
    return "pending";
  }

  const finished = current >= STEPS.length;

  return (
    <div
      className="min-h-screen bg-zinc-950 text-white flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
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
        <span className="text-amber-400 font-semibold tracking-tight text-lg">
          Violência Verbal
        </span>
      </nav>

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 py-20">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
              Processando
            </span>
            <h1 className="text-3xl font-bold text-white mt-3">
              {finished ? "Análise concluída" : "Analisando sua conversa"}
            </h1>
            <p className="text-zinc-400 text-sm mt-2">
              {finished
                ? "Seu relatório está pronto."
                : "Isso pode levar alguns segundos..."}
            </p>
          </div>

          {/* Stepper */}
          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => {
              const status = getStatus(i);
              return (
                <div key={i} className="flex gap-4">
                  {/* Line + icon */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-500 ${
                        status === "done"
                          ? "bg-amber-400 border-amber-400"
                          : status === "active"
                          ? "bg-zinc-900 border-amber-400"
                          : "bg-zinc-900 border-zinc-700"
                      }`}
                    >
                      {status === "done" ? (
                        <Check className="w-4 h-4 text-zinc-950" />
                      ) : status === "active" ? (
                        <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-zinc-700" />
                      )}
                    </div>
                    {i < STEPS.length - 1 && (
                      <div
                        className={`w-px flex-1 my-1 transition-all duration-500 ${
                          status === "done" ? "bg-amber-400" : "bg-zinc-800"
                        }`}
                        style={{ minHeight: "28px" }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="pb-8">
                    <p
                      className={`font-semibold text-sm transition-colors duration-300 ${
                        status === "pending" ? "text-zinc-600" : "text-white"
                      }`}
                    >
                      {step.label}
                    </p>
                    {status === "active" && (
                      <p className="text-zinc-500 text-xs mt-1">{step.desc}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA após conclusão */}
          {finished && (
            <button className="w-full mt-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold py-3 rounded-md transition-colors">
              Ver relatório
            </button>
          )}
        </div>
      </main>
    </div>
  );
}