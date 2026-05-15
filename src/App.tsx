import { useEffect, useState } from "react";
import { Landing } from "./components/Landing";
import { Wizard } from "./components/Wizard";
import { Results } from "./components/Results";
import { Browse } from "./components/Browse";
import { Sources } from "./components/Sources";
import { useProfileState } from "./state/useProfileState";
import type { UserProfile } from "./types/profile";

type Screen = "landing" | "wizard" | "results" | "browse" | "sources";

const SCREENS: Screen[] = ["landing", "wizard", "results", "browse", "sources"];

function screenFromHash(): Screen {
  const h = window.location.hash.replace(/^#\/?/, "") as Screen;
  return SCREENS.includes(h) ? h : "landing";
}

// Has the user entered anything worth preserving? Used to decide whether to
// prompt before re-entering the wizard from the landing page.
function profileHasData(p: UserProfile): boolean {
  if (p.self.currentCitizenships.length > 0) return true;
  if (p.self.languages.length > 0) return true;
  if (p.self.birthYear != null) return true;
  if (p.self.gender) return true;
  if (Object.keys(p.ancestors).length > 0) return true;
  if (Object.values(p.heritage).some((v) => v !== undefined)) return true;
  if (p.spouse && (p.spouse.citizenships.length > 0 || p.spouse.marriedYear != null)) return true;
  return false;
}

export default function App() {
  const [screen, setScreenState] = useState<Screen>(screenFromHash);
  const [resumePrompt, setResumePrompt] = useState(false);
  const { profile, setProfile, reset } = useProfileState();

  useEffect(() => {
    const onPop = () => setScreenState(screenFromHash());
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, []);

  const navigate = (next: Screen, replace = false) => {
    const target = next === "landing" ? "#/" : `#/${next}`;
    if (replace) {
      window.history.replaceState(null, "", target);
    } else if (window.location.hash !== target) {
      window.history.pushState(null, "", target);
    }
    setScreenState(next);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <>
      {screen === "landing" && (
        <Landing
          onStart={() => {
            if (profileHasData(profile)) {
              setResumePrompt(true);
            } else {
              navigate("wizard");
            }
          }}
          onBrowse={() => navigate("browse")}
        />
      )}
      {resumePrompt && (
        <ResumeDialog
          onResume={() => {
            setResumePrompt(false);
            navigate("wizard");
          }}
          onStartFresh={() => {
            reset();
            setResumePrompt(false);
            navigate("wizard");
          }}
          onCancel={() => setResumePrompt(false)}
        />
      )}
      {screen === "browse" && <Browse />}
      {screen === "sources" && <Sources />}
      {screen === "wizard" && (
        <Wizard
          profile={profile}
          setProfile={setProfile}
          onSubmit={() => navigate("results")}
        />
      )}
      {screen === "results" && (
        <Results
          profile={profile}
          onBack={() => navigate("wizard")}
          onSources={() => navigate("sources")}
          onRestart={() => {
            reset();
            navigate("landing");
          }}
        />
      )}
    </>
  );
}

function ResumeDialog({
  onResume,
  onStartFresh,
  onCancel,
}: {
  onResume: () => void;
  onStartFresh: () => void;
  onCancel: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md border border-border bg-[#161618] p-6 sm:p-7">
        <h2 className="font-extrabold tracking-[-0.02em] text-[1.4rem] mb-3">
          Pick up where you left off?
        </h2>
        <p className="text-ink/70 leading-relaxed mb-6">
          You already have answers saved in this browser. Continue with them, or
          start fresh and clear everything?
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onResume}
            className="font-mono uppercase tracking-[0.22em] text-[12px] font-medium border border-accent bg-accent text-white px-6 py-3 transition hover:bg-transparent hover:text-accent"
          >
            Resume
          </button>
          <button
            onClick={onStartFresh}
            className="font-mono uppercase tracking-[0.22em] text-[12px] font-medium border border-white/10 text-ink px-6 py-3 transition hover:border-accent hover:text-accent"
          >
            Start fresh
          </button>
        </div>
      </div>
    </div>
  );
}
