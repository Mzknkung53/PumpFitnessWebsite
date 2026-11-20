export type Lang = "en" | "th";

export type LocalizedString = { en: string; th: string };

export type PassId = "day" | "week" | "month" | "months3" | "months6" | "year";

export type BranchId = "chang-phuak" | "chiang-mai-gate";

export type BranchPrices = {
  currency: string;
  day: number;
  week: number;
  month: number;
  months3: number;
  months6: number;
  year: number | null;
};

export type Branch = {
  id: BranchId;
  legacyId: string;
  short: string;
  name: string;
  fullName: string;
  tag: LocalizedString;
  area: LocalizedString;
  blurb: LocalizedString;
  highlights: { en: string[]; th: string[] };
  address: LocalizedString;
  phone: string;
  schedule: { days: number[][] };
  hours: {
    days: number[];
    en: string;
    th: string;
    time: string;
  }[];
  prices: BranchPrices;
  mapUrl: string;
  photos: string[];
};

export type SiteContent = {
  branches: Branch[];
  status: {
    openNow: LocalizedString;
    closed: LocalizedString;
    openShort: LocalizedString;
    closedShort: LocalizedString;
    today: LocalizedString;
  };
  copy: {
    brandSub: LocalizedString;
    nav: {
      branches: LocalizedString;
      prices: LocalizedString;
      equipment: LocalizedString;
      faq: LocalizedString;
      cta: LocalizedString;
    };
    hero: {
      eyebrow: LocalizedString;
      title: LocalizedString;
      titleAccent: LocalizedString;
      sub: LocalizedString;
      cta1: LocalizedString;
      cta2: LocalizedString;
      floatDay: LocalizedString;
      floatDayValue: string;
      floatFloors: LocalizedString;
      floatFloorsValue: string;
    };
    marquee: string[];
    branches: {
      eyebrow: LocalizedString;
      title: LocalizedString;
      sub: LocalizedString;
      hours: LocalizedString;
      address: LocalizedString;
      phone: LocalizedString;
      perDay: LocalizedString;
      perMonth: LocalizedString;
      maps: LocalizedString;
      reviews: LocalizedString;
    };
    passes: {
      eyebrow: LocalizedString;
      title: LocalizedString;
      sub: LocalizedString;
      badgeBig: LocalizedString;
      visit: LocalizedString;
      tabs: {
        id: PassId;
        months: number;
        label: LocalizedString;
        unit: LocalizedString;
        note: LocalizedString;
      }[];
      perMonthEquivalent: LocalizedString;
      notOffered: LocalizedString;
      notOfferedSub: LocalizedString;
      personalTraining: {
        eyebrow: LocalizedString;
        title: LocalizedString;
        sub: LocalizedString;
        perSession: LocalizedString;
        single: LocalizedString;
      };
    };
    equipment: {
      eyebrow: LocalizedString;
      title: LocalizedString;
      sub: LocalizedString;
      features: {
        icon: string;
        title: LocalizedString;
        desc: LocalizedString;
      }[];
    };
    gallery: {
      eyebrow: LocalizedString;
      title: LocalizedString;
      instagram: string;
      items: { type: string; label: string }[];
    };
    reviews: {
      eyebrow: LocalizedString;
      title: LocalizedString;
      items: {
        source: string;
        url?: string;
        kind: string;
        text: LocalizedString;
      }[];
    };
    faq: {
      eyebrow: LocalizedString;
      title: LocalizedString;
      items: { q: LocalizedString; a: LocalizedString }[];
    };
    cta: {
      title: LocalizedString;
      sub: LocalizedString;
    };
    footer: {
      tagline: LocalizedString;
      follow: LocalizedString;
      social: {
        facebook: string;
        instagram: string;
        line: string;
      };
      backTop: LocalizedString;
      copyright: string;
    };
  };
  personalTraining: {
    currency: string;
    sameAtBothBranches: boolean;
    packages: { sessions: number; price: number }[];
  };
};
