import { LAST_UPDATED } from "../engine/lastUpdated";

type Props = { onStart: () => void; onBrowse: () => void };

function PassportCover() {
  return (
    <div
      aria-hidden="true"
      className="passport-card relative w-full"
      style={{ aspectRatio: "5 / 7" }}
    >
      <div className="passport-passport">Passport</div>

      <svg
        viewBox="0 0 140 140"
        className="passport-crest"
        aria-hidden="true"
      >
        <g fill="none" stroke="#e9c46a" strokeWidth={1.1} strokeLinecap="round">
          <circle cx="70" cy="70" r="48" />
          <ellipse cx="70" cy="70" rx="48" ry="14" />
          <ellipse cx="70" cy="70" rx="48" ry="28" strokeOpacity={0.6} />
          <ellipse cx="70" cy="70" rx="48" ry="42" strokeOpacity={0.4} />
          <ellipse cx="70" cy="70" rx="14" ry="48" />
          <ellipse cx="70" cy="70" rx="28" ry="48" strokeOpacity={0.6} />
          <ellipse cx="70" cy="70" rx="42" ry="48" strokeOpacity={0.4} />
          <line x1="22" y1="70" x2="118" y2="70" strokeOpacity={0.5} />
          <line x1="70" y1="22" x2="70" y2="118" strokeOpacity={0.5} />
          <ellipse className="passport-meridian m1" cx="70" cy="70" rx="42" ry="48" />
          <ellipse className="passport-meridian m2" cx="70" cy="70" rx="42" ry="48" />
          <ellipse className="passport-meridian m3" cx="70" cy="70" rx="42" ry="48" />
        </g>
      </svg>

      {/* Official ICAO e-passport logo, unmodified from Wikipedia
          (en.wikipedia.org/wiki/Biometric_passport) - only fill color changed */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="117"
        height="72"
        viewBox="0 0 210 297"
        className="passport-biometric"
        aria-hidden="true"
      >
        <path
          fill="#e9c46a"
          d="M-111.5625 24.75V136.125H23.539306A82.5 82.5 0 0 1 105 66 82.5 82.5 0 0 1 186.5 136.125H321.5625V24.75ZM105 90.75A57.75 57.75 0 0 0 47.25 148.5 57.75 57.75 0 0 0 105 206.25 57.75 57.75 0 0 0 162.75 148.5 57.75 57.75 0 0 0 105 90.75Zm-216.5625 70.125V272.25h433.125V160.875H186.46068A82.5 82.5 0 0 1 105 231 82.5 82.5 0 0 1 23.5 160.875Z"
          strokeWidth={81.90428162}
        />
      </svg>
    </div>
  );
}

export function Landing({ onStart, onBrowse }: Props) {
  return (
    <div className="relative w-full min-h-svh flex items-start md:items-center justify-center">
      <div
        className="
          relative z-10 w-full max-w-[1200px]
          px-5 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16
          grid items-center gap-8 md:gap-14
          md:grid-cols-[minmax(0,1fr)_clamp(280px,34%,380px)]
        "
      >
        <div>
          <h1 className="font-extrabold leading-[1.05] tracking-[-0.035em] text-[clamp(2rem,10vw,3.6rem)] max-w-[16ch]">
            Where could your family tree get you a{" "}
            <em className="not-italic font-extrabold text-accent tracking-[-0.035em]">
              passport
            </em>
            ?
          </h1>

          <p className="text-ink/70 text-[1rem] sm:text-[1.0625rem] leading-[1.65] max-w-[36rem] mt-6 sm:mt-8 mb-7 sm:mb-9">
            Answer a few questions about your ancestors and we'll show which
            citizenship paths look realistic, across descent, heritage,
            marriage, and ancestry-visa routes. Your answers stay in your
            browser; nothing is ever sent to a server.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3.5 mb-8 sm:mb-10">
            <button
              onClick={onStart}
              className="font-mono uppercase tracking-[0.22em] text-[12px] font-medium border border-accent bg-accent text-white px-6 sm:px-7 py-4 transition hover:bg-transparent hover:text-accent"
            >
              Begin questionnaire
            </button>
            <button
              onClick={onBrowse}
              className="font-mono uppercase tracking-[0.22em] text-[12px] font-medium border border-white/10 text-ink px-6 py-4 transition hover:border-accent hover:text-accent"
            >
              Browse all rules
            </button>
          </div>

          <div className="text-muted text-[0.8rem] leading-[1.6] max-w-[38rem]">
            Informational only. Citizenship law is jurisdiction-specific and
            changes; verify with the relevant consulate or a qualified
            immigration lawyer before acting.
            <span className="block mt-2">
              Country rules last updated {LAST_UPDATED}.
            </span>
          </div>
        </div>

        <div className="hidden md:block">
          <PassportCover />
        </div>
      </div>
    </div>
  );
}
