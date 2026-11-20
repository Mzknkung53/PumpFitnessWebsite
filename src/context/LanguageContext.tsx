"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import contentJson from "@/data/content.json";
import { t as translate } from "@/lib/format";
import type { Lang, LocalizedString, SiteContent } from "@/lib/types";

const content = contentJson as unknown as SiteContent;
const STORAGE_KEY = "pump-lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (value: LocalizedString) => string;
  content: SiteContent;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type DocWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => unknown;
};

const FALLBACK_FADE_MS = 180;

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const langRef = useRef<Lang>("en");
  langRef.current = lang;

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "th") {
      setLangState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  // Crossfade the page while the text swaps, instead of snapping.
  const setLang = useCallback((next: Lang) => {
    if (next === langRef.current) return;
    const doc = document as DocWithViewTransition;

    if (typeof doc.startViewTransition === "function") {
      // Chrome / Edge / Safari 18+: browser snapshots old and new page and blends them.
      doc.startViewTransition(() => {
        flushSync(() => setLangState(next));
      });
      return;
    }

    // Older browsers: fade content out, swap, fade back in.
    const root = document.documentElement;
    root.classList.add("lang-switching");
    window.setTimeout(() => {
      setLangState(next);
      requestAnimationFrame(() => root.classList.remove("lang-switching"));
    }, FALLBACK_FADE_MS);
  }, []);

  const t = useCallback(
    (value: LocalizedString) => translate(value, lang),
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, t, content }),
    [lang, setLang, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
