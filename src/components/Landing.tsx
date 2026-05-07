import { LAST_UPDATED } from "../engine/lastUpdated";

type Props = { onStart: () => void };

function PassportBackdrop() {
  return (
    <svg
      viewBox="0 0 200 260"
      className="absolute left-[8%] top-12 md:left-[14%] md:top-20 w-[18rem] md:w-[24rem] h-auto opacity-[0.06] pointer-events-none select-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a4d75" />
          <stop offset="100%" stopColor="#0f2238" />
        </linearGradient>
      </defs>
      <g transform="rotate(-8 100 130)">
        <rect
          x="20"
          y="20"
          width="160"
          height="220"
          rx="10"
          fill="url(#cover)"
          stroke="#7cc5ff"
          strokeWidth="1.5"
        />
        <rect
          x="32"
          y="32"
          width="136"
          height="196"
          rx="6"
          fill="none"
          stroke="#7cc5ff"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <circle cx="100" cy="105" r="28" fill="none" stroke="#7cc5ff" strokeWidth="1.5" />
        <ellipse cx="100" cy="105" rx="28" ry="11" fill="none" stroke="#7cc5ff" strokeOpacity="0.7" strokeWidth="1" />
        <line x1="72" y1="105" x2="128" y2="105" stroke="#7cc5ff" strokeOpacity="0.7" strokeWidth="1" />
        <line x1="100" y1="77" x2="100" y2="133" stroke="#7cc5ff" strokeOpacity="0.7" strokeWidth="1" />
        <text
          x="100"
          y="160"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="11"
          letterSpacing="2"
          fill="#e8eaee"
          opacity="0.95"
        >
          PASSPORT
        </text>
        <line x1="56" y1="174" x2="144" y2="174" stroke="#7cc5ff" strokeOpacity="0.5" strokeWidth="1" />
        <text
          x="100"
          y="194"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui"
          fontSize="7"
          letterSpacing="1.5"
          fill="#8a93a6"
        >
          HERITAGE EDITION
        </text>
        <rect x="20" y="20" width="6" height="220" fill="#000" opacity="0.3" />
      </g>
    </svg>
  );
}

export function Landing({ onStart }: Props) {
  return (
    <div className="relative w-full">
      <PassportBackdrop />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-16">
      <p className="text-accent text-sm tracking-widest uppercase mb-4">
        Heritage → Passport
      </p>
      <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
        Where could your family tree get you a second passport?
      </h1>
      <p className="text-muted text-lg mb-8 leading-relaxed">
        Lots of people suspect they qualify for citizenship somewhere because of
        a grandparent or great-grandparent - but the rules are scattered across
        20+ countries and changed dramatically in 2025. Answer a few questions
        and we'll show you which paths are realistically open.
      </p>

      <ul className="space-y-3 mb-10 text-ink/90">
        <li className="flex gap-3">
          <span className="text-likely">•</span>
          <span>Citizenship by descent (parent / grandparent / great-grandparent).</span>
        </li>
        <li className="flex gap-3">
          <span className="text-likely">•</span>
          <span>Heritage routes - Israel's Law of Return, German Article 116, Spanish exile descendants.</span>
        </li>
        <li className="flex gap-3">
          <span className="text-likely">•</span>
          <span>Marriage fast-tracks and ancestry visas.</span>
        </li>
      </ul>

      <button
        onClick={onStart}
        className="rounded-md bg-accent text-bg px-6 py-3 font-medium hover:opacity-90 transition"
      >
        Start the questionnaire →
      </button>

      <p className="text-muted text-xs mt-12 leading-relaxed">
        Informational only. Citizenship law is jurisdiction-specific and
        changes; verify with the relevant consulate or a qualified immigration
        lawyer before acting. Your answers stay in your browser - nothing is
        sent to a server.
      </p>
      <p className="text-muted text-xs mt-2">
        Country rules last updated <span className="text-ink/80">{LAST_UPDATED}</span>.
      </p>
      </div>
    </div>
  );
}
