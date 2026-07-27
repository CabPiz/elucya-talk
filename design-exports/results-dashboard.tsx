"use client";

import { AlertTriangle, TrendingUp, Users, MessageSquare } from "lucide-react";

const CONFLICT_SCORE = 72;

const TAGS = [
  { label: "Interrupções frequentes", color: "red" },
  { label: "Tom agressivo", color: "red" },
  { label: "Passivo-agressivo", color: "amber" },
  { label: "Generalização", color: "amber" },
  { label: "Escuta ativa", color: "green" },
  { label: "Linguagem de culpa", color: "red" },
];

const STATS = [
  { icon: <Users className="w-4 h-4" />, label: "Participantes", value: "2" },
  { icon: <MessageSquare className="w-4 h-4" />, label: "Trocas analisadas", value: "47" },
  { icon: <TrendingUp className="w-4 h-4" />, label: "Duração", value: "12 min" },
  { icon: <AlertTriangle className="w-4 h-4" />, label: "Picos de conflito", value: "3" },
];

function ConflictGauge({ score }: { score: number }) {
  const radius = 80;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = Math.PI * normalizedRadius; // half circle
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 70 ? "#f87171" : score >= 40 ? "#fbbf24" : "#34d399";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={radius * 2} height={radius + stroke} viewBox={`0 0 ${radius * 2} ${radius + stroke}`}>
        {/* Track */}
        <path
          d={`M ${stroke / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - stroke / 2} ${radius}`}
          fill="none"
          stroke="#27272a"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={`M ${stroke / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - stroke / 2} ${radius}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        {/* Score */}
        <text
          x={radius}
          y={radius - 8}
          textAnchor="middle"
          fill="white"
          fontSize="28"
          fontWeight="bold"
          fontFamily="Inter"
        >
          {score}
        </text>
        <text
          x={radius}
          y={radius + 10}
          textAnchor="middle"
          fill="#71717a"
          fontSize="11"
          fontFamily="Inter"
        >
          /100
        </text>
      </svg>
      <span className="text-sm font-semibold" style={{ color }}>
        {score >= 70 ? "Nível alto de conflito" : score >= 40 ? "Nível moderado" : "Nível baixo"}
      </span>
    </div>
  );
}

export default function ResultsDashboard() {
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
        <button className="border border-zinc-600 hover:border-zinc-400 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors">
          Nova análise
        </button>
      </nav>

      <main className="relative z-10 flex flex-col gap-6 px-6 py-12 max-w-3xl mx-auto w-full">
        {/* Header */}
        <div>
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
            Resultado
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            Relatório da conversa
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Análise gerada em {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-800 rounded-xl overflow-hidden border border-zinc-800">
          {STATS.map((s) => (
            <div key={s.label} className="bg-zinc-900 px-5 py-4 flex flex-col gap-2">
              <span className="text-zinc-500">{s.icon}</span>
              <span className="text-xl font-bold text-white">{s.value}</span>
              <span className="text-zinc-500 text-xs">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Gauge + Resumo */}
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Gauge */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center gap-4">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              Índice de conflito
            </p>
            <ConflictGauge score={CONFLICT_SCORE} />
          </div>

          {/* Resumo */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-3">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
              Resumo geral
            </p>
            <p className="text-zinc-300 text-sm leading-relaxed">
              A conversa apresenta um padrão elevado de tensão, com episódios recorrentes de interrupção e uso de linguagem de culpa. Um dos participantes demonstra postura predominantemente reativa, enquanto o outro utiliza generalizações como mecanismo de defesa.
            </p>
            <p className="text-zinc-500 text-xs mt-auto pt-3 border-t border-zinc-800">
              Veja os cards individuais para recomendações específicas.
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">
            Padrões detectados
          </p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag.label}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${
                  tag.color === "red"
                    ? "bg-red-950/50 border-red-800 text-red-400"
                    : tag.color === "amber"
                    ? "bg-amber-950/50 border-amber-800 text-amber-400"
                    : "bg-green-950/50 border-green-800 text-green-400"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold py-3 rounded-md transition-colors">
          Ver feedback por participante
        </button>
      </main>
    </div>
  );
}