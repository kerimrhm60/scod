import React from "react";

// ─── Toggle ───────────────────────────────────────────────────────────────────
export function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      className="toggle-btn"
      onClick={() => onChange(!on)}
      style={{
        background: on ? "linear-gradient(135deg, #7c3aed, #a78bfa)" : "#e5e7eb",
        boxShadow: on ? "0 0 10px rgba(124,58,237,0.35)" : "none",
      }}
    >
      <span className="toggle-thumb" style={{ left: on ? 23 : 3 }} />
    </button>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
type BadgeVariant = "green" | "yellow" | "red" | "purple";

export function Badge({ children, variant }: { children: React.ReactNode; variant: BadgeVariant }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, BadgeVariant> = {
    "Teslim Edildi": "green",
    "İade Edildi":   "green",
    "Yolda":         "yellow",
    "İşlemde":       "yellow",
    "Bekliyor":      "purple",
    "İptal":         "red",
  };
  const variant = map[status] ?? "purple";
  return <Badge variant={variant}>{status}</Badge>;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ initial = "A" }: { initial?: string }) {
  return <div className="avatar">{initial}</div>;
}