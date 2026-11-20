export type OpenStatus = {
  open: boolean;
  until?: number;
  opensAt?: number;
};

export function bangkokNow(): { day: number; mins: number } {
  const n = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
  );
  return { day: n.getDay(), mins: n.getHours() * 60 + n.getMinutes() };
}

/** schedule[dayOfWeek] = [openHour, closeHour], 0 = Sunday */
export function getOpenStatus(schedule: [number, number][]): OpenStatus {
  const { day, mins } = bangkokNow();
  const [o, c] = schedule[day];
  if (mins >= o * 60 && mins < c * 60) {
    return { open: true, until: c };
  }
  const next = mins < o * 60 ? o : schedule[(day + 1) % 7][0];
  return { open: false, opensAt: next };
}

export function formatHour(h: number): string {
  return `${h.toString().padStart(2, "0")}:00`;
}

export function formatStatusLabel(
  status: OpenStatus,
  templates: { openNow: string; closed: string },
): string {
  if (status.open && status.until != null) {
    return templates.openNow.replace("{time}", formatHour(status.until));
  }
  return templates.closed.replace(
    "{time}",
    formatHour(status.opensAt ?? 0),
  );
}

export function bangkokDayOfWeek(): number {
  return bangkokNow().day;
}
