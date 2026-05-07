import { useCallback, useEffect, useState } from "react";
import { emptyProfile } from "../types/profile";
import type { UserProfile } from "../types/profile";

const STORAGE_KEY = "citizenship-app:profile";

function loadProfile(): UserProfile {
  if (typeof window === "undefined") return emptyProfile();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProfile();
    return { ...emptyProfile(), ...(JSON.parse(raw) as UserProfile) };
  } catch {
    return emptyProfile();
  }
}

export function useProfileState() {
  const [profile, setProfile] = useState<UserProfile>(() => loadProfile());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore quota errors
    }
  }, [profile]);

  const reset = useCallback(() => setProfile(emptyProfile()), []);

  return { profile, setProfile, reset };
}
