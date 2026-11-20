"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  formatStatusLabel,
  getOpenStatus,
  type OpenStatus,
} from "@/lib/openNow";
import type { Branch } from "@/lib/types";

export type BranchStatus = OpenStatus & {
  label: string;
  short: string;
  dotClass: string;
};

export function useBranchStatuses(): Record<string, BranchStatus> {
  const { lang, content, t } = useLanguage();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((n) => n + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);

  void tick;

  const result: Record<string, BranchStatus> = {};
  for (const branch of content.branches as Branch[]) {
    const status = getOpenStatus(
      branch.schedule.days as [number, number][],
    );
    result[branch.id] = {
      ...status,
      label: formatStatusLabel(status, {
        openNow: t(content.status.openNow),
        closed: t(content.status.closed),
      }),
      short: status.open
        ? t(content.status.openShort)
        : t(content.status.closedShort),
      dotClass: status.open ? "dot-open" : "",
    };
  }

  void lang;
  return result;
}
