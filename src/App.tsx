import { useState } from "react";
import { Landing } from "./components/Landing";
import { Wizard } from "./components/Wizard";
import { Results } from "./components/Results";
import { useProfileState } from "./state/useProfileState";

type Screen = "landing" | "wizard" | "results";

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const { profile, setProfile, reset } = useProfileState();

  return (
    <>
      {screen === "landing" && <Landing onStart={() => setScreen("wizard")} />}
      {screen === "wizard" && (
        <Wizard
          profile={profile}
          setProfile={setProfile}
          onSubmit={() => setScreen("results")}
          onBack={() => setScreen("landing")}
        />
      )}
      {screen === "results" && (
        <Results
          profile={profile}
          onBack={() => setScreen("wizard")}
          onRestart={() => {
            reset();
            setScreen("landing");
          }}
        />
      )}
    </>
  );
}
