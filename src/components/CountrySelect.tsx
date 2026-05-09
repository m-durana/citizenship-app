import { useEffect, useMemo, useRef, useState } from "react";
import { COUNTRIES, COUNTRY_BY_CODE } from "../data/countries";

type SingleProps = {
  mode: "single";
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
  className?: string;
};

type MultiProps = {
  mode: "multi";
  value: string[];
  onChange: (codes: string[]) => void;
  placeholder?: string;
  className?: string;
};

type Props = SingleProps | MultiProps;

export function CountrySelect(props: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const selectedCodes =
    props.mode === "multi" ? props.value : props.value ? [props.value] : [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
    );
  }, [query]);

  const isSelected = (code: string) => selectedCodes.includes(code);

  const toggle = (code: string) => {
    if (props.mode === "multi") {
      const next = isSelected(code)
        ? props.value.filter((c) => c !== code)
        : [...props.value, code];
      props.onChange(next);
    } else {
      props.onChange(code);
      setOpen(false);
      setQuery("");
    }
  };

  const clear = (code: string) => {
    if (props.mode === "multi") {
      props.onChange(props.value.filter((c) => c !== code));
    } else {
      props.onChange("");
    }
  };

  const placeholder =
    props.placeholder ??
    (props.mode === "multi" ? "Select countries..." : "Select a country...");

  return (
    <div ref={rootRef} className={`relative ${props.className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full text-left bg-panel border border-border px-3 flex items-center justify-between gap-2 ${
          props.mode === "single" ? "h-10" : "min-h-[40px] py-1.5"
        }`}
      >
        <div
          className={`flex items-center gap-1.5 flex-1 min-w-0 ${
            props.mode === "multi" ? "flex-wrap" : "overflow-hidden"
          }`}
        >
          {selectedCodes.length === 0 && (
            <span className="text-muted text-sm truncate">{placeholder}</span>
          )}
          {props.mode === "multi" &&
            selectedCodes.map((code) => {
              const c = COUNTRY_BY_CODE[code];
              if (!c) return null;
              return (
                <span
                  key={code}
                  className="inline-flex items-center gap-1.5 bg-bg border border-border px-2 py-1 font-mono uppercase tracking-[0.14em] text-[10px] text-ink"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm normal-case tracking-normal">{c.flag}</span>
                  <span>{c.name}</span>
                  <button
                    type="button"
                    onClick={() => clear(code)}
                    className="text-muted hover:text-ink ml-0.5 text-sm leading-none"
                    aria-label={`Remove ${c.name}`}
                  >
                    ×
                  </button>
                </span>
              );
            })}
          {props.mode === "single" && selectedCodes[0] && (
            <span className="inline-flex items-center gap-1.5 min-w-0">
              <span className="shrink-0">{COUNTRY_BY_CODE[selectedCodes[0]]?.flag}</span>
              <span className="truncate text-sm">{COUNTRY_BY_CODE[selectedCodes[0]]?.name}</span>
            </span>
          )}
        </div>
        <span className="text-muted shrink-0">▾</span>
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-panel border border-border shadow-lg max-h-72 overflow-hidden flex flex-col">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-bg border-b border-border px-3 py-2 text-sm outline-none"
          />
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-sm text-muted">No matches.</div>
            )}
            {filtered.map((c) => {
              const selected = isSelected(c.code);
              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => toggle(c.code)}
                  className={`w-full text-left px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-bg ${selected ? "bg-bg/60" : ""}`}
                >
                  {props.mode === "multi" && (
                    <span
                      className={`inline-block w-4 h-4 rounded border ${selected ? "bg-accent border-accent" : "border-border"}`}
                      aria-hidden="true"
                    />
                  )}
                  <span>{c.flag}</span>
                  <span className="flex-1">{c.name}</span>
                  {props.mode === "single" && selected && (
                    <span className="text-accent">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
