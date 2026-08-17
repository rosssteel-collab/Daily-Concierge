import { useState, useEffect } from "react";

// ── ROTA DATA BY MONTH ───────────────────────────────────────────────
const MONTHS = [
 {
  label: "June 2026",
  weeks: [
    { label: "Week 1", dates: "1–7 Jun", days: [
      { date: "Mon 1/6",  D: null   , A: null   , K: [12,21], H: [14,23] },
      { date: "Tue 2/6",  D: [12,21], A: null   , K: null   , H: [14,23] },
      { date: "Wed 3/6",  D: [12,21], A: [14,23], K: [14,23], H: null    },
      { date: "Thu 4/6",  D: [12,21], A: [14,23], K: [14,23], H: null    },
      { date: "Fri 5/6",  D: [12,21], A: [14,23], K: [12,21], H: [14,23] },
      { date: "Sat 6/6",  D: [9,18], A: [12,21], K: null   , H: [14,23] },
      { date: "Sun 7/6",  D: null   , A: [12,21], K: [9,18], H: [14,23] },
    ]},
    { label: "Week 2", dates: "8–14 Jun", days: [
      { date: "Mon 8/6",  D: null   , A: [12,21], K: [14,23], H: null    },
      { date: "Tue 9/6",  D: null   , A: null   , K: [14,23], H: [12,21] },
      { date: "Wed 10/6",  D: [14,23], A: [14,23], K: null   , H: [12,21] },
      { date: "Thu 11/6",  D: [14,23], A: [14,23], K: null   , H: [12,21] },
      { date: "Fri 12/6",  D: [14,23], A: [12,21], K: [14,23], H: [12,21] },
      { date: "Sat 13/6",  D: [12,21], A: null   , K: [14,23], H: [9,18] },
      { date: "Sun 14/6",  D: [12,21], A: [9,18], K: [14,23], H: null    },
    ]},
    { label: "Week 3", dates: "15–21 Jun", days: [
      { date: "Mon 15/6",  D: [12,21], A: [14,23], K: null   , H: null    },
      { date: "Tue 16/6",  D: null   , A: [14,23], K: [12,21], H: null    },
      { date: "Wed 17/6",  D: [14,23], A: null   , K: [12,21], H: [14,23] },
      { date: "Thu 18/6",  D: [14,23], A: null   , K: [12,21], H: [14,23] },
      { date: "Fri 19/6",  D: [12,21], A: [14,23], K: [12,21], H: [14,23] },
      { date: "Sat 20/6",  D: null   , A: [14,23], K: [9,18], H: [12,21] },
      { date: "Sun 21/6",  D: [9,18], A: [14,23], K: null   , H: [12,21] },
    ]},
    { label: "Week 4", dates: "22–28 Jun", days: [
      { date: "Mon 22/6",  D: [14,23], A: null   , K: null   , H: [12,21] },
      { date: "Tue 23/6",  D: [14,23], A: [12,21], K: null   , H: null    },
      { date: "Wed 24/6",  D: null   , A: [12,21], K: [14,23], H: [14,23] },
      { date: "Thu 25/6",  D: null   , A: [12,21], K: [14,23], H: [14,23] },
      { date: "Fri 26/6",  D: [14,23], A: [12,21], K: [14,23], H: [12,21] },
      { date: "Sat 27/6",  D: [14,23], A: [9,18], K: [12,21], H: null    },
      { date: "Sun 28/6",  D: [14,23], A: null   , K: [12,21], H: [9,18] },
    ]},
    { label: "Week 5", dates: "29 Jun–5 Jul", days: [
      { date: "Mon 29/6",  D: null   , A: null   , K: [12,21], H: [14,23] },
      { date: "Tue 30/6",  D: [12,21], A: null   , K: null   , H: [14,23] },
      { date: "Wed 1/7",  D: [12,21], A: [14,23], K: [14,23], H: null    },
      { date: "Thu 2/7",  D: [12,21], A: [14,23], K: [14,23], H: null    },
      { date: "Fri 3/7",  D: [12,21], A: [14,23], K: [12,21], H: [14,23] },
      { date: "Sat 4/7",  D: [9,18], A: [12,21], K: null   , H: [14,23] },
      { date: "Sun 5/7",  D: null   , A: [12,21], K: [9,18], H: [14,23] },
    ]},
  ]},
 {
  label: "July 2026",
  weeks: [
    { label: "Week 1", dates: "6–12 Jul", days: [
      { date: "Mon 6/7",  D: null   , A: [12,21], K: [14,23], H: null    },
      { date: "Tue 7/7",  D: null   , A: null   , K: [14,23], H: [12,21] },
      { date: "Wed 8/7",  D: [14,23], A: [14,23], K: null   , H: [12,21] },
      { date: "Thu 9/7",  D: [14,23], A: [14,23], K: null   , H: [12,21] },
      { date: "Fri 10/7",  D: [14,23], A: [12,21], K: [14,23], H: [12,21] },
      { date: "Sat 11/7",  D: [12,21], A: null   , K: [14,23], H: [9,18] },
      { date: "Sun 12/7",  D: [12,21], A: [9,18], K: [14,23], H: null    },
    ]},
    { label: "Week 2", dates: "13–19 Jul", days: [
      { date: "Mon 13/7",  D: [12,21], A: [14,23], K: null   , H: null    },
      { date: "Tue 14/7",  D: null   , A: [14,23], K: [12,21], H: null    },
      { date: "Wed 15/7",  D: [14,23], A: null   , K: [12,21], H: [14,23] },
      { date: "Thu 16/7",  D: [14,23], A: null   , K: [12,21], H: [14,23] },
      { date: "Fri 17/7",  D: [12,21], A: [14,23], K: [12,21], H: [14,23] },
      { date: "Sat 18/7",  D: null   , A: [14,23], K: [9,18], H: [12,21] },
      { date: "Sun 19/7",  D: [9,18], A: [14,23], K: null   , H: [12,21] },
    ]},
    { label: "Week 3", dates: "20–26 Jul", days: [
      { date: "Mon 20/7",  D: [14,23], A: null   , K: null   , H: [12,21] },
      { date: "Tue 21/7",  D: [14,23], A: [12,21], K: null   , H: null    },
      { date: "Wed 22/7",  D: null   , A: [12,21], K: [14,23], H: [14,23] },
      { date: "Thu 23/7",  D: null   , A: [12,21], K: [14,23], H: [14,23] },
      { date: "Fri 24/7",  D: null,    A: [12,21], K: [14,23], H: [12,21] },
      { date: "Sat 25/7",  D: null,    A: [9,18],  K: [14,23], H: null    },
      { date: "Sun 26/7",  D: null,    A: null,    K: [14,23], H: [9,18]  },
    ]},
    { label: "Week 4", dates: "27 Jul–2 Aug", days: [
      { date: "Mon 27/7",  D: null   , A: null   , K: [12,21], H: [14,23] },
      { date: "Tue 28/7",  D: [12,21], A: null   , K: null   , H: [14,23] },
      { date: "Wed 29/7",  D: [12,21], A: [14,23], K: [14,23], H: null    },
      { date: "Thu 30/7",  D: [12,21], A: [14,23], K: [14,23], H: null    },
      { date: "Fri 31/7",  D: [12,21], A: [14,23], K: [12,21], H: [14,23] },
      { date: "Sat 1/8",  D: [9,18], A: [12,21], K: null   , H: [14,23] },
      { date: "Sun 2/8",  D: null   , A: [12,21], K: [9,18], H: [14,23] },
    ]},
  ]},
  {
  label: "August 2026",
  weeks: [
    { label: "Week 1", dates: "3–9 Aug", days: [
      { date: "Mon 3/8",  D: null   , A: [12,21], K: [14,23], H: null    },
      { date: "Tue 4/8",  D: null   , A: null   , K: [14,23], H: [12,21] },
      { date: "Wed 5/8",  D: [14,23], A: [14,23], K: null   , H: [12,21] },
      { date: "Thu 6/8",  D: [14,23], A: [14,23], K: null   , H: [12,21] },
      { date: "Fri 7/8",  D: [14,23], A: [12,21], K: [14,23], H: [12,21] },
      { date: "Sat 8/8",  D: [12,21], A: null   , K: [14,23], H: [9,18] },
      { date: "Sun 9/8",  D: [12,21], A: [9,18], K: [14,23], H: null    },
    ]},
    { label: "Week 2", dates: "10–16 Aug", days: [
      { date: "Mon 10/8",  D: [12,21], A: [14,23], K: null   , H: null    },
      { date: "Tue 11/8",  D: null   , A: [14,23], K: [12,21], H: null    },
      { date: "Wed 12/8",  D: [14,23], A: null   , K: [12,21], H: [14,23] },
      { date: "Thu 13/8",  D: [12,21], A: null   , K: [12,21], H: [14,23] },
      { date: "Fri 14/8",  D: [12,21], A: [14,23], K: null   , H: [12,21] },
      { date: "Sat 15/8",  D: null   , A: [14,23], K: null   , H: [9,18] },
      { date: "Sun 16/8",  D: [9,18], A: [14,23], K: null   , H: [12,21] },
    ]},
    { label: "Week 3", dates: "17–23 Aug", days: [
      { date: "Mon 17/8",  D: [14,23], A: null   , K: null   , H: [12,21] },
      { date: "Tue 18/8",  D: [14,23], A: [12,21], K: null   , H: null    },
      { date: "Wed 19/8",  D: null   , A: [12,21], K: [14,23], H: [14,23] },
      { date: "Thu 20/8",  D: null   , A: [12,21], K: [14,23], H: [14,23] },
      { date: "Fri 21/8",  D: [14,23], A: [12,21], K: [14,23], H: [12,21] },
      { date: "Sat 22/8",  D: [14,23], A: [9,18], K: [12,21], H: null    },
      { date: "Sun 23/8",  D: [14,23], A: null   , K: [12,21], H: [9,18] },
    ]},
    { label: "Week 4", dates: "24–30 Aug", days: [
      { date: "Mon 24/8",  D: null   , A: null   , K: [12,21], H: [14,23] },
      { date: "Tue 25/8",  D: [14,23], A: [12,21], K: null   , H: null    },
      { date: "Wed 26/8",  D: [12,21], A: null   , K: [14,23], H: null    },
      { date: "Thu 27/8",  D: [12,21], A: [14,23], K: [14,23], H: null    },
      { date: "Fri 28/8",  D: [12,21], A: [14,23], K: [12,21], H: null    },
      { date: "Sat 29/8",  D: [9,18], A: [14,23], K: null   , H: null    },
      { date: "Sun 30/8",  D: null   , A: [12,21], K: [9,18], H: [14,23] },
    ]},
  ]},
  {
  label: "September 2026",
  weeks: [
    { label: "Week 1", dates: "31 Aug–6 Sep", days: [
      { date: "Mon 31/8", D: null,    A: [12,21], K: [14,23], H: null    },
      { date: "Tue 1/9",  D: null,    A: null,    K: [14,23], H: [12,21] },
      { date: "Wed 2/9",  D: [14,23], A: [14,23], K: null,    H: [12,21] },
      { date: "Thu 3/9",  D: [14,23], A: [14,23], K: null,    H: [12,21] },
      { date: "Fri 4/9",  D: [14,23], A: [12,21], K: null,    H: [12,21] },
      { date: "Sat 5/9",  D: [14,23], A: null,    K: null,    H: [9,18]  },
      { date: "Sun 6/9",  D: [14,23], A: [9,18],  K: null,    H: null    },
    ]},
    { label: "Week 2", dates: "7–13 Sep", days: [
      { date: "Mon 7/9",  D: [12,21], A: [14,23], K: null,    H: null    },
      { date: "Tue 8/9",  D: null,    A: [14,23], K: [12,21], H: null    },
      { date: "Wed 9/9",  D: [14,23], A: null,    K: [12,21], H: [14,23] },
      { date: "Thu 10/9", D: [14,23], A: null,    K: [12,21], H: [14,23] },
      { date: "Fri 11/9", D: [12,21], A: [14,23], K: [12,21], H: [14,23] },
      { date: "Sat 12/9", D: null,    A: null,    K: [9,18],  H: [14,23] },
      { date: "Sun 13/9", D: [9,18],  A: null,    K: null,    H: [14,23] },
    ]},
    { label: "Week 3", dates: "14–20 Sep", days: [
      { date: "Mon 14/9", D: [14,23], A: null,    K: null,    H: [12,21] },
      { date: "Tue 15/9", D: [14,23], A: null,    K: [12,21], H: null    },
      { date: "Wed 16/9", D: null,    A: null,    K: [14,23], H: [12,21] },
      { date: "Thu 17/9", D: null,    A: null,    K: [14,23], H: [12,21] },
      { date: "Fri 18/9", D: [14,23], A: null,    K: null,    H: [12,21] },
      { date: "Sat 19/9", D: [14,23], A: [9,18],  K: [12,21], H: null    },
      { date: "Sun 20/9", D: [14,23], A: null,    K: [12,21], H: [9,18]  },
    ]},
    { label: "Week 4", dates: "21–27 Sep", days: [
      { date: "Mon 21/9", D: null,    A: null,    K: [12,21], H: [14,23] },
      { date: "Tue 22/9", D: [12,21], A: null,    K: null,    H: [14,23] },
      { date: "Wed 23/9", D: [12,21], A: [14,23], K: [14,23], H: null    },
      { date: "Thu 24/9", D: [12,21], A: [14,23], K: [14,23], H: null    },
      { date: "Fri 25/9", D: [12,21], A: [14,23], K: [12,21], H: [14,23] },
      { date: "Sat 26/9", D: [9,18],  A: [12,21], K: null,    H: [14,23] },
      { date: "Sun 27/9", D: null,    A: [12,21], K: [9,18],  H: [14,23] },
    ]},
    { label: "Week 5", dates: "28 Sep–4 Oct", days: [
      { date: "Mon 28/9", D: null,    A: [12,21], K: [14,23], H: null    },
      { date: "Tue 29/9", D: null,    A: null,    K: [14,23], H: [12,21] },
      { date: "Wed 30/9", D: [14,23], A: [14,23], K: null,    H: [12,21] },
      { date: "Thu 1/10", D: [14,23], A: [14,23], K: null,    H: [12,21] },
      { date: "Fri 2/10", D: [14,23], A: [12,21], K: [14,23], H: [12,21] },
      { date: "Sat 3/10", D: [12,21], A: null,    K: [14,23], H: [9,18]  },
      { date: "Sun 4/10", D: [12,21], A: [9,18],  K: [14,23], H: null    },
    ]},
  ]},
];

// ── HOLIDAYS ─────────────────────────────────────────────────────────
// Format: { agent: "Danica", from: "2026-06-15", to: "2026-06-19" }
// Dates are inclusive. Add approved holidays here.
const DEFAULT_HOLIDAYS = [
  { agent: "Danica", from: "2026-07-24", to: "2026-07-26" },
  { agent: "Kylene", from: "2026-08-14", to: "2026-08-15" },
  { agent: "Harvey", from: "2026-08-25", to: "2026-08-25" },
  { agent: "Harvey", from: "2026-08-28", to: "2026-08-29" },
  { agent: "Kylene", from: "2026-09-04", to: "2026-09-06" },
  { agent: "Angela", from: "2026-09-12", to: "2026-09-18" },
  { agent: "Sophia", from: "2026-09-17", to: "2026-09-18" },
  { agent: "Sophia", from: "2026-09-21", to: "2026-09-25" },
  { agent: "Ross", from: "2026-08-31", to: "2026-09-13" },
];

// Check if an agent is on holiday on a given date string (e.g. "Mon 15/6")
function parseDate(dateStr) {
  // Convert "Mon 15/6" or "Sat 1/8" to a comparable value
  const parts = dateStr.split(" ")[1].split("/");
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  return { day, month };
}

function isOnHoliday(agentName, dateStr, holidays) {
  const { day, month } = parseDate(dateStr);
  // Build a comparable YYYY-MM-DD string to avoid timezone issues
  const yearGuess = month >= 6 ? 2026 : 2027; // covers Jun 2026 – early 2027
  const dStr = `${yearGuess}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  return holidays.some(h => {
    if (h.agent !== agentName) return false;
    return dStr >= h.from && dStr <= h.to;
  });
}

const NAMES  = { D: "Danica", A: "Angela", K: "Kylene", H: "Harvey", S: "Sophia", R: "Ross" };
const COLORS = { Danica: "#8B1C3C", Angela: "#C4622D", Kylene: "#6B7C3A", Harvey: "#4A6FA5", Sophia: "#7C3A6B", Ross: "#2C6B5A" };
const TASKS  = ["HubSpot", "Hub & CS Slack", "Nash"];
const TCOLS  = { "HubSpot": "#8B1C3C", "Hub & CS Slack": "#4A6B3A", "Nash": "#C4622D" };

// Timeline constants — work in half-hour units throughout
const S = 9, E = 23, SPAN = E - S;
const S2 = S * 2, E2 = E * 2; // half-hour unit equivalents
const isWD = d => !d.startsWith("Sat") && !d.startsWith("Sun");

// Format hour — handles half hours e.g. 16.5 → "16:30"
const fmt = h => `${String(Math.floor(h)).padStart(2,"0")}:${h % 1 === 0.5 ? "30" : "00"}`;

// Position helpers for timeline bars (percentages)
const pct  = h => ((h - S) / SPAN * 100).toFixed(3) + "%";
const wpct = (a, b) => ((Math.min(b, E) - Math.max(a, S)) / SPAN * 100).toFixed(3) + "%";

// ── LUNCH SCHEDULING ─────────────────────────────────────────────────
// Works in half-hour integer units to avoid floating point issues.
// Rules:
//   1. No two agents on lunch at the same time
//   2. At least one other agent must be available to cover during each agent's lunch
//   3. Lunch placed as close to shift midpoint as possible
function assignLunches(agents) {
  // Store lunches in half-hour units internally
  // Half-hour unit N = N * 0.5 real hours (e.g. unit 33 = 16.5h = 16:30)
  const lunchSlots = new Array(agents.length).fill(null);

  agents.forEach((agent, idx) => {
    const s2 = agent.start * 2;  // shift start in half-hour units
    const e2 = agent.end * 2;    // shift end in half-hour units
    // Lunch midpoint: (s2 + e2) / 2, rounded to nearest integer (each integer = 30min)
    const mid2 = Math.round((s2 + e2) / 2);

    const candidates = [];

    // Try every half-hour slot from 1h into shift to 1.5h before end
    for (let t = s2 + 2; t <= e2 - 3; t++) {
      const lEnd = t + 2; // 1 hour = 2 half-hour units

      // Rule 1: no overlap with already assigned lunches
      let clash = false;
      for (let oi = 0; oi < agents.length; oi++) {
        if (oi === idx) continue;
        const ol = lunchSlots[oi];
        if (ol && t < ol[1] && lEnd > ol[0]) { clash = true; break; }
      }
      if (clash) continue;

      // Rule 2: every half-hour of this lunch has at least one other agent covering
      let covered = true;
      for (let h = t; h < lEnd; h++) {
        let hasCover = false;
        for (let oi = 0; oi < agents.length; oi++) {
          if (oi === idx) continue;
          const other = agents[oi];
          const os2 = other.start * 2;
          const oe2 = other.end * 2;
          if (h < os2 || h >= oe2) continue;
          const ol = lunchSlots[oi];
          if (ol && h >= ol[0] && h < ol[1]) continue;
          hasCover = true;
          break;
        }
        if (!hasCover) { covered = false; break; }
      }
      if (!covered) continue;

      candidates.push({ t, dist: Math.abs(t - mid2) });
    }

    if (candidates.length > 0) {
      candidates.sort((a, b) => a.dist - b.dist);
      const best = candidates[0].t;
      lunchSlots[idx] = [best, best + 2];
    } else {
      // Fallback: midpoint no matter what
      lunchSlots[idx] = [mid2, mid2 + 2];
    }
  });

  // Convert back to real hours
  agents.forEach((agent, idx) => {
    const l = lunchSlots[idx];
    agent.lunch = [l[0] / 2, l[1] / 2];
  });

  return agents;
}

// ── BUILD AGENTS FOR A DAY ───────────────────────────────────────────
function getAgents(day, holidays = []) {
  let agents = Object.entries(NAMES)
    .filter(([k]) => day[k])
    .filter(([k]) => !isOnHoliday(NAMES[k], day.date, holidays))
    .map(([k]) => {
      const [s, e] = day[k];
      return { name: NAMES[k], start: s, end: e, lunch: null };
    });
  agents.sort((a, b) => a.start - b.start);
  return assignLunches(agents);
}

// Get agents on holiday on a given day (for display)
// Check ALL agents regardless of whether they have a shift — holiday takes precedence
function getOnHoliday(day, holidays = []) {
  const phOnHol = Object.values(NAMES)
    .filter(name => isOnHoliday(name, day.date, holidays));
  const ukOnHol = ["Sophia", "Ross"].filter(n => isOnHoliday(n, day.date, holidays));
  return [...ukOnHol, ...phOnHol];
}

// ── TASK ASSIGNMENT ──────────────────────────────────────────────────
// Works in half-hour units. Distributes tasks across available agents
// so no one is idle — each agent gets a primary task responsibility.
// Tasks: HubSpot=0, Hub & CS Slack=1, Nash=2

function avail2(agent, h2) {
  const s2 = agent.start * 2;
  const e2 = agent.end * 2;
  if (h2 < s2 || h2 >= e2) return false;
  if (agent.lunch) {
    const l0 = agent.lunch[0] * 2;
    const l1 = agent.lunch[1] * 2;
    if (h2 >= l0 && h2 < l1) return false;
  }
  return true;
}

function assignTasks(agents) {
  // Build per-task block arrays
  const taskBlocks = TASKS.map(() => []);

  let h2 = S2;
  while (h2 < E2) {
    const pool = agents.filter(a => avail2(a, h2));

    if (!pool.length) {
      h2++;
      continue;
    }

    // Find how long this pool stays the same
    let reach = h2 + 1;
    while (reach < E2) {
      const next = agents.filter(a => avail2(a, reach));
      if (next.length !== pool.length || next.some((a, i) => a.name !== pool[i].name)) break;
      reach++;
    }

    const blockStart = h2 / 2;
    const blockEnd = Math.min(reach, E2) / 2;

    // Distribute tasks among available agents round-robin
    // With 1 agent: all 3 tasks
    // With 2 agents: agent0=HubSpot+Hub&CS, agent1=Nash
    // With 3+ agents: one task each
    if (pool.length === 1) {
      TASKS.forEach((_, ti) => {
        taskBlocks[ti].push({ name: pool[0].name, start: blockStart, end: blockEnd });
      });
    } else if (pool.length === 2) {
      // Agent 0: HubSpot (most important)
      taskBlocks[0].push({ name: pool[0].name, start: blockStart, end: blockEnd });
      // Agent 1: Nash + Hub & CS Slack
      taskBlocks[1].push({ name: pool[1].name, start: blockStart, end: blockEnd });
      taskBlocks[2].push({ name: pool[1].name, start: blockStart, end: blockEnd });
    } else {
      // 3+ agents: one task each; any extra agents beyond TASKS.length are
      // paired onto an existing task (round-robin) so no one is left idle
      pool.forEach((agent, pi) => {
        const ti = pi % TASKS.length;
        taskBlocks[ti].push({ name: agent.name, start: blockStart, end: blockEnd });
      });
    }

    h2 = reach;
  }

  // Merge consecutive blocks with the same agent into one uninterrupted bar
  return TASKS.map((task, ti) => {
    const raw = taskBlocks[ti];
    const merged = [];
    raw.forEach(block => {
      const last = merged[merged.length - 1];
      if (last && last.name === block.name && last.end === block.start) {
        last.end = block.end;
      } else {
        merged.push({ ...block });
      }
    });
    return { task, blocks: merged };
  });
}

// ── SLACK BRIEF GENERATOR ────────────────────────────────────────────
function buildSlack(day, agents, weekday, onHoliday) {
  const lines = [`📅 ${day.date} — Cotta Concierge Daily Brief`, "", "Today's team:"];
  if (weekday) {
    if (!onHoliday.includes("Ross"))   lines.push("• @Ross — 09:00–17:00 (oversight)");
    if (!onHoliday.includes("Sophia")) lines.push("• @Sophia — 09:00–17:00");
  }
  agents.forEach(a => lines.push(`• @${a.name} — ${fmt(a.start)}–${fmt(a.end)}`));
  if (onHoliday.length > 0) {
    lines.push("", `🏖 On holiday today: ${onHoliday.join(", ")}`);
  }
  lines.push("", "Lunch schedule:");
  agents.forEach(a => lines.push(`• ${a.name} — ${fmt(a.lunch[0])}–${fmt(a.lunch[1])}`));
  lines.push("", "React ✅ once seen. Notify in thread before stepping away. Don't hand over until the next person reacts.");
  return lines.join("\n");
}

// ── UI HELPERS ───────────────────────────────────────────────────────
function Row({ label, color, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
      <div style={{ width: 112, flexShrink: 0, fontSize: 9, color, textAlign: "right", paddingRight: 10 }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 24, position: "relative", background: "#E8D9CC", borderRadius: 4 }}>
        {children}
      </div>
    </div>
  );
}

function Block({ left, width, bg, border, label, labelColor, dashed = false }) {
  return (
    <div style={{
      position: "absolute", left, width, height: "100%",
      background: bg, border: `1px ${dashed ? "dashed" : "solid"} ${border}`,
      borderRadius: 3, boxSizing: "border-box",
      display: "flex", alignItems: "center", paddingLeft: 5, overflow: "hidden",
    }}>
      {label && <span style={{ fontSize: 8, color: labelColor, whiteSpace: "nowrap", fontWeight: 600 }}>{label}</span>}
    </div>
  );
}

function Pill({ bg, border, color, children }) {
  return (
    <span style={{
      background: bg, border: `1px solid ${border}`, borderRadius: 20,
      padding: "3px 10px", fontSize: 9, color, whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────
export default function App() {
  const [mo, setMo] = useState(0);
  const [wk, setWk] = useState(0);
  const [dy, setDy] = useState(0);
  const [holidays, setHolidaysState] = useState(DEFAULT_HOLIDAYS);
  const [showHolidayPanel, setShowHolidayPanel] = useState(false);
  const [hForm, setHForm] = useState({ agent: "Danica", from: "", to: "" });

  // Load holidays from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("concierge-holidays");
      if (raw) {
        const stored = JSON.parse(raw);
        const merged = [...DEFAULT_HOLIDAYS];
        stored.forEach(s => {
          const exists = merged.some(d => d.agent === s.agent && d.from === s.from && d.to === s.to);
          if (!exists) merged.push(s);
        });
        setHolidaysState(merged);
      } else {
        setHolidaysState(DEFAULT_HOLIDAYS);
        localStorage.setItem("concierge-holidays", JSON.stringify(DEFAULT_HOLIDAYS));
      }
    } catch(e) {
      setHolidaysState(DEFAULT_HOLIDAYS);
    }
  }, []);

  // Save holidays to localStorage whenever they change
  function setHolidays(newHols) {
    setHolidaysState(newHols);
    try { localStorage.setItem("concierge-holidays", JSON.stringify(newHols)); } catch(e) {}
  }

  const month   = MONTHS[mo];
  const week    = month.weeks[wk];
  const day     = week.days[dy];
  const agents  = getAgents(day, holidays);
  const rows    = assignTasks(agents);
  const weekday = isWD(day.date);
  const warn    = agents.length < (weekday ? 1 : 2);
  const onHoliday = getOnHoliday(day, holidays);
  const slack   = buildSlack(day, agents, weekday, onHoliday);
  const hours   = Array.from({ length: SPAN + 1 }, (_, i) => S + i);

  return (
    <div style={{
      background: "#F5EDE4", minHeight: "100vh",
      fontFamily: "Georgia,'Times New Roman',serif",
      color: "#6B4C3B", padding: "24px 20px", boxSizing: "border-box",
    }}>

      {/* Title */}
      <div style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: 4, color: "#9B7E6E", textTransform: "uppercase", marginBottom: 4 }}>Cotta Concierge</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#2C1A0E", letterSpacing: -0.3 }}>Daily Scheduler — {month.label}</div>
        </div>
        <button onClick={() => setShowHolidayPanel(!showHolidayPanel)} style={{
          background: showHolidayPanel ? "#2C1A0E" : "#EDE0D4",
          color: showHolidayPanel ? "#F5EDE4" : "#6B4C3B",
          border: "1px solid #D4B8A8", borderRadius: 8,
          padding: "6px 14px", fontSize: 10, cursor: "pointer",
          fontFamily: "Georgia,'Times New Roman',serif",
        }}>
          🏖 Holidays {holidays.length > 0 ? `(${holidays.length})` : ""}
        </button>
      </div>

      {/* Holiday Panel */}
      {showHolidayPanel && (
        <div style={{
          background: "#EDE0D4", border: "1px solid #D4B8A8",
          borderRadius: 10, padding: 16, marginBottom: 20,
        }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "#9B7E6E", textTransform: "uppercase", marginBottom: 12 }}>
            Holiday Management
          </div>

          {/* Add holiday form */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16, alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 9, color: "#9B7E6E", marginBottom: 4 }}>Agent</div>
              <select value={hForm.agent} onChange={e => setHForm({...hForm, agent: e.target.value})} style={{
                background: "#F5EDE4", border: "1px solid #D4B8A8", borderRadius: 6,
                padding: "5px 10px", fontSize: 10, color: "#2C1A0E",
                fontFamily: "Georgia,'Times New Roman',serif",
              }}>
                {["Danica", "Angela", "Kylene", "Harvey", "Sophia", "Ross"].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <div style={{ fontSize: 9, color: "#9B7E6E", marginBottom: 4 }}>From</div>
              <input type="date" value={hForm.from} onChange={e => setHForm({...hForm, from: e.target.value})} style={{
                background: "#F5EDE4", border: "1px solid #D4B8A8", borderRadius: 6,
                padding: "5px 10px", fontSize: 10, color: "#2C1A0E",
                fontFamily: "Georgia,'Times New Roman',serif",
              }} />
            </div>
            <div>
              <div style={{ fontSize: 9, color: "#9B7E6E", marginBottom: 4 }}>To</div>
              <input type="date" value={hForm.to} onChange={e => setHForm({...hForm, to: e.target.value})} style={{
                background: "#F5EDE4", border: "1px solid #D4B8A8", borderRadius: 6,
                padding: "5px 10px", fontSize: 10, color: "#2C1A0E",
                fontFamily: "Georgia,'Times New Roman',serif",
              }} />
            </div>
            <button onClick={() => {
              if (!hForm.from || !hForm.to) return;
              // Check if this would breach minimum staffing on any day
              setHolidays([...holidays, { agent: hForm.agent, from: hForm.from, to: hForm.to }]);
              setHForm({ agent: "Danica", from: "", to: "" });
            }} style={{
              background: "#8B1C3C", color: "#F5EDE4",
              border: "none", borderRadius: 6, padding: "6px 16px",
              fontSize: 10, cursor: "pointer",
              fontFamily: "Georgia,'Times New Roman',serif",
            }}>
              Approve &amp; Add
            </button>
          </div>

          {/* Holiday list */}
          {holidays.length === 0 ? (
            <div style={{ fontSize: 10, color: "#9B7E6E" }}>No holidays logged.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {holidays.map((h, i) => {
                // Check if this holiday breaches min staffing on any affected day
                let breachDays = [];
                MONTHS.forEach(month => {
                  month.weeks.forEach(week => {
                    week.days.forEach(day => {
                      if (!isOnHoliday(h.agent, day.date, [h])) return;
                      const wd = isWD(day.date);
                      // Current staffing with this (already-approved) holiday applied
                      const remaining = getAgents(day, holidays);
                      const minReq = wd ? 1 : 2;
                      if (remaining.length < minReq) breachDays.push(day.date);
                      // Flag if both Ross and Sophia are off on same weekday
                      if (wd) {
                        const rossOff   = isOnHoliday("Ross",   day.date, holidays);
                        const sophiaOff = isOnHoliday("Sophia", day.date, holidays);
                        if (rossOff && sophiaOff && !breachDays.includes(day.date)) breachDays.push(day.date);
                      }
                    });
                  });
                });
                return (
                  <div key={i} style={{
                    background: breachDays.length > 0 ? "#F5D5DC" : "#F5EDE4",
                    border: `1px solid ${breachDays.length > 0 ? "#8B1C3C" : "#D4B8A8"}`,
                    borderRadius: 6, padding: "8px 12px",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <span style={{ fontWeight: 700, color: COLORS[h.agent], fontSize: 10 }}>{h.agent}</span>
                      <span style={{ fontSize: 10, color: "#6B4C3B", marginLeft: 8 }}>{h.from} → {h.to}</span>
                      {breachDays.length > 0 && (
                        <div style={{ fontSize: 9, color: "#8B1C3C", marginTop: 2 }}>
                          ⚠️ Breaches minimum staffing: {breachDays.slice(0,3).join(", ")}{breachDays.length > 3 ? "..." : ""}
                        </div>
                      )}
                    </div>
                    <button onClick={() => setHolidays(holidays.filter((_,j)=>j!==i))} style={{
                      background: "none", border: "1px solid #D4B8A8", borderRadius: 4,
                      padding: "2px 8px", fontSize: 9, cursor: "pointer", color: "#9B7E6E",
                      fontFamily: "Georgia,'Times New Roman',serif",
                    }}>Remove</button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Month tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
        {MONTHS.map((m, i) => (
          <button key={i} onClick={() => { setMo(i); setWk(0); setDy(0); }} style={{
            background: mo===i ? "#2C1A0E" : "#EDE0D4",
            color: mo===i ? "#F5EDE4" : "#9B7E6E",
            border: `1px solid ${mo===i ? "#2C1A0E" : "#D4B8A8"}`,
            borderRadius: 6, padding: "6px 16px", fontSize: 11,
            cursor: "pointer", fontFamily: "Georgia,'Times New Roman',serif",
            fontWeight: mo===i ? 700 : 400,
          }}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Week tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 10, flexWrap: "wrap" }}>
        {month.weeks.map((w, i) => (
          <button key={i} onClick={() => { setWk(i); setDy(0); }} style={{
            background: wk === i ? "#8B1C3C" : "#EDE0D4",
            color: wk === i ? "#F5EDE4" : "#9B7E6E",
            border: `1px solid ${wk === i ? "#8B1C3C" : "#D4B8A8"}`,
            borderRadius: 6, padding: "5px 12px", fontSize: 9,
            cursor: "pointer", fontFamily: "Georgia,'Times New Roman',serif", lineHeight: 1.6,
          }}>
            {w.label}<br /><span style={{ fontSize: 8, opacity: 0.7 }}>{w.dates}</span>
          </button>
        ))}
      </div>

      {/* Day tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, flexWrap: "wrap" }}>
        {week.days.map((d, i) => {
          const n = Object.keys(NAMES).filter(k => d[k]).length;
          const bad = n < (isWD(d.date) ? 1 : 2);
          return (
            <button key={i} onClick={() => setDy(i)} style={{
              background: dy === i ? "#2C1A0E" : "#EDE0D4",
              color: dy === i ? "#F5EDE4" : bad ? "#8B1C3C" : "#9B7E6E",
              border: `1px solid ${dy === i ? "#2C1A0E" : bad ? "#8B1C3C" : "#D4B8A8"}`,
              borderRadius: 6, padding: "5px 10px", fontSize: 9,
              cursor: "pointer", fontFamily: "Georgia,'Times New Roman',serif", lineHeight: 1.6,
            }}>
              {d.date.split(" ")[0]}<br />
              <span style={{ fontSize: 8 }}>{d.date.split(" ")[1]} · {n}</span>
            </button>
          );
        })}
      </div>

      {/* Rota not yet published notice */}
      {agents.length === 0 && (
        <div style={{
          background: "#EDE0D4", border: "1px solid #D4B8A8",
          borderRadius: 8, padding: "10px 14px", marginBottom: 16,
          fontSize: 11, color: "#9B7E6E", textAlign: "center",
        }}>
          Rota not yet published for this date.
        </div>
      )}

      {/* Warning */}
      {warn && agents.length > 0 && (
        <div style={{
          background: "#F5D5DC", border: "1px solid #8B1C3C",
          borderRadius: 8, padding: "10px 14px", marginBottom: 16,
          fontSize: 11, color: "#8B1C3C",
        }}>
          ⚠️ Below minimum staffing ({agents.length} agent{agents.length !== 1 ? "s" : ""} scheduled). Cover must be arranged before this shift.
        </div>
      )}

      {/* Day header */}
      <div style={{
        background: "#EDE0D4", border: "1px solid #D4B8A8",
        borderRadius: 10, padding: "12px 16px", marginBottom: 18,
        display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center",
      }}>
        <div style={{ flex: 1, minWidth: 100 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#2C1A0E" }}>{day.date}</div>
          <div style={{ fontSize: 9, color: "#9B7E6E", marginTop: 2 }}>
            {agents.length} PH agent{agents.length !== 1 ? "s" : ""} · {weekday ? "Weekday" : "Weekend"}
          </div>
        </div>
        {weekday && <>
          <Pill bg="#F5D5DC" border="#8B1C3C" color="#8B1C3C">Ross 09:00–17:00 oversight</Pill>
          <Pill bg="#EDE0D4" border="#9B7E6E" color="#6B4C3B">Sophia 09:00–17:00</Pill>
        </>}
        {agents.map(a => (
          <Pill key={a.name} bg={COLORS[a.name] + "15"} border={COLORS[a.name] + "60"} color={COLORS[a.name]}>
            {a.name} {fmt(a.start)}–{fmt(a.end)}
          </Pill>
        ))}
        {onHoliday.map(name => (
          <Pill key={name} bg="#F5EDE4" border="#D4B8A8" color="#9B7E6E">
            🏖 {name}
          </Pill>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 20 }}>

        {/* Hour axis — full and half hours */}
        <div style={{ display: "flex", paddingLeft: 112, marginBottom: 4, position: "relative" }}>
          {Array.from({ length: SPAN * 2 + 1 }, (_, i) => i / 2 + S).map(h => {
            const isHalf = h % 1 === 0.5;
            return (
              <div key={h} style={{ width: (100 / SPAN / 2) + "%", textAlign: "left" }}>
                {isHalf
                  ? <span style={{ fontSize: 8, fontWeight: 500, color: "#8B5C3A", letterSpacing: 0 }}>:30</span>
                  : <span style={{ fontSize: 9, color: "#9B7E6E" }}>{String(Math.floor(h)).padStart(2, "0")}</span>
                }
              </div>
            );
          })}
        </div>

        {/* UK rows */}
        {weekday && <>
          <Row label="Ross" color="#8B1C3C">
            {onHoliday.includes("Ross")
              ? <Block left={pct(S)} width={wpct(S,E)} bg="#F5D5DC" border="#D4A0A8" label="🏖 On holiday" labelColor="#8B1C3C" dashed />
              : <Block left={pct(9)} width={wpct(9,17)} bg="#F5D5DC" border="#8B1C3C" label="Oversight" labelColor="#8B1C3C" />
            }
          </Row>
          <Row label="Sophia" color="#6B4C3B">
            {onHoliday.includes("Sophia")
              ? <Block left={pct(S)} width={wpct(S,E)} bg="#F5D5DC" border="#D4A0A8" label="🏖 On holiday" labelColor="#8B1C3C" dashed />
              : <>
                  <Block left={pct(9)}  width={wpct(9,12)}  bg="#E8D9CC" border="#6B4C3B" label="All tasks"       labelColor="#6B4C3B" />
                  <Block left={pct(12)} width={wpct(12,17)} bg="#EDE0D4" border="#9B7E6E" label="Partner Queries" labelColor="#9B7E6E" />
                </>
            }
          </Row>
          <div style={{ borderTop: "1px solid #D4B8A8", margin: "8px 0", marginLeft: 112 }} />
        </>}

        {/* Task rows */}
        {rows.map(({ task, blocks }) => (
          <Row key={task} label={task} color={TCOLS[task]}>
            {weekday && !onHoliday.includes("Sophia") && (
              <Block left={pct(9)} width={wpct(9, 12)}
                bg={TCOLS[task] + "20"} border={TCOLS[task] + "55"}
                label="Sophia" labelColor="#6B4C3B" />
            )}
            {blocks.map((b, i) => {
              // Split width evenly when multiple agents share the exact same
              // time range on this task (happens when 4+ agents overlap)
              const concurrent = blocks.filter(x => x.start === b.start && x.end === b.end);
              const idx = concurrent.indexOf(b);
              const n = concurrent.length;
              const segStart = b.start + (b.end - b.start) * (idx / n);
              const segEnd   = b.start + (b.end - b.start) * ((idx + 1) / n);
              return (
                <Block key={i}
                  left={pct(segStart)} width={wpct(segStart, segEnd)}
                  bg={TCOLS[task] + "20"} border={TCOLS[task] + "55"}
                  label={b.name} labelColor={COLORS[b.name]} />
              );
            })}
          </Row>
        ))}

        <div style={{ borderTop: "1px solid #D4B8A8", margin: "8px 0", marginLeft: 112 }} />

        {/* PH holiday rows — show for any PH agent on holiday, shift or not */}
        {Object.values(NAMES)
          .filter(name => onHoliday.includes(name))
          .map(name => (
            <Row key={name+"-hol"} label={name} color={COLORS[name]}>
              <Block left={pct(S)} width={wpct(S,E)} bg="#F5D5DC" border="#D4A0A8"
                label="🏖 On holiday" labelColor="#8B1C3C" dashed />
            </Row>
          ))
        }

        {/* Agent shift rows with lunch */}
        {(() => {
          // Pick exactly one agent for EOD consolidation — latest finish, first alphabetically if tied
          const maxEnd = Math.max(...agents.map(x => x.end));
          const eodAgent = maxEnd >= 23
            ? agents.filter(x => x.end === maxEnd).sort((a,b) => a.name.localeCompare(b.name))[0]
            : null;
          return agents.map(a => (
            <Row key={a.name} label={a.name} color={COLORS[a.name]}>
              <Block left={pct(a.start)} width={wpct(a.start, a.end)}
                bg={COLORS[a.name] + "15"} border={COLORS[a.name] + "35"} />
              <Block left={pct(a.lunch[0])} width={wpct(a.lunch[0], a.lunch[1])}
                bg="#F5EDE4" border="#D4B8A8" label="lunch" labelColor="#9B7E6E" dashed />
              {eodAgent && eodAgent.name === a.name && (
                <Block left={pct(22)} width={wpct(22, 23)}
                  bg="#2C1A0E" border="#2C1A0E"
                  label="EOD consolidation" labelColor="#F5EDE4" />
              )}
            </Row>
          ));
        })()}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 14, marginBottom: 20, flexWrap: "wrap" }}>
        {TASKS.map(t => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: TCOLS[t] + "30", border: `1px solid ${TCOLS[t]}55` }} />
            <span style={{ fontSize: 9, color: "#9B7E6E" }}>{t}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, border: "1px dashed #D4B8A8" }} />
          <span style={{ fontSize: 9, color: "#9B7E6E" }}>Lunch</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#2C1A0E" }} />
          <span style={{ fontSize: 9, color: "#9B7E6E" }}>EOD Consolidation</span>
        </div>
      </div>

      {/* Slack brief */}
      <div style={{ background: "#EDE0D4", border: "1px solid #D4B8A8", borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: "#9B7E6E", textTransform: "uppercase", marginBottom: 10 }}>
          Slack Daily Brief
        </div>
        <textarea
          readOnly
          value={slack}
          onFocus={e => e.target.select()}
          style={{
            width: "100%", boxSizing: "border-box",
            background: "#F0E4D8", borderRadius: 8, padding: "12px 14px",
            fontSize: 11, color: "#2C1A0E", lineHeight: 1.9,
            border: "1px solid #D4B8A8",
            fontFamily: "Georgia,'Times New Roman',serif", resize: "none",
            minHeight: "180px", outline: "none", cursor: "text",
          }}
        />
        <div style={{ fontSize: 9, color: "#9B7E6E", marginTop: 6 }}>
          Click the box → Cmd+A → Cmd+C to copy, then paste into Slack
        </div>
      </div>

    </div>
  );
}
