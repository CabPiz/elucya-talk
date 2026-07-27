const TRANSCRIPT = [
    {
      participant: "P1",
      initials: "P1",
      text: "Você nunca me ouve quando eu falo algo importante. É sempre assim.",
      badges: [
        { label: "Generalização", color: "amber" },
        { label: "Linguagem de culpa", color: "red" },
      ],
      time: "00:12",
    },
    {
      participant: "P2",
      initials: "P2",
      text: "Tá bom. Se você acha isso...",
      badges: [{ label: "Esquiva de conflito", color: "amber" }],
      time: "00:34",
    },
    {
      participant: "P1",
      initials: "P1",
      text: "Não é o que eu acho, é o que acontece! Você está fazendo de novo agora!",
      badges: [
        { label: "Tom agressivo", color: "red" },
        { label: "Interrupção", color: "red" },
      ],
      time: "00:41",
    },
    {
      participant: "P2",
      initials: "P2",
      text: "Eu entendo que você está frustrado. Mas eu preciso de um momento.",
      badges: [{ label: "Escuta ativa", color: "green" }],
      time: "01:02",
    },
    {
      participant: "P1",
      initials: "P1",
      text: "Um momento? A gente nunca resolve nada porque você sempre foge.",
      badges: [
        { label: "Generalização", color: "amber" },
        { label: "Linguagem de culpa", color: "red" },
      ],
      time: "01:09",
    },
    {
      participant: "P2",
      initials: "P2",
      text: "Eu não estou fugindo. Estou tentando não piorar as coisas.",
      badges: [{ label: "Ironia velada", color: "amber" }],
      time: "01:24",
    },
  ];
  
  const BADGE_COLORS: Record<string, string> = {
    red: "bg-red-950/50 border-red-800 text-red-400",
    amber: "bg-amber-950/50 border-amber-800 text-amber-400",
    green: "bg-green-950/50 border-green-800 text-green-400",
  };
  
  export default function AnnotatedTranscript() {
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
  
        <main className="relative z-10 flex flex-col gap-6 px-6 py-12 max-w-2xl mx-auto w-full">
          {/* Header */}
          <div>
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
              Transcrição
            </span>
            <h1 className="text-3xl font-bold text-white mt-2">
              Conversa anotada
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Cada fala classificada com os padrões detectados.
            </p>
          </div>
  
          {/* Legend */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Padrão crítico", color: "red" },
              { label: "Padrão moderado", color: "amber" },
              { label: "Padrão positivo", color: "green" },
            ].map((l) => (
              <span
                key={l.label}
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${BADGE_COLORS[l.color]}`}
              >
                {l.label}
              </span>
            ))}
          </div>
  
          {/* Transcript lines */}
          <div className="flex flex-col gap-4">
            {TRANSCRIPT.map((line, i) => {
              const isP1 = line.initials === "P1";
              return (
                <div key={i} className={`flex gap-3 ${isP1 ? "" : "flex-row-reverse"}`}>
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950 font-bold text-xs shrink-0 mt-1">
                    {line.initials}
                  </div>
  
                  {/* Bubble */}
                  <div
                    className={`flex flex-col gap-2 max-w-sm ${isP1 ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`px-4 py-3 rounded-xl text-sm leading-relaxed ${
                        isP1
                          ? "bg-zinc-800 text-zinc-100 rounded-tl-none"
                          : "bg-zinc-800 text-zinc-100 rounded-tr-none"
                      }`}
                    >
                      {line.text}
                    </div>
  
                    {/* Badges */}
                    <div className={`flex flex-wrap gap-1.5 ${isP1 ? "" : "justify-end"}`}>
                      {line.badges.map((b) => (
                        <span
                          key={b.label}
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${BADGE_COLORS[b.color]}`}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
  
                    {/* Time */}
                    <span className="text-zinc-600 text-xs">{line.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
  
          {/* CTA */}
          <button className="w-full mt-4 bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold py-3 rounded-md transition-colors">
            Baixar relatório completo
          </button>
        </main>
      </div>
    );
  }