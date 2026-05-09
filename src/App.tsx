import { useEffect, useState } from "react";
import { Landing } from "./components/Landing";
import { Wizard } from "./components/Wizard";
import { Results } from "./components/Results";
import { Browse } from "./components/Browse";
import { Sources } from "./components/Sources";
import { useProfileState } from "./state/useProfileState";

type Screen = "landing" | "wizard" | "results" | "browse" | "sources";

const SCREENS: Screen[] = ["landing", "wizard", "results", "browse", "sources"];

function screenFromHash(): Screen {
  const h = window.location.hash.replace(/^#\/?/, "") as Screen;
  return SCREENS.includes(h) ? h : "landing";
}

export default function App() {
  const [screen, setScreenState] = useState<Screen>(screenFromHash);
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
          onStart={() => navigate("wizard")}
          onBrowse={() => navigate("browse")}
        />
      )}
      {screen === "browse" && (
        <Browse
          onBack={() => navigate("landing")}
          onSources={() => navigate("sources")}
        />
      )}
      {screen === "sources" && <Sources onBack={() => window.history.back()} />}
      {screen === "wizard" && (
        <Wizard
          profile={profile}
          setProfile={setProfile}
          onSubmit={() => navigate("results")}
          onBack={() => navigate("landing")}
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
