import { TrendingDown, TrendingUp, Minus, AlertCircle, CheckCircle, Lightbulb } from "lucide-react";

const PARTICIPANTS = [
  {
    name: "Participante 1",
    initials: "P1",
    tone: "Agressivo",
    toneLevel: "high",
    score: 78,
    patterns: [
      { label: "Interrupções frequentes", severity: "high" },
      { label: "Linguagem de culpa", severity: "high" },
      { label: "Generalização", severity: "medium" },
    ],
    strengths: ["Clareza nas demandas"],
    recommendations: [
      "Pratique escuta ativa antes de responder",
      "Substitua 'você sempre' por 'nessa situação'",
      "Faça pausas antes de reagir emocionalmente",
    ],
  },
  {
    name: "Participante 2",
    initials: "P2",
    tone: "Passivo-agressivo",
    toneLevel: "medium",
    score: 54,
    patterns: [
      { label: "Ironia velada", severity: "medium" },
      { label: "Esquiva de conflito", severity: "medium" },
    ],
    strengths: ["Escuta ativa", "Tom controlado na maioria das trocas"],
    recommendations: [
      "Expresse discordâncias de forma direta",
      "Evite respostas monossilábicas em momentos de tensão",
      "Nomeie suas emoções antes de responder",
    ],
  },
];

function ToneBadge({ tone, level }: { tone: string; level: string }) {
  const colors =
    level === "high"
      ? "bg-red-950/50 border-red-800 text-red-400"
      : level === "medium"
      ? "bg-amber-950/50 border-amber-800 text-amber-400"
      : "bg-green-950/50 border-green-800 text-green-400";
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${colors}`}>
      {tone}
    </span>
  );
}

function SeverityIcon({ severity }: { severity: string }) {
  if (severity === "high") return <TrendingUp className="w-3.5 h-3.5 text-red-400" />;
  if (severity === "medium") return <Minus className="w-3.5 h-3.5 text-amber-400" />;
  return <TrendingDown className="w-3.5 h-3.5 text-green-400" />;
}

export default function ParticipantFeedbackCard() {
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
            Feedback individual
          </span>
          <h1 className="text-3xl font-bold text-white mt-2">
            Por participante
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Análise de tom, padrões e recomendações para cada pessoa.
          </p>
        </div>

        {/* Cards */}
        {PARTICIPANTS.map((p) => (
          <div
            key={p.name}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
          >
            {/* Card header */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-zinc-800">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950 font-bold text-sm shrink-0">
                {p.initials}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">{p.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <ToneBadge tone={p.tone} level={p.toneLevel} />
                </div>
              </div>
              {/* Score */}
              <div className="text-right">
                <p
                  className={`text-2xl font-bold ${
                    p.score >= 70 ? "text-red-400" : p.score >= 40 ? "text-amber-400" : "text-green-400"
                  }`}
                >
                  {p.score}
                </p>
                <p className="text-zinc-600 text-xs">índice</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-px bg-zinc-800">
              {/* Padrões */}
              <div className="bg-zinc-900 px-5 py-5 flex flex-col gap-3">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Padrões
                </p>
                <ul className="flex flex-col gap-2">
                  {p.patterns.map((pat) => (
                    <li key={pat.label} className="flex items-center gap-2 text-sm text-zinc-300">
                      <SeverityIcon severity={pat.severity} />
                      {pat.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pontos positivos */}
              <div className="bg-zinc-900 px-5 py-5 flex flex-col gap-3">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Pontos positivos
                </p>
                <ul className="flex flex-col gap-2">
                  {p.strengths.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-zinc-300">
                      <TrendingDown className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recomendações */}
              <div className="bg-zinc-900 px-5 py-5 flex flex-col gap-3">
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> Recomendações
                </p>
                <ul className="flex flex-col gap-2">
                  {p.recommendations.map((r) => (
                    <li key={r} className="text-sm text-zinc-300 leading-snug">
                      · {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {/* CTA */}
        <button className="w-full bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold py-3 rounded-md transition-colors">
          Ver transcrição anotada
        </button>
      </main>
    </div>
  );
}