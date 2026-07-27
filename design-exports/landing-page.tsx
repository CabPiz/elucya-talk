import { Upload, Users, BarChart3 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Dot grid background */}
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
        <button className="bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-semibold px-4 py-2 rounded-md transition-colors">
          Analisar conversa
        </button>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
        <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-6">
          Análise de comunicação com IA
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-3xl leading-tight mb-6">
          Identifique padrões de{" "}
          <span className="text-red-400">violência verbal</span> nas suas
          conversas
        </h1>

        <p className="text-zinc-400 text-lg max-w-xl mb-10 leading-relaxed">
          Faça upload de um áudio ou texto e receba um relatório detalhado sobre
          o tom, os padrões de comunicação e recomendações para cada
          participante.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-semibold px-6 py-3 rounded-md transition-colors">
            Começar análise
          </button>
          <button className="border border-zinc-600 hover:border-zinc-400 text-white font-semibold px-6 py-3 rounded-md transition-colors">
            Ver demonstração
          </button>
        </div>

        <p className="text-zinc-500 text-sm">
          Sem cadastro. Seus dados não são armazenados.
        </p>
      </main>

      {/* Feature bullets */}
      <section className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-800 border-t border-b border-zinc-800 mx-0">
        {[
          {
            icon: <Upload className="w-5 h-5 text-amber-400" />,
            title: "Áudio ou texto",
            desc: "Aceita arquivos de áudio, transcrições e conversas copiadas",
          },
          {
            icon: <Users className="w-5 h-5 text-amber-400" />,
            title: "Múltiplos participantes",
            desc: "Identifica e analisa cada voz separadamente",
          },
          {
            icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
            title: "Relatório detalhado",
            desc: "Medidor de conflito, padrões detectados e recomendações práticas",
          },
        ].map((f) => (
          <div key={f.title} className="bg-zinc-950 px-8 py-10 flex flex-col gap-3">
            {f.icon}
            <h3 className="text-white font-semibold">{f.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-zinc-600 text-sm">
        © 2025 Violência Verbal
      </footer>
    </div>
  );
}