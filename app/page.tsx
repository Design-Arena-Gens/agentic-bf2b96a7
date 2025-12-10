"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  format,
  isValid,
  parseISO
} from "date-fns";
import { CalendarDays, Sparkles, Sunrise, Sunset } from "lucide-react";

const milestoneAges = [1, 5, 10, 13, 16, 18, 21, 25, 30, 40, 50, 60, 65, 75, 90];

function calculateAge(birthday: Date | null, target: Date | null) {
  if (!birthday || !target || !isValid(birthday) || !isValid(target) || birthday > target) {
    return null;
  }

  const years = differenceInYears(target, birthday);
  const months = differenceInMonths(target, birthday) % 12;
  const days = differenceInDays(target, addYears(birthday, years)) % 30;

  const totalDaysLived = differenceInDays(target, birthday);

  const nextMilestoneAge = milestoneAges.find((age) => age > years);
  const nextMilestoneDate = nextMilestoneAge
    ? addYears(birthday, nextMilestoneAge)
    : null;

  const daysUntilNextMilestone = nextMilestoneDate
    ? differenceInDays(nextMilestoneDate, target)
    : null;

  return {
    years,
    months,
    days,
    totalDaysLived,
    nextMilestoneAge,
    nextMilestoneDate,
    daysUntilNextMilestone
  };
}

const backgroundGradients = [
  "from-sky-500/40 via-emerald-500/30 to-blue-600/40",
  "from-purple-500/40 via-pink-500/30 to-amber-500/40",
  "from-cyan-500/40 via-blue-500/30 to-indigo-500/40"
];

export default function Page() {
  const [birthDate, setBirthDate] = useState<string>("1995-04-15");
  const [viewDate, setViewDate] = useState<string>(() => format(new Date(), "yyyy-MM-dd"));

  const computedAge = useMemo(() => {
    const birth = birthDate ? parseISO(birthDate) : null;
    const view = viewDate ? parseISO(viewDate) : null;
    return calculateAge(birth, view);
  }, [birthDate, viewDate]);

  const summary = computedAge
    ? `${computedAge.years} years ${computedAge.months} months ${computedAge.days} days`
    : "Set a valid birth date";

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden py-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[0, 1, 2].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 2, delay: item * 0.4 }}
            className={`absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-[720px] sm:w-[720px] ${backgroundGradients[item]}`}
            style={{
              top: `${30 + item * 20}%`,
              left: `${50 + (item - 1) * 20}%`
            }}
          />
        ))}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-8"
      >
        <header className="flex flex-col gap-4 text-center sm:gap-6">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 backdrop-blur">
            <Sparkles className="h-4 w-4 text-sky-300" />
            ChronoSpan Age Studio
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
            Discover your <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">age story</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-300 sm:text-lg">
            Enter your birth details to surface nuanced milestones, celebrate lived moments, and forecast the next meaningful chapters with cinematic precision.
          </p>
        </header>

        <div className="grid w-full gap-8 lg:grid-cols-[1.3fr_1fr]">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%)]" />
            <div className="relative grid gap-10 p-8 sm:p-12">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="group flex flex-col gap-3">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    <Sunrise className="h-4 w-4 text-sky-300" /> Birth date
                  </span>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(event) => setBirthDate(event.target.value)}
                    max={viewDate}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-white shadow-inner shadow-black/20 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40"
                  />
                </label>
                <label className="group flex flex-col gap-3">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    <Sunset className="h-4 w-4 text-amber-300" /> Reference date
                  </span>
                  <input
                    type="date"
                    value={viewDate}
                    onChange={(event) => setViewDate(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-lg text-white shadow-inner shadow-black/20 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-500/40"
                  />
                </label>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid gap-6 rounded-3xl border border-white/10 bg-slate-950/50 p-6"
              >
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h2 className="text-sm uppercase tracking-[0.35em] text-slate-400">Current age</h2>
                    <p className="mt-2 text-4xl font-bold text-white sm:text-5xl">{summary}</p>
                  </div>
                  {computedAge && (
                    <div className="flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
                      <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                      {computedAge.totalDaysLived.toLocaleString()} days lived
                    </div>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <StatisticCard
                    label="Years"
                    value={computedAge ? computedAge.years : "-"}
                    accent="from-sky-400 via-cyan-400 to-blue-500"
                  />
                  <StatisticCard
                    label="Months"
                    value={computedAge ? computedAge.months : "-"}
                    accent="from-purple-400 via-fuchsia-400 to-rose-500"
                  />
                  <StatisticCard
                    label="Days"
                    value={computedAge ? computedAge.days : "-"}
                    accent="from-emerald-400 via-lime-400 to-green-500"
                  />
                </div>

                {computedAge?.nextMilestoneAge && computedAge.nextMilestoneDate && (
                  <div className="grid gap-3 rounded-2xl border border-white/5 bg-white/5 p-5 text-slate-200">
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-400">
                      <CalendarDays className="h-4 w-4 text-sky-300" /> Upcoming milestone
                    </div>
                    <div className="flex flex-wrap items-center gap-5">
                      <div>
                        <p className="text-3xl font-semibold text-white">
                          Turning {computedAge.nextMilestoneAge}
                        </p>
                        <p className="text-sm text-slate-300">
                          {format(computedAge.nextMilestoneDate, "MMMM d, yyyy")}
                        </p>
                      </div>
                      {computedAge.daysUntilNextMilestone !== null && (
                        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm">
                          <span className="text-cyan-300 font-semibold">
                            {computedAge.daysUntilNextMilestone}
                          </span>
                          days remaining
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            <InsightCard
              title="Time signature"
              description="Your age is continuously evolving – these cards translate your chronology into evocative snapshots."
              items={computedAge ? buildTimeSignatures(computedAge.totalDaysLived) : []}
            />
            <InsightCard
              title="Precision milestones"
              description="Spotlight the next chapters worth celebrating, curated from cultural, professional, and wellness markers."
              items={buildMilestoneInsights(computedAge)}
            />
          </motion.aside>
        </div>
      </motion.section>
    </main>
  );
}

type StatisticCardProps = {
  label: string;
  value: number | string;
  accent: string;
};

function StatisticCard({ label, value, accent }: StatisticCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <div className={`absolute -right-8 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${accent} opacity-30 blur-2xl`} />
      <div className="relative z-10">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
        <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

type InsightCardProps = {
  title: string;
  description: string;
  items: { label: string; value: string }[];
};

function InsightCard({ title, description, items }: InsightCardProps) {
  return (
    <div className="relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(99,102,241,0.25),transparent_55%)]" />
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
      <div className="relative z-10 grid gap-3">
        {items.length === 0 && <p className="text-sm text-slate-400">Awaiting a valid birth date to unlock insights.</p>}
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-200"
          >
            <span className="font-medium text-white">{item.label}</span>
            <span className="text-slate-300">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

type ComputedAge = ReturnType<typeof calculateAge>;

function buildMilestoneInsights(age: ComputedAge) {
  if (!age || !age.nextMilestoneAge || !age.nextMilestoneDate) {
    return [];
  }

  const milestoneMood = age.nextMilestoneAge >= 50 ? "Legacy focus" : "Momentum phase";

  return [
    {
      label: `Next milestone: ${age.nextMilestoneAge}`,
      value: format(age.nextMilestoneDate, "MMMM d, yyyy")
    },
    {
      label: "Days remaining",
      value: age.daysUntilNextMilestone !== null ? `${age.daysUntilNextMilestone}` : "--"
    },
    {
      label: "Seasonal narrative",
      value: milestoneMood
    }
  ];
}

function buildTimeSignatures(totalDaysLived: number | undefined | null) {
  if (!totalDaysLived) {
    return [];
  }

  const weeks = Math.floor(totalDaysLived / 7);
  const hours = totalDaysLived * 24;
  const heartbeats = totalDaysLived * 104_000;

  return [
    {
      label: "Weeks experienced",
      value: weeks.toLocaleString()
    },
    {
      label: "Hours alive",
      value: hours.toLocaleString()
    },
    {
      label: "Approx. heartbeats",
      value: heartbeats.toLocaleString()
    }
  ];
}
