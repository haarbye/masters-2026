// ============================================================
// The Masters 2026 — Tippekonkurranse Dashboard
// ============================================================

// --- Supabase config ---
const SUPABASE_URL = 'https://zobyzbzwcwlhtgetdtfi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvYnl6Ynp3Y3dsaHRnZXRkdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NDM1NTIsImV4cCI6MjA5MTMxOTU1Mn0.iKKx1ZWQeLtCT9pq9bzgn4qfWo4ZpuZWjB0KyEj6N2M';

const SB_HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=minimal',
};

// --- Colors for challengers (cycled by index) ---
const COLORS = [
  { bg: '#eff6ff', dot: '#2563eb', text: '#2563eb', name: 'blue' },
  { bg: '#f0fdf4', dot: '#16a34a', text: '#16a34a', name: 'green' },
  { bg: '#fff7ed', dot: '#ea580c', text: '#ea580c', name: 'orange' },
  { bg: '#faf5ff', dot: '#9333ea', text: '#9333ea', name: 'purple' },
  { bg: '#fef2f2', dot: '#dc2626', text: '#dc2626', name: 'red' },
  { bg: '#fdf4ff', dot: '#c026d3', text: '#c026d3', name: 'pink' },
  { bg: '#f0fdfa', dot: '#0d9488', text: '#0d9488', name: 'teal' },
  { bg: '#fffbeb', dot: '#d97706', text: '#d97706', name: 'amber' },
];

function getColor(idx) { return COLORS[idx % COLORS.length]; }

// --- Player database with countries and flags ---
const PLAYER_DB = {
  'patrick reed':        { name: 'Patrick Reed',       country: 'USA',       flag: '🇺🇸' },
  'jon rahm':            { name: 'Jon Rahm',           country: 'Spania',    flag: '🇪🇸' },
  'scottie scheffler':   { name: 'Scottie Scheffler',  country: 'USA',       flag: '🇺🇸' },
  'justin rose':         { name: 'Justin Rose',        country: 'England',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  'ludvig åberg':        { name: 'Ludvig Åberg',       country: 'Sverige',   flag: '🇸🇪' },
  'ludvig aberg':        { name: 'Ludvig Åberg',       country: 'Sverige',   flag: '🇸🇪' },
  'viktor hovland':      { name: 'Viktor Hovland',     country: 'Norge',     flag: '🇳🇴' },
  'robert macintyre':    { name: 'Robert MacIntyre',   country: 'Skottland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  'hideki matsuyama':    { name: 'Hideki Matsuyama',   country: 'Japan',     flag: '🇯🇵' },
  'matt fitzpatrick':    { name: 'Matt Fitzpatrick',   country: 'England',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  'matthew fitzpatrick': { name: 'Matt Fitzpatrick',   country: 'England',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  'chris gotterup':      { name: 'Chris Gotterup',     country: 'USA',       flag: '🇺🇸' },
  'christopher gotterup':{ name: 'Chris Gotterup',     country: 'USA',       flag: '🇺🇸' },
  'xander schauffele':   { name: 'Xander Schauffele',  country: 'USA',       flag: '🇺🇸' },
  'bryson dechambeau':   { name: 'Bryson DeChambeau',  country: 'USA',       flag: '🇺🇸' },
  'akshay bhatia':       { name: 'Akshay Bhatia',      country: 'USA',       flag: '🇺🇸' },
  'j.j. spaun':          { name: 'J.J. Spaun',         country: 'USA',       flag: '🇺🇸' },
  'jj spaun':            { name: 'J.J. Spaun',         country: 'USA',       flag: '🇺🇸' },
  'j. j. spaun':         { name: 'J.J. Spaun',         country: 'USA',       flag: '🇺🇸' },
  'rory mcilroy':        { name: 'Rory McIlroy',       country: 'Nord-Irland', flag: '🇮🇪' },
};

const FLAG_MAP = {
  'united states': '🇺🇸', 'usa': '🇺🇸',
  'england': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'northern ireland': '🇮🇪', 'ireland': '🇮🇪',
  'spain': '🇪🇸', 'sweden': '🇸🇪', 'norway': '🇳🇴',
  'japan': '🇯🇵', 'south korea': '🇰🇷', 'korea': '🇰🇷',
  'australia': '🇦🇺', 'canada': '🇨🇦', 'south africa': '🇿🇦',
  'germany': '🇩🇪', 'france': '🇫🇷', 'italy': '🇮🇹',
  'denmark': '🇩🇰', 'china': '🇨🇳', 'india': '🇮🇳',
  'argentina': '🇦🇷', 'colombia': '🇨🇴', 'chile': '🇨🇱',
  'mexico': '🇲🇽', 'thailand': '🇹🇭', 'taiwan': '🇹🇼',
  'belgium': '🇧🇪', 'netherlands': '🇳🇱', 'austria': '🇦🇹',
  'switzerland': '🇨🇭', 'new zealand': '🇳🇿', 'fiji': '🇫🇯',
  'philippines': '🇵🇭', 'zimbabwe': '🇿🇼', 'paraguay': '🇵🇾',
  'puerto rico': '🇵🇷', 'poland': '🇵🇱', 'czech republic': '🇨🇿',
  'finland': '🇫🇮',
};

// --- All challengers now come from Supabase (Håvard + Sebastian are seeded in DB) ---
const BUILTIN_NAMES = new Set(['havard', 'sebastian']); // protected from deletion

// --- Registration deadline ---
const REGISTRATION_DEADLINE = new Date('2026-04-10T18:00:00+02:00');
// Late registrants (registered on or after this date) skip round 1 points
const LATE_REG_CUTOFF = new Date('2026-04-10T00:00:00+02:00');

function isRegistrationOpen() {
  return Date.now() < REGISTRATION_DEADLINE.getTime();
}

// --- Supabase storage for challengers ---
const LS_KEY = 'masters2026_challengers';
let cachedExtras = null;
let cacheTime = 0;
const CACHE_TTL = 15000; // 15 second cache

async function loadExtraChallengers() {
  // Return memory cache if fresh
  if (cachedExtras && (Date.now() - cacheTime < CACHE_TTL)) {
    return cachedExtras;
  }

  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/challengers?select=name,picks,created_at&order=created_at.asc`,
      { headers: SB_HEADERS }
    );
    if (!resp.ok) throw new Error(`Supabase ${resp.status}`);
    const rows = await resp.json();
    const extras = rows
      .filter(r => r.name && Array.isArray(r.picks) && r.picks.length === 10)
      .map(r => ({ name: r.name, picks: r.picks, createdAt: r.created_at }));

    // Cache in memory and localStorage (offline fallback)
    cachedExtras = extras;
    cacheTime = Date.now();
    try { localStorage.setItem(LS_KEY, JSON.stringify(extras)); } catch {}

    return extras;
  } catch (err) {
    console.warn('Supabase fetch failed, using localStorage cache:', err.message);
    // Fallback to localStorage
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) return arr.filter(c => c.name && Array.isArray(c.picks));
      }
    } catch {}
    return cachedExtras || [];
  }
}

async function addChallenger(name, picks) {
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/challengers`, {
    method: 'POST',
    headers: SB_HEADERS,
    body: JSON.stringify({ name, picks }),
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${resp.status}`);
  }
  // Invalidate cache
  cachedExtras = null;
  cacheTime = 0;
}

async function removeChallenger(name) {
  // Only callable from admin panel — button only renders for admins
  if (!isAdmin()) throw new Error('Ikke tilgang');
  const resp = await fetch(
    `${SUPABASE_URL}/rest/v1/challengers?name=eq.${encodeURIComponent(name)}`,
    { method: 'DELETE', headers: SB_HEADERS }
  );
  if (!resp.ok) throw new Error(`Delete failed: ${resp.status}`);
  cachedExtras = null;
  cacheTime = 0;
}

async function getAllChallengers() {
  return await loadExtraChallengers();
}

// --- Scoring ---
// Top-10 points per round: flat values, no multiplier
const TOP10_PTS_PER_ROUND = { 1: 2, 2: 3, 3: 4, 4: 4 };
const ROUND_NAMES = { 1: 'Torsdag', 2: 'Fredag', 3: 'Lørdag', 4: 'Søndag' };
// Earliest tee times in Norwegian time (CEST, UTC+2). Augusta is EDT (UTC-4), so +6h.
const ROUND_START_TIMES = { 1: '13:40', 2: '13:40', 3: '16:00', 4: '16:00' };
const ROUND_PTS_LABELS = { 1: '2p', 2: '3p', 3: '4p', 4: 'Full' };

// --- State ---
let leaderboardData = [];
let currentRound = 1;
let tournamentStatus = 'pre';
let espnPlayerNames = [];
let lastChallengers = []; // cached for sync access in click handlers
let teeTimeData = {}; // { athleteId: { teeTime: 'ISO', startHole: 1 } }
let lastEventId = '';
let lastCompId = '';

// --- HTML escaping (XSS protection) ---
function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// Safe escaping for data-attributes (preserves original value in dataset)
function escAttr(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
}

// --- Name matching ---
function normalizeName(name) {
  return name.toLowerCase().replace(/[''\.]/g, '').replace(/\s+/g, ' ').trim();
}

function findPlayerOnLeaderboard(pickName, leaderboard) {
  const pickNorm = normalizeName(pickName);
  const pickParts = pickNorm.split(' ');
  const pickLast = pickParts[pickParts.length - 1];
  const pickFirst = pickParts[0];

  for (const entry of leaderboard) {
    const entryNorm = normalizeName(entry.name);
    if (entryNorm === pickNorm) return entry;
  }
  for (const entry of leaderboard) {
    const entryNorm = normalizeName(entry.name);
    const entryParts = entryNorm.split(' ');
    const entryLast = entryParts[entryParts.length - 1];
    const entryFirst = entryParts[0];
    if (entryLast === pickLast && entryFirst[0] === pickFirst[0]) return entry;
  }
  for (const entry of leaderboard) {
    const entryNorm = normalizeName(entry.name);
    const entryParts = entryNorm.split(' ');
    const entryLast = entryParts[entryParts.length - 1];
    if (entryLast === pickLast) return entry;
    if (pickLast.length >= 4 && entryLast.length >= 4 &&
        (entryLast.startsWith(pickLast.slice(0, 5)) || pickLast.startsWith(entryLast.slice(0, 5)))) {
      return entry;
    }
  }
  return null;
}

function getPlayerInfo(name) {
  const norm = normalizeName(name);
  if (PLAYER_DB[norm]) return PLAYER_DB[norm];
  const parts = norm.split(' ');
  const last = parts[parts.length - 1];
  for (const key in PLAYER_DB) {
    if (key.endsWith(last)) return PLAYER_DB[key];
  }
  // Try to find in leaderboard data for flag
  const lbMatch = findPlayerOnLeaderboard(name, leaderboardData);
  if (lbMatch) {
    return { name: lbMatch.name, country: lbMatch.countryAlt || '', flag: getFlagEmoji(lbMatch.countryAlt) };
  }
  return { name, country: '', flag: '🏳️' };
}

function getFlagEmoji(countryAlt) {
  if (!countryAlt) return '🏳️';
  const key = countryAlt.toLowerCase();
  return FLAG_MAP[key] || '🏳️';
}

// --- Calculate points ---
//
// R1–R3 (torsdag–lørdag):
//   Topp 10: R1=2p, R2=3p, R3=4p
//   Eksakt plassering bonus: R1=+1p, R2=+2p, R3=+4p  (totalt: 3/5/8)
//   CUT: -2p (kun i R2, når cutten skjer)
//
// R4 (søndag) — full pott:
//   Eksakt riktig plass:  #1=35p  #2=15p  #3=10p  #4–10=4p
//   Valgt vinner, endte på pall: 10p
//   Valgt pall, endte i topp 10: 5p
//   I topp 10, feil plass: 5p
//   DQ: -2p
//   Alle 3 pallplasser riktige: +25 bonus

const CUT_PENALTY = -2;
const EXACT_POS_BONUS = { 1: 1, 2: 2, 3: 4, 4: 4 }; // bonus for exact top-10 position per round

// Calculate leaderboard positions after a specific round (not live/current)
function getPositionsAfterRound(leaderboard, roundNum) {
  // Build cumulative score through roundNum for each player
  const scored = leaderboard
    .filter(p => !p.isCut || roundNum < 3) // include cut players for R1/R2
    .map(p => {
      let cumulativeScore = 0;
      let hasAllRounds = true;
      for (let r = 1; r <= roundNum; r++) {
        const roundScore = p.rounds?.[r];
        if (roundScore === undefined || roundScore === '-' || roundScore === null) {
          hasAllRounds = false;
          break;
        }
        cumulativeScore += parseInt(roundScore, 10) || 0;
      }
      return { name: p.name, score: cumulativeScore, hasAllRounds, isCut: p.isCut, isDQ: p.isDQ };
    })
    .filter(p => p.hasAllRounds)
    .sort((a, b) => a.score - b.score);

  // Assign positions with ties
  const positions = {};
  let i = 0;
  while (i < scored.length) {
    let j = i + 1;
    while (j < scored.length && scored[j].score === scored[i].score) j++;
    for (let k = i; k < j; k++) {
      positions[scored[k].name] = i + 1; // 1-based position
    }
    i = j;
  }
  return positions;
}

function calcRoundPoints(picks, leaderboard, roundNum, useRoundPositions) {
  const isSunday = roundNum === 4;
  const top10pts = TOP10_PTS_PER_ROUND[roundNum] || 1;
  let total = 0;
  let hits = 0;
  let cuts = 0;
  const details = [];

  // For completed rounds, use positions calculated from that round's cumulative scores
  const roundPositions = useRoundPositions ? getPositionsAfterRound(leaderboard, roundNum) : null;

  // Projected cut for R2 — apply penalty to players below projected cut line
  const projCut = (roundNum === 2 && !useRoundPositions) ? getProjectedCutScore(leaderboard) : null;
  const projCutPar = projCut !== null ? parseScoreToPar(projCut) : null;

  for (let i = 0; i < picks.length; i++) {
    const match = findPlayerOnLeaderboard(picks[i], leaderboard);
    let pos = null;
    let pts = 0;
    let score = null;
    let thru = null;
    let isCut = false;
    let belowProjCut = false;
    const pickSlot = i + 1;

    if (match && typeof match.position === 'number') {
      // Use round-specific position for completed rounds, live position for current round
      pos = roundPositions ? (roundPositions[match.name] || 999) : match.position;
      score = match.totalScore;
      thru = match.thru;

      isCut = match.isCut || false;
      const isDQ = match.isDQ || false;

      // Projected cut risk (R2 live)
      const playerParChk = projCutPar !== null ? parseScoreToPar(match.totalScore) : null;
      belowProjCut = projCutPar !== null && playerParChk !== null && playerParChk > projCutPar && !isCut;

      if (isSunday && isDQ) {
        // Søndag: DQ gir straff
        pts = CUT_PENALTY;
        cuts++;
      } else if (!isSunday && isCut && roundNum === 2) {
        // CUT-straff kun i R2 (når cutten skjer). R3+: cuttede spillere gir bare 0.
        pts = CUT_PENALTY;
        cuts++;
      } else if (!isSunday && belowProjCut && roundNum === 2) {
        // R2 live: projected -2 (same as showing live +pts for top 10)
        pts = CUT_PENALTY;
        cuts++;
      } else if (pos <= 10) {
        hits++;
        if (isSunday) {
          // === SØNDAG (R4) — FULL POTT ===
          // Base top 10 = 5p for alle i top 10
          // Eksakt #1=35, #2=15, #3=10 (erstatter base)
          // Eksakt #4-10 = 5p base + 4p bonus = 9p
          // Valgt vinner endte pall = 10p, Valgt pall endte top10 = 5p
          if (pickSlot === pos) {
            // Eksakt plassering
            if (pos === 1) pts = 35;
            else if (pos === 2) pts = 15;
            else if (pos === 3) pts = 10;
            else pts = 9; // eksakt #4-10: 5p base + 4p bonus
          } else {
            if (pickSlot === 1 && pos >= 2 && pos <= 3) pts = 10; // valgt vinner, endte pall
            else pts = 5; // i topp 10 (base)
          }
        } else {
          // === R1–R3: Flat top-10 points + exact position bonus ===
          pts = top10pts;
          if (pickSlot === pos && pos <= 10) {
            pts += EXACT_POS_BONUS[roundNum] || 0;
          }
        }
      } else if (isSunday) {
        // Sunday but outside top 10 — no points (not cut either)
        pts = 0;
      }
    }

    const cutRisk = belowProjCut;

    details.push({ pickRank: pickSlot, name: picks[i], leaderboardPos: pos, score, thru, roundPts: pts, isCut, isDQ: match?.isDQ || false, cutRisk });
    total += pts;
  }

  // === SØNDAGS-BONUS: Alle 3 pallplasser riktige ===
  if (isSunday) {
    let podiumCorrect = 0;
    for (let i = 0; i < Math.min(3, picks.length); i++) {
      const match = findPlayerOnLeaderboard(picks[i], leaderboard);
      if (match && match.position === (i + 1)) podiumCorrect++;
    }
    if (podiumCorrect === 3) total += 25;
  }

  return { total, hits, cuts, details };
}

// --- Parse ESPN data ---
function parseESPNData(data) {
  const result = [];
  let round = 1;
  let status = 'pre';

  try {
    const events = data.events || [];
    const event = events.find(e => e.name && e.name.toLowerCase().includes('masters')) || events[0];
    if (!event) return { leaderboard: result, round, status };

    const competition = event.competitions?.[0];
    if (!competition) return { leaderboard: result, round, status };

    // Store IDs for tee time fetching
    lastEventId = event.id || '';
    lastCompId = competition.id || lastEventId;

    const stateStr = competition.status?.type?.state || 'pre';
    if (stateStr === 'in') status = 'in_progress';
    else if (stateStr === 'post') status = 'complete';
    else status = 'pre';

    round = competition.status?.period || 1;
    const competitors = competition.competitors || [];

    for (const c of competitors) {
      const athlete = c.athlete || {};
      const name = athlete.displayName || athlete.fullName || 'Unknown';
      const pos = c.order || 999;
      const totalScore = c.score || 'E';
      const rounds = {};
      const holeData = {}; // { roundNum: [ {hole, strokes, toPar} ] }
      let thru = '-';

      if (c.linescores && c.linescores.length > 0) {
        for (let i = 0; i < c.linescores.length; i++) {
          const ls = c.linescores[i];
          rounds[i + 1] = ls.displayValue !== undefined ? ls.displayValue : '-';
          // Store hole-by-hole data
          if (ls.linescores && ls.linescores.length > 0) {
            holeData[i + 1] = ls.linescores.map(h => ({
              hole: h.period,
              strokes: h.value,
              toPar: h.scoreType?.displayValue || 'E',
            }));
          }
        }
        const currentRoundLs = c.linescores[c.linescores.length - 1];
        if (currentRoundLs && currentRoundLs.linescores && currentRoundLs.linescores.length > 0) {
          const holes = currentRoundLs.linescores.length;
          thru = holes >= 18 ? 'F' : String(holes);
        } else if (currentRoundLs && currentRoundLs.displayValue && currentRoundLs.displayValue !== '-') {
          thru = 'F';
        }
      }

      // Detect CUT and DQ
      const scoreStr = String(totalScore).toUpperCase();
      const thruStr = String(thru).toUpperCase();
      const statusDesc = (c.status?.type?.description || '').toUpperCase();

      let isCut = scoreStr === 'CUT' || thruStr === 'CUT' || scoreStr.includes('CUT') || statusDesc.includes('CUT');
      let isDQ = scoreStr === 'DQ' || thruStr === 'DQ' || scoreStr.includes('DQ') || statusDesc.includes('DQ')
              || scoreStr === 'WD' || scoreStr.includes('WD') || statusDesc.includes('WITHDRAW');

      // Fallback CUT: round >= 3 AND some players already have R3 data (so cut has happened)
      if (!isCut && !isDQ && round >= 3 && c.linescores) {
        const completedRounds = c.linescores.filter(ls => ls.displayValue !== undefined && ls.displayValue !== '-').length;
        // Only mark as cut if this player has exactly 2 rounds AND other players have 3+
        // (prevents false positives on Saturday morning before R3 tee times)
        const maxRoundsInField = competitors.reduce((max, p) => {
          const pr = (p.linescores || []).filter(ls => ls.displayValue !== undefined && ls.displayValue !== '-').length;
          return Math.max(max, pr);
        }, 0);
        if (completedRounds === 2 && maxRoundsInField >= 3) isCut = true;
      }

      const athleteId = c.id || '';
      const headshotUrl = athleteId ? `https://a.espncdn.com/combiner/i?img=/i/headshots/golf/players/full/${athleteId}.png&w=130&h=96&cb=1` : '';

      result.push({
        name, position: pos, posDisplay: String(pos), totalScore,
        rounds, thru, holeData, isCut, isDQ, athleteId, headshotUrl,
        countryAlt: athlete.flag?.alt || '', countryFlagUrl: athlete.flag?.href || '',
      });
    }

    result.sort((a, b) => a.position - b.position);

    // Handle ties
    let i = 0;
    while (i < result.length) {
      let j = i + 1;
      while (j < result.length && result[j].totalScore === result[i].totalScore) j++;
      const displayPos = (j - i > 1) ? `T${i + 1}` : String(i + 1);
      for (let k = i; k < j; k++) {
        result[k].posDisplay = displayPos;
        result[k].position = i + 1;
      }
      i = j;
    }
  } catch (err) { console.error('Parse error:', err); }

  return { leaderboard: result, round, status };
}

// --- Tee time fetching ---
let teeTimeCacheExpiry = 0;

async function fetchTeeTimes() {
  if (!lastEventId || Date.now() < teeTimeCacheExpiry) return;
  try {
    const ids = leaderboardData.map(e => e.athleteId).filter(Boolean);
    if (ids.length === 0) return;
    const BATCH = 25;
    const newData = {};
    for (let i = 0; i < ids.length; i += BATCH) {
      const batch = ids.slice(i, i + BATCH);
      const results = await Promise.allSettled(batch.map(async id => {
        const r = await fetch(`https://sports.core.api.espn.com/v2/sports/golf/leagues/pga/events/${lastEventId}/competitions/${lastCompId}/competitors/${id}/status`);
        if (!r.ok) return null;
        const d = await r.json();
        return { id, teeTime: d.teeTime || null, startHole: d.startHole || 1 };
      }));
      for (const r of results) {
        if (r.status === 'fulfilled' && r.value && r.value.teeTime) {
          newData[r.value.id] = { teeTime: r.value.teeTime, startHole: r.value.startHole };
        }
      }
    }
    teeTimeData = newData;
    teeTimeCacheExpiry = Date.now() + 5 * 60 * 1000; // 5 min cache
  } catch (err) { console.error('Tee time fetch error:', err); }
}

function formatTeeTime(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  return d.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Oslo' });
}

// --- Projected cut line (top 50 + ties at Masters) ---
function getProjectedCutScore(leaderboard) {
  const active = leaderboard.filter(e => !e.isCut && !e.isDQ);
  if (active.length < 50) return null;
  const sorted = [...active].sort((a, b) => a.position - b.position);
  const cutPlayer = sorted[49]; // 50th player
  if (!cutPlayer) return null;
  return cutPlayer.totalScore;
}

// ============================================================
// DISMISSABLE NEWS + RANKING CHANGE TRACKING
// ============================================================

// News dismiss
function dismissNews() {
  const banner = document.getElementById('newsBanner');
  if (!banner) return;
  const newsId = banner.dataset.newsId || 'default';
  localStorage.setItem('dismissed_' + newsId, '1');
  banner.style.display = 'none';
}

(function checkNewsDismissed() {
  const banner = document.getElementById('newsBanner');
  if (!banner) return;
  const newsId = banner.dataset.newsId || 'default';
  if (localStorage.getItem('dismissed_' + newsId)) {
    banner.style.display = 'none';
  }
})();

// Ranking position change tracking
const RANK_HISTORY_KEY = 'masters2026_last_rankings';

function getLastRankings() {
  try { return JSON.parse(localStorage.getItem(RANK_HISTORY_KEY)) || {}; } catch { return {}; }
}

function saveRankings(ranked) {
  const data = {};
  ranked.forEach((r, idx) => { data[r.name] = idx + 1; });
  localStorage.setItem(RANK_HISTORY_KEY, JSON.stringify(data));
}

function getRankChange(name, currentPos, lastRankings) {
  if (!lastRankings || Object.keys(lastRankings).length === 0) return '';
  const prev = lastRankings[name];
  if (prev === undefined) return '<span class="rank-change new-entry">NY</span>';
  const diff = prev - currentPos; // positive = moved up
  if (diff > 0) return `<span class="rank-change up">▲${diff}</span>`;
  if (diff < 0) return `<span class="rank-change down">▼${Math.abs(diff)}</span>`;
  return '';
}

// ============================================================
// RENDER FUNCTIONS
// ============================================================

function renderRanking(challengers, results, resultsByRound, currentRound) {
  const container = document.getElementById('rankingTable');
  const RNAMES = { 1: 'R1', 2: 'R2', 3: 'R3', 4: 'R4' };

  // Sunday exact match + podium badges (minimal — just badges, not verbose text)
  const showSundayProj = currentRound >= 3 && leaderboardData.length > 0 && !(currentRound >= 4 && tournamentStatus === 'complete');
  const sundayProjections = {};
  if (showSundayProj) {
    challengers.forEach((c, i) => {
      const r4 = calcRoundPoints(c.picks, leaderboardData, 4, false);
      const exact = r4.details.filter(d => d.leaderboardPos !== null && d.pickRank === d.leaderboardPos && d.leaderboardPos <= 10).length;
      let podiumCorrect = 0;
      for (let pi = 0; pi < Math.min(3, c.picks.length); pi++) {
        const match = findPlayerOnLeaderboard(c.picks[pi], leaderboardData);
        if (match && match.position === (pi + 1)) podiumCorrect++;
      }
      sundayProjections[c.name] = { exact, podiumBonus: podiumCorrect === 3 ? 25 : 0 };
    });
  }

  // Sort by total points descending
  const ranked = challengers.map((c, i) => ({
    name: c.name,
    color: getColor(i),
    total: results[i].total,
    hits: results[i].hits,
    exactMatches: results[i].details.filter(d => d.leaderboardPos !== null && d.pickRank === d.leaderboardPos && d.leaderboardPos <= 10).length,
    roundPts: Object.keys(resultsByRound || {}).map(r => ({ round: +r, pts: (resultsByRound[r] || [])[i] || 0 })),
    sundayProj: sundayProjections[c.name] || null,
  })).sort((a, b) => b.total - a.total);

  const maxPts = Math.max(...ranked.map(r => r.total), 1);
  const lastRankings = getLastRankings();

  let html = '';
  ranked.forEach((r, idx) => {
    const medal = `${idx + 1}.`;
    const barWidth = Math.round((r.total / maxPts) * 100);
    const lead = idx === 0 ? '' : ` (${r.total - ranked[0].total})`;
    const changeHtml = getRankChange(r.name, idx + 1, lastRankings);

    const rowClass = idx === 0 ? 'rank-gold' : idx === 1 ? 'rank-silver' : idx === 2 ? 'rank-bronze' : '';

    html += `
      <div class="rank-row ${rowClass}" data-goto-card="${escAttr(r.name)}" style="cursor:pointer" title="Vis ${esc(r.name)} sine picks">
        <div class="rank-pos">${medal}</div>
        <div class="rank-main">
          <div class="rank-name">
            <span class="rank-dot" style="background:${r.color.dot}"></span>
            ${esc(r.name)}${changeHtml}
          </div>
          <div class="rank-bar-wrap">
            <div class="rank-bar" style="width:${barWidth}%;background:${r.color.dot}"></div>
          </div>
        </div>
        <div class="rank-stats">
          <span class="rank-hits">${r.hits} i top 10</span>
          ${r.exactMatches > 0 ? `<span class="rank-exact">${r.exactMatches} eksakt</span>` : ''}
          ${r.roundPts.length > 0 ? `<span class="rank-rounds">${r.roundPts.map(rp => `${RNAMES[rp.round]}: ${rp.pts >= 0 ? '+' : ''}${rp.pts}`).join(' · ')}</span>` : ''}
          ${r.sundayProj && r.sundayProj.exact > 0 ? `<span class="rank-sunday-proj">${r.sundayProj.exact} eksakt</span>` : ''}
          ${r.sundayProj && r.sundayProj.podiumBonus ? `<span class="rank-sunday-proj rsp-podium">+25 pall-bonus!</span>` : ''}
        </div>
        <div class="rank-pts" style="color:${r.color.text}">${r.total}<span class="rank-pts-label"> pts</span>${lead ? `<span class="rank-diff">${lead}</span>` : ''}</div>
      </div>`;
  });

  container.innerHTML = html;

  // Wire up click-to-scroll from ranking rows to pick cards
  container.querySelectorAll('.rank-row[data-goto-card]').forEach(row => {
    row.addEventListener('click', () => {
      const name = row.dataset.gotoCard;
      // Ensure picks section is expanded
      const picksSection = document.querySelector('.collapsible-section[data-section="picks"]');
      if (picksSection) {
        const body = picksSection.querySelector('.collapsible-body');
        if (body && body.style.display === 'none') {
          toggleSection('picks');
        }
      }
      // Find the matching pick card and expand + scroll to it
      const cards = document.querySelectorAll('.pick-card-header[data-name]');
      for (const header of cards) {
        if (header.dataset.name === name) {
          // Expand if collapsed
          if (collapsedCards.has(name)) {
            collapsedCards.delete(name);
            const card = header.closest('.pick-card');
            const body = card.querySelector('.pick-body');
            const toggle = header.querySelector('.pick-toggle');
            body.style.display = '';
            toggle.textContent = '▲';
          }
          // Scroll into view
          const card = header.closest('.pick-card');
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Highlight briefly
          card.style.boxShadow = '0 0 0 3px #d4af37';
          setTimeout(() => { card.style.boxShadow = ''; }, 2000);
          break;
        }
      }
    });
  });

  // Save current positions (delayed so user sees changes first)
  setTimeout(() => saveRankings(ranked), 5000);
}

// ============================================================
// SCORE HISTORY + CHART
// ============================================================

const SCORE_HISTORY_KEY = 'masters2026_score_history';
let scoreHistory = []; // [{time, scores: {name: pts, ...}}]

function loadScoreHistory() {
  try {
    const raw = localStorage.getItem(SCORE_HISTORY_KEY);
    if (raw) scoreHistory = JSON.parse(raw);
  } catch { scoreHistory = []; }
}

function saveScoreHistory() {
  try {
    // Keep max 5000 entries (enough for entire tournament at 1/hour + changes)
    if (scoreHistory.length > 5000) scoreHistory = scoreHistory.slice(-5000);
    localStorage.setItem(SCORE_HISTORY_KEY, JSON.stringify(scoreHistory));
  } catch {}
}

function recordScoreSnapshot(challengers, results) {
  const now = Date.now();
  const scores = {};
  challengers.forEach((c, i) => { scores[c.name] = results[i].total; });

  const last = scoreHistory[scoreHistory.length - 1];

  // Mark round-end: if tournament status is 'complete' and we haven't already marked this round
  const isRoundEnd = tournamentStatus === 'complete' && currentRound >= 1 && currentRound <= 4;
  const alreadyMarked = isRoundEnd && scoreHistory.some(s => s.roundEnd === currentRound);

  if (last) {
    const scoresChanged = JSON.stringify(last.scores) !== JSON.stringify(scores);
    const timeDiff = now - last.time;
    // Record if: scores changed, 60+ min passed, or we need to mark a round-end
    if (!scoresChanged && timeDiff < 3600000 && !(!alreadyMarked && isRoundEnd)) return;
  }

  const entry = { time: now, scores };
  if (isRoundEnd && !alreadyMarked) entry.roundEnd = currentRound;
  scoreHistory.push(entry);
  saveScoreHistory();
}

function renderScoreChart() {
  const canvas = document.getElementById('scoreChart');
  const legendEl = document.getElementById('chartLegend');
  if (!canvas || scoreHistory.length < 2) {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
      ctx.fillStyle = '#5a6b5a';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Grafen vises etter hvert som poeng oppdateres...', canvas.offsetWidth / 2, canvas.offsetHeight / 2);
    }
    return;
  }

  const W = canvas.offsetWidth;
  const H = canvas.offsetHeight;
  canvas.width = W * 2;
  canvas.height = H * 2;
  const ctx = canvas.getContext('2d');
  ctx.scale(2, 2);

  const PAD = { top: 28, right: 110, bottom: 36, left: 40 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  // Get all challenger names from history
  const names = [...new Set(scoreHistory.flatMap(s => Object.keys(s.scores)))];
  const allTimes = scoreHistory.map(s => s.time);
  const minTime = allTimes[0];
  const maxTime = allTimes[allTimes.length - 1];
  const timeRange = Math.max(maxTime - minTime, 1);

  // Find score range — always start Y-axis at 0
  let minScore = 0, maxScore = 1;
  for (const s of scoreHistory) {
    for (const v of Object.values(s.scores)) {
      if (v > maxScore) maxScore = v;
    }
  }
  if (maxScore === 0) maxScore = 1;
  const scoreRange = maxScore - minScore || 1;
  const scorePadTop = scoreRange * 0.1; // padding above max only

  function tx(time) { return PAD.left + ((time - minTime) / timeRange) * plotW; }
  function ty(score) { return PAD.top + plotH - ((score - minScore) / (scoreRange + scorePadTop)) * plotH; }

  // Clear
  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.strokeStyle = '#e8dece';
  ctx.lineWidth = 0.5;
  const gridSteps = 5;
  for (let i = 0; i <= gridSteps; i++) {
    const y = PAD.top + (plotH / gridSteps) * i;
    ctx.beginPath(); ctx.moveTo(PAD.left, y); ctx.lineTo(W - PAD.right, y); ctx.stroke();
    // Score label
    const scoreVal = Math.round(maxScore + scorePadTop - ((scoreRange + scorePadTop) / gridSteps) * i);
    ctx.fillStyle = '#5a6b5a';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(scoreVal + 'p', PAD.left - 6, y + 3);
  }

  // Time labels — show hourly ticks only
  ctx.textAlign = 'center';
  ctx.fillStyle = '#5a6b5a';
  ctx.font = '10px Inter, sans-serif';
  const DAY_ABBR = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];
  // Generate hourly timestamps within the time range
  const firstHour = new Date(minTime);
  firstHour.setMinutes(0, 0, 0);
  if (firstHour.getTime() < minTime) firstHour.setHours(firstHour.getHours() + 1);
  const hourLabels = [];
  for (let t = firstHour.getTime(); t <= maxTime; t += 3600000) {
    hourLabels.push(t);
  }
  // Always show first and last data points if no hourly ticks
  if (hourLabels.length === 0 && scoreHistory.length >= 2) {
    hourLabels.push(minTime, maxTime);
  }
  const MIN_LABEL_GAP = 70;
  let lastLabelX = -Infinity;
  for (const t of hourLabels) {
    const x = tx(t);
    if (x < PAD.left || x > W - PAD.right) continue;
    if (x - lastLabelX < MIN_LABEL_GAP) continue;
    const date = new Date(t);
    const dayName = DAY_ABBR[date.getDay()];
    const hh = String(date.getHours()).padStart(2, '0');
    const label = `${dayName} ${hh}:00`;
    ctx.fillText(label, x, H - PAD.bottom + 14);
    lastLabelX = x;
  }

  // Draw round-end markers (vertical dashed lines)
  const ROUND_END_NAMES = { 1: 'Torsdag ferdig', 2: 'Fredag ferdig', 3: 'Lørdag ferdig', 4: 'Søndag ferdig' };
  for (const s of scoreHistory) {
    if (s.roundEnd) {
      const x = tx(s.time);
      ctx.save();
      ctx.strokeStyle = '#2d5a27';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(x, PAD.top);
      ctx.lineTo(x, PAD.top + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      // Label above the line
      ctx.fillStyle = '#2d5a27';
      ctx.font = 'bold 10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ROUND_END_NAMES[s.roundEnd] || `R${s.roundEnd}`, x, PAD.top - 14);
      ctx.restore();
    }
  }

  // Draw event markers (e.g. scoring adjustments)
  for (const s of scoreHistory) {
    if (s.event) {
      const x = tx(s.time);
      ctx.save();
      ctx.strokeStyle = '#dc2626';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(x, PAD.top);
      ctx.lineTo(x, PAD.top + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 9px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(s.event, x, PAD.top - 4);
      ctx.restore();
    }
  }

  // Draw lines per challenger (smooth bezier curves)
  const endpoints = []; // collect for label de-overlap
  names.forEach((name, ni) => {
    const ci = lastChallengers.findIndex(c => c.name === name);
    const color = getColor(ci >= 0 ? ci : ni);
    const points = [];

    for (const s of scoreHistory) {
      if (s.scores[name] !== undefined) {
        points.push({ x: tx(s.time), y: ty(s.scores[name]) });
      }
    }

    if (points.length < 2) return;

    ctx.strokeStyle = color.dot;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    // Smooth bezier curve
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      ctx.bezierCurveTo(cpx, prev.y, cpx, curr.y, curr.x, curr.y);
    }

    ctx.stroke();

    // Draw endpoint dot
    const last = points[points.length - 1];
    ctx.fillStyle = color.dot;
    ctx.beginPath();
    ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
    ctx.fill();

    endpoints.push({ name, x: last.x, y: last.y, color: color.dot });
  });

  // Draw labels with de-overlap (spread vertically if too close)
  endpoints.sort((a, b) => a.y - b.y);
  const LABEL_H = 13;
  for (let i = 1; i < endpoints.length; i++) {
    if (endpoints[i].y - endpoints[i - 1].y < LABEL_H) {
      endpoints[i].y = endpoints[i - 1].y + LABEL_H;
    }
  }
  for (const ep of endpoints) {
    ctx.fillStyle = ep.color;
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(ep.name, ep.x + 10, ep.y + 4);
  }

  // Legend
  if (legendEl) {
    legendEl.innerHTML = names.map(name => {
      const ci = lastChallengers.findIndex(c => c.name === name);
      const color = getColor(ci >= 0 ? ci : 0);
      return `<span class="chart-legend-item"><span class="chart-legend-dot" style="background:${color.dot}"></span>${esc(name)}</span>`;
    }).join('');
  }
}

loadScoreHistory();

// Inject scoring adjustment event marker if not already present
(function injectScoringEvent() {
  const eventTime = new Date('2026-04-10T09:20:00+02:00').getTime();
  // Remove old marker if exists at wrong time, then re-insert
  scoreHistory = scoreHistory.filter(s => s.event !== 'Poengjustering');
  if (true) {
    // Insert at the right chronological position
    const idx = scoreHistory.findIndex(s => s.time >= eventTime);
    const entry = { time: eventTime, scores: {}, event: 'Poengjustering' };
    if (idx === -1) {
      scoreHistory.push(entry);
    } else {
      scoreHistory.splice(idx, 0, entry);
    }
    saveScoreHistory();
  }
})();

function renderRoundBreakdown(challengers, resultsByRound, activeRound) {
  const container = document.getElementById('roundBreakdown');
  if (!container) return; // Section removed from HTML
  let html = '';

  for (let r = 1; r <= 4; r++) {
    const isActive = r === activeRound;
    const multLabel = ROUND_PTS_LABELS[r];

    let scoresHtml = '';
    challengers.forEach((c, i) => {
      const color = getColor(i);
      const pts = resultsByRound[r]?.[i] || 0;
      scoresHtml += `
        <div class="rs">
          <div class="dot" style="background:${color.dot}"></div>
          <div class="pts" style="color:${color.text}">${pts}</div>
        </div>`;
    });

    html += `
      <div class="round-card ${isActive ? 'active-round' : ''}">
        <div class="round-label">${ROUND_NAMES[r]}</div>
        <div class="round-scores">${scoresHtml}</div>
        <div class="mult">${multLabel}</div>
      </div>`;
  }

  container.innerHTML = html;
}

// ============================================================
// DAILY POINTS BREAKDOWN — oversiktlig visning per runde
// ============================================================
function renderDailyBreakdown(challengers, resultsByRound, currentRound) {
  const container = document.getElementById('dailyBreakdown');
  if (!container) return;

  const LATE_REG_SET = new Set();
  challengers.forEach(c => {
    if (c.createdAt && new Date(c.createdAt) >= LATE_REG_CUTOFF) LATE_REG_SET.add(c.name);
  });

  let html = '<div class="daily-breakdown-grid">';

  for (let r = 1; r <= 4; r++) {
    const isFuture = r > currentRound;
    const isLive = r === currentRound && tournamentStatus !== 'complete';
    const roundLabel = ROUND_NAMES[r] + (isLive ? ' (live)' : '');
    const ptsLabel = r < 4 ? `Top 10 = ${TOP10_PTS_PER_ROUND[r]}p` : 'Full scoring';

    // Build player scores for this round
    const roundScores = challengers.map((c, i) => {
      const pts = resultsByRound[r]?.[i] || 0;
      const isLate = LATE_REG_SET.has(c.name);
      const skipped = r === 1 && isLate;

      // Get detailed breakdown for this round
      let hits = 0, cuts = 0, exact = 0;
      if (!isFuture && !skipped) {
        const isCompletedRound = r < currentRound;
        const res = calcRoundPoints(c.picks, leaderboardData, r, isCompletedRound);
        hits = res.hits;
        cuts = res.cuts;
        exact = res.details.filter(d => d.leaderboardPos !== null && d.pickRank === d.leaderboardPos && d.leaderboardPos <= 10).length;
      }

      return {
        name: c.name,
        color: getColor(i),
        pts: skipped ? 0 : pts,
        skipped,
        hits,
        cuts,
        exact,
      };
    });

    // Sort by points descending
    const sorted = [...roundScores].sort((a, b) => b.pts - a.pts);

    let rowsHtml = '';
    // For Sunday (R4) before it starts: show projected points based on current standings
    const isProjectedSunday = isFuture && r === 4 && leaderboardData.length > 0;

    if (isFuture && !isProjectedSunday) {
      rowsHtml = '<div class="daily-player-row"><div class="dp-name" style="color:#9ca3af;text-align:center;width:100%">Ikke startet</div></div>';
    } else if (isProjectedSunday) {
      // Calculate projected Sunday points using current leaderboard positions
      const projScores = challengers.map((c, i) => {
        const res = calcRoundPoints(c.picks, leaderboardData, 4, false);
        const exact = res.details.filter(d => d.leaderboardPos !== null && d.pickRank === d.leaderboardPos && d.leaderboardPos <= 10).length;
        // Check podium bonus
        let podiumBonus = 0;
        let podiumCorrect = 0;
        for (let pi = 0; pi < Math.min(3, c.picks.length); pi++) {
          const match = findPlayerOnLeaderboard(c.picks[pi], leaderboardData);
          if (match && match.position === (pi + 1)) podiumCorrect++;
        }
        if (podiumCorrect === 3) podiumBonus = 25;

        return {
          name: c.name,
          color: getColor(i),
          pts: res.total + podiumBonus,
          hits: res.hits,
          exact,
          podiumBonus,
        };
      });

      const projSorted = [...projScores].sort((a, b) => b.pts - a.pts);
      projSorted.forEach((s, idx) => {
        const ptsClass = s.pts > 0 ? 'positive' : s.pts < 0 ? 'negative' : 'zero';
        const ptsStr = s.pts > 0 ? '+' + s.pts : s.pts === 0 ? '0' : String(s.pts);
        const isLeader = idx === 0 && s.pts > 0;
        const parts = [];
        if (s.hits > 0) parts.push(s.hits + ' i top 10');
        if (s.exact > 0) parts.push(s.exact + ' eksakt');
        if (s.podiumBonus > 0) parts.push('+25 podium!');
        const detail = parts.join(', ');

        rowsHtml += `
          <div class="daily-player-row ${isLeader ? 'dp-leader' : ''}">
            <div class="dp-rank">${idx + 1}.</div>
            <div class="dp-dot" style="background:${s.color.dot}"></div>
            <div class="dp-name" style="color:${s.color.text}">${esc(s.name)}</div>
            <div class="dp-detail">${detail}</div>
            <div class="dp-pts ${ptsClass}">${ptsStr}</div>
          </div>`;
      });
    } else {
      sorted.forEach((s, idx) => {
        const ptsClass = s.pts > 0 ? 'positive' : s.pts < 0 ? 'negative' : 'zero';
        const ptsStr = s.pts > 0 ? '+' + s.pts : s.pts === 0 ? '0' : String(s.pts);
        const isLeader = idx === 0 && s.pts > 0;
        let detail = '';
        if (s.skipped) {
          detail = 'Hoppet over';
        } else if (s.hits > 0 || s.cuts > 0) {
          const parts = [];
          if (s.hits > 0) parts.push(s.hits + ' treff');
          if (s.exact > 0) parts.push(s.exact + ' eksakt');
          if (s.cuts > 0) parts.push(s.cuts + ' cut');
          detail = parts.join(', ');
        }

        rowsHtml += `
          <div class="daily-player-row ${isLeader ? 'dp-leader' : ''}">
            <div class="dp-rank">${idx + 1}.</div>
            <div class="dp-dot" style="background:${s.color.dot}"></div>
            <div class="dp-name" style="color:${s.color.text}">${esc(s.name)}</div>
            <div class="dp-detail">${detail}</div>
            <div class="dp-pts ${ptsClass}">${ptsStr}</div>
          </div>`;
      });
    }

    const cardClass = (isFuture && !isProjectedSunday) ? 'future' : '';
    const headerLabel = isProjectedSunday ? 'Søndag (projeksjon)' : roundLabel;
    const headerPtsLabel = isProjectedSunday ? 'Basert på nåværende pos.' : ptsLabel;

    html += `
      <div class="daily-card ${cardClass} ${isProjectedSunday ? 'projected' : ''}">
        <div class="daily-card-header ${isProjectedSunday ? 'projected-header' : ''}">
          <span>${headerLabel}</span>
          <span class="daily-pts-label">${headerPtsLabel}</span>
        </div>
        ${rowsHtml}
      </div>`;
  }

  html += '</div>';
  container.innerHTML = html;
}

// ============================================================
// WINNER CELEBRATION — shown after R4 is complete
// ============================================================
function renderWinnerCelebration(challengers, results, resultsByRound) {
  let container = document.getElementById('winnerCelebration');
  if (!container) {
    container = document.createElement('div');
    container.id = 'winnerCelebration';
    const newsEl = document.getElementById('newsBanner');
    const quoteEl = document.querySelector('.leader-quote');
    const insertBefore = newsEl || quoteEl;
    if (insertBefore) {
      insertBefore.parentNode.insertBefore(container, insertBefore);
    } else {
      document.querySelector('.container')?.prepend(container);
    }
  }

  // Sort challengers by total
  const ranked = challengers.map((c, i) => ({
    name: c.name,
    color: getColor(i),
    total: results[i].total,
    hits: results[i].hits,
    roundPts: Object.keys(resultsByRound || {}).map(r => (resultsByRound[+r] || [])[i] || 0),
  })).sort((a, b) => b.total - a.total);

  const winner = ranked[0];
  const second = ranked[1];
  const third = ranked[2];

  // Check for tie
  const isTied = winner.total === second.total;

  // Also find the Masters Tournament winner from leaderboard
  const mastersWinner = leaderboardData.find(p => p.position === 1);
  const mastersWinnerName = mastersWinner ? mastersWinner.name : '';
  const mastersWinnerInfo = mastersWinnerName ? getPlayerInfo(mastersWinnerName) : null;

  // Winner quotes — personlig melding basert på vinner
  const WINNER_QUOTES = {
    'Guttorm': 'Dere trodde jeg skrøt for mye. Nå vet dere hvorfor. Takk for kampen — ses neste år, da forsvarer jeg tittelen.',
    'Sebastian': 'Systemet funka, picksa satt, og til slutt stod jeg igjen som konge. Kunne ikke vært mer fortjent.',
    'Ola': 'Rolig og strategisk hele veien — det er slik man vinner en Masters-tipping. GG alle sammen!',
    'Havard': 'Ingen trodde på meg, men her står jeg med pokalen. Patrick Reed hadde vært stolt.',
    'Svartberg': 'Svartberg på topp — akkurat som det skulle være. Gratulerer til alle, men spesielt til meg selv.',
    'Klaus': 'Fleetwood-strategien leverte. Takk til alle som tipset mot meg — motivasjonen var uvurderlig.',
    'August': 'Ung, sulten, og nå Masters-mester. Dette er bare begynnelsen.',
    'Fredagstaco': 'Rory-gambiten betalte seg. Taco-fredag i all evighet!',
  };
  const winnerQuote = WINNER_QUOTES[winner.name] || 'Takk for kampen, gratulerer til alle som deltok!';

  container.innerHTML = `
    <div class="winner-card">
      <div class="winner-header">
        <div class="winner-trophy">🏆</div>
        <h2 class="winner-title">${isTied ? 'Delt seier!' : 'Vi har en vinner!'}</h2>
      </div>
      <div class="winner-podium">
        <div class="podium-spot podium-2">
          <div class="podium-medal">🥈</div>
          <div class="podium-name" style="color:${second.color.text}">${esc(second.name)}</div>
          <div class="podium-pts">${second.total} pts</div>
        </div>
        <div class="podium-spot podium-1">
          <div class="podium-medal">🥇</div>
          <div class="podium-name" style="color:${winner.color.text}">${esc(winner.name)}</div>
          <div class="podium-pts">${winner.total} pts</div>
          <div class="podium-crown">👑</div>
        </div>
        <div class="podium-spot podium-3">
          <div class="podium-medal">🥉</div>
          <div class="podium-name" style="color:${third.color.text}">${esc(third.name)}</div>
          <div class="podium-pts">${third.total} pts</div>
        </div>
      </div>
      ${mastersWinnerInfo ? `
      <div class="winner-masters">
        <span class="winner-masters-flag">${mastersWinnerInfo.flag}</span>
        <span>Masters 2026-vinner: <strong>${esc(mastersWinnerInfo.name)}</strong></span>
      </div>` : ''}
      <div class="winner-quote">
        <div class="winner-quote-label">Fra vinneren:</div>
        <div class="winner-quote-text">"${esc(winnerQuote)}"</div>
        <div class="winner-quote-author">— ${esc(winner.name)}</div>
      </div>
      <div class="winner-standings">
        ${ranked.map((r, i) => `
          <div class="winner-row ${i === 0 ? 'winner-row-first' : ''}">
            <span class="winner-row-pos">${i + 1}.</span>
            <span class="winner-row-dot" style="background:${r.color.dot}"></span>
            <span class="winner-row-name">${esc(r.name)}</span>
            <span class="winner-row-rounds">${r.roundPts.map((p, ri) => `R${ri+1}: ${p >= 0 ? '+' : ''}${p}`).join(' · ')}</span>
            <span class="winner-row-total" style="color:${r.color.text}">${r.total} pts</span>
          </div>`).join('')}
      </div>
    </div>`;
}

// Track which cards are COLLAPSED (persists across re-renders)
// All cards are open by default — user clicks to collapse
const collapsedCards = new Set();

function renderPickCards(challengers, results) {
  const container = document.getElementById('pickColumns');

  // All cards open by default (collapsedCards tracks which are closed)

  // Sort by total points descending, keeping original index for color
  const indexed = challengers.map((c, i) => ({ challenger: c, result: results[i], origIdx: i }));
  indexed.sort((a, b) => b.result.total - a.result.total);

  let html = '';

  indexed.forEach(({ challenger: c, result: res, origIdx }) => {
    const color = getColor(origIdx);
    let pickPtsSum = 0;
    const totalPts = res.total; // includes all bonuses — matches ranking
    const isExpanded = !collapsedCards.has(c.name);

    // Build summary stats for collapsed header
    let hitsInTop10 = 0;
    let exactMatches = 0;
    let bestPos = null;

    let rowsHtml = '';
    for (const d of res.details) {
      const info = getPlayerInfo(d.name);
      const pos = d.leaderboardPos;
      pickPtsSum += d.roundPts;

      if (pos !== null && pos <= 10) {
        hitsInTop10++;
        if (pos === d.pickRank) exactMatches++;
        if (bestPos === null || pos < bestPos) bestPos = pos;
      }

      let posClass = 'outside', posText = '—', rowClass = '';
      if (d.isCut) {
        posClass = 'cut';
        posText = 'CUT';
        rowClass = 'is-cut';
      } else if (d.isDQ) {
        posClass = 'cut';
        posText = 'DQ';
        rowClass = 'is-cut';
      } else if (pos !== null && pos !== undefined) {
        posText = `#${pos}`;
        if (pos === 1)      { posClass = 'top1'; rowClass = 'is-leader'; }
        else if (pos <= 3)  { posClass = 'top3'; rowClass = 'in-top3'; }
        else if (pos <= 5)  { posClass = 'top5'; rowClass = 'in-top10'; }
        else if (pos <= 10) { posClass = 'top10'; rowClass = 'in-top10'; }
      }

      // Cut risk warning (not deducted, just visual)
      if (d.cutRisk) {
        rowClass = 'cut-risk';
        posClass = 'cut-risk-pos';
      }

      const scoreText = d.score || '';
      const thruText = d.thru && d.thru !== '-' ? `Thru ${d.thru}` : '';
      const ptsClass = d.roundPts > 0 ? 'has-pts' : 'no-pts';
      const cutWarning = d.cutRisk ? '<span class="cut-risk-badge">✂</span>' : '';

      rowsHtml += `
        <div class="pick-row ${rowClass}" data-goto-player="${escAttr(d.name)}" style="cursor:pointer" title="Vis på leaderboard">
          <div class="pick-rank">${d.pickRank}</div>
          <div class="pick-player">
            <span class="flag">${info.flag}</span>
            <div class="info">
              <span class="player-name">${esc(info.name)} ${cutWarning}</span>
              <span class="country-name">${esc(info.country)}${scoreText ? ' · ' + esc(scoreText) : ''}${thruText ? ' · ' + thruText : ''}</span>
            </div>
          </div>
          <div class="pick-pos ${posClass}">${posText}</div>
          <div class="pick-pts ${ptsClass} ${d.cutRisk ? 'cut-risk-pts' : ''}">${d.roundPts > 0 ? '+' + d.roundPts : d.roundPts < 0 ? d.roundPts : '0'}</div>
        </div>`;
    }

    const summaryText = `${hitsInTop10} i top 10${exactMatches ? ` · ${exactMatches} eksakt` : ''}${bestPos ? ` · beste #${bestPos}` : ''}`;

    // Sunday projection box removed — pick rows already show live R4 points

    html += `
      <div class="pick-card ${isExpanded ? 'expanded' : 'collapsed'}">
        <div class="pick-card-header" data-name="${escAttr(c.name)}" style="cursor:pointer">
          <div class="user-badge">
            <span class="user-dot" style="background:${color.dot}"></span>
            <h2>${esc(c.name)}</h2>
          </div>
          <div class="pick-header-right">
            <span class="pick-summary">${summaryText}</span>
            <span class="round-pts" style="color:${color.text}">${totalPts > 0 ? '+' + totalPts + ' pts' : '0 pts'}</span>
            <span class="pick-toggle">${isExpanded ? '▲' : '▼'}</span>
          </div>
        </div>
        <div class="pick-body" style="${isExpanded ? '' : 'display:none'}">
          ${rowsHtml}
        </div>
      </div>`;
  });

  container.innerHTML = html;

  // Wire up toggle clicks
  container.querySelectorAll('.pick-card-header[data-name]').forEach(header => {
    header.addEventListener('click', () => {
      const name = header.dataset.name;
      if (collapsedCards.has(name)) {
        collapsedCards.delete(name);
      } else {
        collapsedCards.add(name);
      }
      const card = header.closest('.pick-card');
      const body = card.querySelector('.pick-body');
      const toggle = header.querySelector('.pick-toggle');
      const isNowExpanded = !collapsedCards.has(name);
      body.style.display = isNowExpanded ? '' : 'none';
      toggle.textContent = isNowExpanded ? '▲' : '▼';
      card.classList.toggle('expanded', isNowExpanded);
      card.classList.toggle('collapsed', !isNowExpanded);
    });
  });

  // Wire up player row clicks → scroll to leaderboard and highlight
  container.querySelectorAll('.pick-row[data-goto-player]').forEach(row => {
    row.addEventListener('click', (e) => {
      e.stopPropagation();
      const playerName = row.dataset.gotoPlayer;
      const lbRow = document.querySelector(`.lb-row[data-player="${CSS.escape(playerName)}"]`);
      if (!lbRow) return;

      // Scroll to leaderboard row
      lbRow.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Highlight effect
      lbRow.style.transition = 'background 0.3s';
      lbRow.style.background = 'rgba(200, 169, 81, 0.3)';
      setTimeout(() => {
        lbRow.style.background = '';
        // Also expand the scorecard if it's not already open
        lbRow.click();
      }, 800);
    });
  });
}

// ============================================================
// TOURNAMENT STATS
// ============================================================

function renderTournamentStats(leaderboard, challengers, results) {
  const container = document.getElementById('tournamentStats');
  if (!container || leaderboard.length === 0) return;

  // Collect all stats
  let totalBirdies = 0, totalEagles = 0, totalBogeys = 0, totalDblBogeys = 0;
  let totalPars = 0, totalHoles = 0;
  const holeStats = {};
  let lowestRound = { score: 999, player: '' };
  let mostBirdiesPlayer = { count: 0, player: '' };
  const scoreDistribution = {};

  for (const entry of leaderboard) {
    // Score distribution
    const s = entry.totalScore;
    scoreDistribution[s] = (scoreDistribution[s] || 0) + 1;

    if (!entry.holeData) continue;
    let playerBirdies = 0;

    for (const rNum of Object.keys(entry.holeData)) {
      const holes = entry.holeData[rNum];
      let roundStrokes = 0;

      for (const h of holes) {
        totalHoles++;
        let n = 0;
        if (h.toPar !== 'E') { try { n = parseInt(h.toPar); } catch {} }

        if (n <= -2) { totalEagles++; playerBirdies += 2; }
        else if (n === -1) { totalBirdies++; playerBirdies++; }
        else if (n === 0) { totalPars++; }
        else if (n === 1) { totalBogeys++; }
        else if (n >= 2) { totalDblBogeys++; }

        roundStrokes += h.strokes;

        if (!holeStats[h.hole]) holeStats[h.hole] = { total: 0, count: 0, birdies: 0, bogeys: 0, eagles: 0 };
        holeStats[h.hole].total += n;
        holeStats[h.hole].count++;
        if (n < 0) holeStats[h.hole].birdies++;
        if (n <= -2) holeStats[h.hole].eagles++;
        if (n > 0) holeStats[h.hole].bogeys++;
      }

      if (holes.length === 18 && roundStrokes < lowestRound.score) {
        lowestRound = { score: roundStrokes, player: entry.name };
      }
    }

    if (playerBirdies > mostBirdiesPlayer.count) {
      mostBirdiesPlayer = { count: playerBirdies, player: entry.name };
    }
  }

  // Tipping stats
  const totalPicks = challengers.length * 10;
  let picksInTop10 = 0, picksExact = 0;
  for (const res of results) {
    for (const d of res.details) {
      if (d.leaderboardPos !== null && d.leaderboardPos <= 10) picksInTop10++;
      if (d.leaderboardPos !== null && d.leaderboardPos === d.pickRank && d.leaderboardPos <= 10) picksExact++;
    }
  }

  // === BUILD HOLE DIFFICULTY CHART (diverging: hard up, easy down) ===
  let holeBarsHtml = '';
  const maxAvg = Math.max(...Object.values(holeStats).map(s => s.count >= 3 ? Math.abs(s.total / s.count) : 0), 0.3);
  const MAX_BAR_H = 60; // px

  for (let h = 1; h <= 18; h++) {
    const s = holeStats[h];
    if (!s || s.count < 3) {
      holeBarsHtml += `<div class="hbar-col"><div class="hbar-top"></div><div class="hbar-mid"></div><div class="hbar-bottom"></div><div class="hbar-info"><div class="hbar-label">${h}</div><div class="hbar-par">${AUGUSTA_PAR[h-1]}</div></div></div>`;
      continue;
    }
    const avg = s.total / s.count;
    const barH = Math.max(Math.round(Math.abs(avg) / maxAvg * MAX_BAR_H), 3);
    const isHard = avg > 0;
    const color = isHard ? '#dc2626' : '#16a34a';
    const valColor = isHard ? '#dc2626' : '#16a34a';
    const tooltip = `Hull ${h} (par ${AUGUSTA_PAR[h-1]}): ${avg > 0 ? '+' : ''}${avg.toFixed(2)} vs par\n${s.birdies} birdies, ${s.bogeys} bogeys`;

    const upBar = isHard ? `<div class="hbar-bar up" style="height:${barH}px;background:${color}"></div><div class="hbar-val" style="color:${valColor}">${avg > 0 ? '+' : ''}${avg.toFixed(1)}</div>` : '';
    const downBar = !isHard ? `<div class="hbar-val" style="color:${valColor}">${avg.toFixed(1)}</div><div class="hbar-bar down" style="height:${barH}px;background:${color}"></div>` : '';

    holeBarsHtml += `
      <div class="hbar-col" title="${tooltip}">
        <div class="hbar-top">${upBar}</div>
        <div class="hbar-mid"></div>
        <div class="hbar-bottom">${downBar}</div>
        <div class="hbar-info"><div class="hbar-label">${h}</div><div class="hbar-par">${AUGUSTA_PAR[h-1]}</div></div>
      </div>`;
  }

  // === SCORE TYPE DONUT (birdies/pars/bogeys) ===
  const total = totalEagles + totalBirdies + totalPars + totalBogeys + totalDblBogeys;
  const segments = [
    { label: 'Eagle', count: totalEagles, color: '#d97706' },
    { label: 'Birdie', count: totalBirdies, color: '#16a34a' },
    { label: 'Par', count: totalPars, color: '#6b7280' },
    { label: 'Bogey', count: totalBogeys, color: '#2563eb' },
    { label: 'Dbl+', count: totalDblBogeys, color: '#1e3a5f' },
  ];
  let donutSegments = '';
  let cumPct = 0;
  for (const seg of segments) {
    if (seg.count === 0) continue;
    const pct = seg.count / total * 100;
    donutSegments += `<circle cx="50" cy="50" r="40" fill="none" stroke="${seg.color}" stroke-width="16"
      stroke-dasharray="${pct * 2.51} ${251 - pct * 2.51}"
      stroke-dashoffset="${-cumPct * 2.51}" />`;
    cumPct += pct;
  }

  let donutLegend = segments.filter(s => s.count > 0).map(s =>
    `<span class="donut-legend-item"><span class="donut-dot" style="background:${s.color}"></span>${s.label} ${s.count}</span>`
  ).join('');

  // === SCORE DISTRIBUTION CHART ===
  const sortedScores = Object.entries(scoreDistribution)
    .map(([score, count]) => ({ score, count, num: parseScoreToPar(score) }))
    .sort((a, b) => a.num - b.num);
  const maxCount = Math.max(...sortedScores.map(s => s.count), 1);

  const MAX_BAR_PX = 120;
  let distBarsHtml = sortedScores.map(s => {
    const barH = Math.max(Math.round(s.count / maxCount * MAX_BAR_PX), 4);
    const color = s.num < 0 ? '#dc2626' : s.num === 0 ? '#6b7280' : '#2563eb';
    return `
      <div class="dist-col" title="${s.score}: ${s.count} spillere">
        <div class="dist-count">${s.count}</div>
        <div class="dist-bar" style="height:${barH}px;background:${color}"></div>
        <div class="dist-label">${s.score}</div>
      </div>`;
  }).join('');

  // === KEY NUMBERS ROW ===
  const leader = leaderboard[0];
  const keyNumbers = `
    <div class="key-numbers">
      <div class="key-num">
        <span class="key-val">${leader ? esc(leader.name) : '-'}</span>
        <span class="key-label">Leder (${leader?.totalScore || '-'})</span>
      </div>
      ${lowestRound.score < 999 ? `<div class="key-num">
        <span class="key-val">${lowestRound.score}</span>
        <span class="key-label">Laveste runde — ${esc(lowestRound.player)}</span>
      </div>` : ''}
      ${mostBirdiesPlayer.count > 0 ? `<div class="key-num">
        <span class="key-val">${mostBirdiesPlayer.count} birdies</span>
        <span class="key-label">${esc(mostBirdiesPlayer.player)}</span>
      </div>` : ''}
      <div class="key-num">
        <span class="key-val">${picksInTop10}/${totalPicks}</span>
        <span class="key-label">Tips i topp 10</span>
      </div>
      <div class="key-num">
        <span class="key-val">${picksExact}</span>
        <span class="key-label">Eksakte treff</span>
      </div>
    </div>`;

  container.innerHTML = `
    ${keyNumbers}
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Hull-vanskelighetsgrad (vs. par)</div>
        <div class="hbar-chart">${holeBarsHtml}</div>
      </div>
      <div class="chart-card chart-small">
        <div class="chart-title">Score-typer</div>
        <div class="donut-wrap">
          <svg viewBox="0 0 100 100" class="donut-svg">${donutSegments}</svg>
          <div class="donut-center">${totalHoles}<br><small>hull</small></div>
        </div>
        <div class="donut-legend">${donutLegend}</div>
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-title">Score-fordeling i feltet</div>
      <div class="dist-chart">${distBarsHtml}</div>
    </div>`;
}

// Augusta National par values
const AUGUSTA_PAR = [4,5,4,3,4,3,4,5,4, 4,4,3,5,4,5,3,4,4]; // holes 1-18
const AUGUSTA_OUT = AUGUSTA_PAR.slice(0,9).reduce((a,b)=>a+b,0); // 36
const AUGUSTA_IN = AUGUSTA_PAR.slice(9).reduce((a,b)=>a+b,0); // 36
const AUGUSTA_TOTAL = AUGUSTA_OUT + AUGUSTA_IN; // 72

// Leaderboard sort state
let lbSortField = 'position'; // position, name, total, r1, r2, r3, r4
let lbSortDir = 'asc';
const expandedPlayers = new Set();
let lbShowAll = false;

function renderLeaderboard(leaderboard, challengers) {
  const container = document.getElementById('leaderboard');
  // Show enough players to include those below projected cut line
  const defaultCount = Math.min(leaderboard.length, 60);
  let shown = lbShowAll ? leaderboard : leaderboard.slice(0, defaultCount);

  if (shown.length === 0) {
    container.innerHTML = `<div class="loading"><div class="spinner"></div>Turneringen har ikke startet ennå...</div>`;
    return;
  }

  // Sort
  shown = [...shown].sort((a, b) => {
    let va, vb;
    if (lbSortField === 'name') {
      va = a.name; vb = b.name;
      return lbSortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    } else if (lbSortField === 'position') {
      va = a.position; vb = b.position;
    } else if (lbSortField === 'total') {
      va = parseScoreToPar(a.totalScore); vb = parseScoreToPar(b.totalScore);
    } else if (lbSortField.startsWith('r')) {
      const r = parseInt(lbSortField.slice(1));
      va = parseScoreToPar(a.rounds[r] || '999'); vb = parseScoreToPar(b.rounds[r] || '999');
    } else {
      va = a.position; vb = b.position;
    }
    return lbSortDir === 'asc' ? va - vb : vb - va;
  });

  // Projected cut line
  const projectedCut = currentRound <= 2 ? getProjectedCutScore(leaderboard) : null;

  let html = '';
  let cutLineInserted = false;

  for (const entry of shown) {
    const info = getPlayerInfo(entry.name);
    const flagEmoji = info.flag !== '🏳️' ? info.flag : getFlagEmoji(entry.countryAlt);
    const isExpanded = expandedPlayers.has(entry.name);

    let dots = '';
    let anyPicked = false;
    challengers.forEach((c, i) => {
      const picked = c.picks.some(p => findPlayerOnLeaderboard(p, [entry]));
      if (picked) {
        dots += `<span class="mini-dot" style="background:${getColor(i).dot}" title="${esc(c.name)}"></span>`;
        anyPicked = true;
      }
    });

    const highlight = anyPicked && entry.position <= 10 ? 'highlighted' : '';

    let scoreClass = 'even-par';
    const s = String(entry.totalScore);
    if (s.startsWith('-') || s.startsWith('−')) scoreClass = 'under-par';
    else if (s.startsWith('+')) scoreClass = 'over-par';

    // Insert projected cut line before first player below the cut
    if (!cutLineInserted && projectedCut !== null && !entry.isCut && !entry.isDQ && lbSortField === 'position') {
      const cutPar = parseScoreToPar(projectedCut);
      const entryPar = parseScoreToPar(entry.totalScore);
      if (entryPar > cutPar) {
        html += `<div class="lb-cut-line"><span>✂ Projected cut: ${projectedCut}</span></div>`;
        cutLineInserted = true;
      }
    }

    // Build scorecard HTML
    let scorecardHtml = '';
    if (isExpanded && entry.holeData) {
      scorecardHtml = buildScorecardHtml(entry);
    }

    const isLive = entry.thru && entry.thru !== '-' && entry.thru !== 'F' && entry.thru !== '';

    // Tee time for players not yet started
    const tt = teeTimeData[entry.athleteId];
    const teeTimeStr = (!isLive && entry.thru === '-' && tt) ? formatTeeTime(tt.teeTime) : '';

    // Status badge: LIVE or tee time
    let statusBadge = '';
    if (isLive) {
      statusBadge = `<span class="lb-live-inline"><span class="lb-live-badge"></span> LIVE</span>`;
    } else if (teeTimeStr) {
      statusBadge = `<span class="lb-tee-time">⛳ ${teeTimeStr}</span>`;
    }

    // Mobile status badge (separate cell)
    let mobileStatus = '';
    if (isLive) {
      mobileStatus = `<span class="lb-live-inline"><span class="lb-live-badge"></span> LIVE</span>`;
    } else if (teeTimeStr) {
      mobileStatus = `<span class="lb-tee-time">⛳ ${teeTimeStr}</span>`;
    } else if (entry.thru && entry.thru !== '-') {
      mobileStatus = `<span style="font-size:10px;color:var(--text-muted);font-weight:600">${entry.thru}</span>`;
    }

    html += `
      <div class="lb-entry ${highlight}">
        <div class="lb-row" data-player="${escAttr(entry.name)}" style="cursor:pointer">
          <div class="lb-pos">${entry.posDisplay}</div>
          <div class="lb-player">
            ${entry.headshotUrl ? `<img class="lb-headshot" src="${entry.headshotUrl}" alt="" loading="lazy" onerror="this.style.display='none'"/>` : ''}
            <span class="flag">${flagEmoji}</span>
            <span class="name">${esc(entry.name)}</span>
            <span class="picked-by">${dots}</span>
            ${statusBadge}
          </div>
          <div class="lb-status-mobile" style="display:none">${mobileStatus}</div>
          <div class="lb-round text-center">${entry.rounds[1] || '-'}</div>
          <div class="lb-round text-center">${entry.rounds[2] || '-'}</div>
          <div class="lb-round text-center">${entry.rounds[3] || '-'}</div>
          <div class="lb-round text-center">${entry.rounds[4] || '-'}</div>
          <div class="lb-total ${scoreClass} text-center">${entry.totalScore}${entry.thru && entry.thru !== '-' && entry.thru !== 'F' ? `<span class="lb-thru-inline">${entry.thru}</span>` : ''}</div>
          <div class="lb-thru text-center">${entry.thru}</div>
        </div>
        ${isExpanded ? `<div class="lb-scorecard">${scorecardHtml}</div>` : ''}
      </div>`;
  }

  // Show all / show less button
  if (!lbShowAll && leaderboard.length > defaultCount) {
    html += `<div style="text-align:center;padding:12px"><button id="lbShowAllBtn" style="background:var(--masters-green);color:white;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">Vis alle ${leaderboard.length} spillere</button></div>`;
  } else if (lbShowAll && leaderboard.length > defaultCount) {
    html += `<div style="text-align:center;padding:12px"><button id="lbShowLessBtn" style="background:var(--text-muted);color:white;border:none;padding:8px 20px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">Vis topp ${defaultCount}</button></div>`;
  }

  container.innerHTML = html;

  // Wire up show all/less
  document.getElementById('lbShowAllBtn')?.addEventListener('click', () => {
    lbShowAll = true;
    renderLeaderboard(leaderboardData, lastChallengers);
  });
  document.getElementById('lbShowLessBtn')?.addEventListener('click', () => {
    lbShowAll = false;
    renderLeaderboard(leaderboardData, lastChallengers);
  });

  // Wire up row clicks
  container.querySelectorAll('.lb-row[data-player]').forEach(row => {
    row.addEventListener('click', () => {
      const name = row.dataset.player;
      if (expandedPlayers.has(name)) {
        expandedPlayers.delete(name);
      } else {
        expandedPlayers.add(name);
      }
      renderLeaderboard(leaderboardData, lastChallengers);
    });
  });

  // Wire up sort header clicks
  document.querySelectorAll('.lb-sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const field = btn.dataset.sort;
      if (lbSortField === field) {
        lbSortDir = lbSortDir === 'asc' ? 'desc' : 'asc';
      } else {
        lbSortField = field;
        lbSortDir = 'asc';
      }
      // Update active state on headers
      document.querySelectorAll('.lb-sort-btn').forEach(b => b.classList.remove('sort-active'));
      btn.classList.add('sort-active');
      renderLeaderboard(leaderboardData, lastChallengers);
    });
  });
}

function parseScoreToPar(scoreStr) {
  const s = String(scoreStr).trim();
  if (s === 'E' || s === '-') return 0;
  if (s === '999') return 999;
  const n = parseInt(s);
  return isNaN(n) ? 999 : n;
}

function buildScorecardHtml(entry) {
  const roundNums = Object.keys(entry.holeData).map(Number).sort();
  const validRounds = roundNums.filter(r => entry.holeData[r] && entry.holeData[r].length > 0);

  if (validRounds.length === 0) {
    return '<div class="sc-empty">Ingen hull-data tilgjengelig ennå</div>';
  }

  const lastRound = validRounds[validRounds.length - 1];
  const scId = 'sc-' + entry.name.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now();

  // Round tabs
  let html = '<div class="sc-round-tabs">';
  for (const r of validRounds) {
    const active = r === lastRound ? ' active' : '';
    html += `<button class="sc-round-tab${active}" onclick="(function(btn){
      const wrap = btn.closest('.lb-scorecard');
      wrap.querySelectorAll('.sc-round-content').forEach(d => d.style.display = 'none');
      wrap.querySelectorAll('.sc-round-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      wrap.querySelector('[data-sc-round=\\'${r}\\']').style.display = 'block';
    })(this)">R${r} · ${ROUND_NAMES[r] || 'Runde ' + r}</button>`;
  }
  html += '</div>';

  // Round content
  for (const r of validRounds) {
    const holes = entry.holeData[r];
    const display = r === lastRound ? 'block' : 'none';
    let outStrokes = 0, inStrokes = 0;

    html += `<div class="sc-round-content" data-sc-round="${r}" style="display:${display}">`;

    // === DESKTOP: single full table (hidden on mobile) ===
    html += '<table class="sc-table sc-desktop"><colgroup>';
    html += '<col class="sc-col-label">';
    for (let i = 0; i < 9; i++) html += '<col class="sc-col-hole">';
    html += '<col class="sc-col-sum">';
    for (let i = 0; i < 9; i++) html += '<col class="sc-col-hole">';
    html += '<col class="sc-col-sum"><col class="sc-col-tot">';
    html += '</colgroup>';
    html += '<tr class="sc-header"><th class="sc-cell sc-label">Hull</th>';
    for (let h = 1; h <= 9; h++) html += `<th class="sc-cell">${h}</th>`;
    html += '<th class="sc-cell sc-out">UT</th>';
    for (let h = 10; h <= 18; h++) html += `<th class="sc-cell">${h}</th>`;
    html += '<th class="sc-cell sc-in">IN</th><th class="sc-cell sc-tot">TOT</th></tr>';
    html += '<tr class="sc-par"><td class="sc-cell sc-label">Par</td>';
    for (let h = 0; h < 9; h++) html += `<td class="sc-cell">${AUGUSTA_PAR[h]}</td>`;
    html += `<td class="sc-cell sc-out">${AUGUSTA_OUT}</td>`;
    for (let h = 9; h < 18; h++) html += `<td class="sc-cell">${AUGUSTA_PAR[h]}</td>`;
    html += `<td class="sc-cell sc-in">${AUGUSTA_IN}</td><td class="sc-cell sc-tot">${AUGUSTA_TOTAL}</td></tr>`;
    html += '<tr class="sc-score"><td class="sc-cell sc-label">Score</td>';
    for (let h = 1; h <= 9; h++) {
      const hs = holes.find(x => x.hole === h);
      if (hs) { outStrokes += hs.strokes; const cls = getHoleClass(hs.toPar); html += `<td class="sc-cell ${cls}">${cls ? `<span class="sc-num">${hs.strokes}</span>` : hs.strokes}</td>`; }
      else html += '<td class="sc-cell">-</td>';
    }
    html += `<td class="sc-cell sc-out">${outStrokes || '-'}</td>`;
    for (let h = 10; h <= 18; h++) {
      const hs = holes.find(x => x.hole === h);
      if (hs) { inStrokes += hs.strokes; const cls = getHoleClass(hs.toPar); html += `<td class="sc-cell ${cls}">${cls ? `<span class="sc-num">${hs.strokes}</span>` : hs.strokes}</td>`; }
      else html += '<td class="sc-cell">-</td>';
    }
    const totalStrokes = (outStrokes || 0) + (inStrokes || 0);
    html += `<td class="sc-cell sc-in">${inStrokes || '-'}</td>`;
    html += `<td class="sc-cell sc-tot">${totalStrokes || '-'}</td>`;
    html += '</tr></table>';

    // === MOBILE: two stacked half-tables (hidden on desktop) ===
    // Reset counters for mobile
    let mOut = 0, mIn = 0;

    // Front 9
    html += '<div class="sc-mobile">';
    html += '<table class="sc-table sc-half"><colgroup><col class="sc-col-label">';
    for (let i = 0; i < 9; i++) html += '<col class="sc-col-hole">';
    html += '<col class="sc-col-sum"></colgroup>';
    html += '<tr class="sc-header"><th class="sc-cell sc-label">Hull</th>';
    for (let h = 1; h <= 9; h++) html += `<th class="sc-cell">${h}</th>`;
    html += '<th class="sc-cell sc-out">UT</th></tr>';
    html += '<tr class="sc-par"><td class="sc-cell sc-label">Par</td>';
    for (let h = 0; h < 9; h++) html += `<td class="sc-cell">${AUGUSTA_PAR[h]}</td>`;
    html += `<td class="sc-cell sc-out">${AUGUSTA_OUT}</td></tr>`;
    html += '<tr class="sc-score"><td class="sc-cell sc-label">Score</td>';
    for (let h = 1; h <= 9; h++) {
      const hs = holes.find(x => x.hole === h);
      if (hs) { mOut += hs.strokes; const cls = getHoleClass(hs.toPar); html += `<td class="sc-cell ${cls}">${cls ? `<span class="sc-num">${hs.strokes}</span>` : hs.strokes}</td>`; }
      else html += '<td class="sc-cell">-</td>';
    }
    html += `<td class="sc-cell sc-out">${mOut || '-'}</td></tr></table>`;

    // Back 9
    html += '<table class="sc-table sc-half"><colgroup><col class="sc-col-label">';
    for (let i = 0; i < 9; i++) html += '<col class="sc-col-hole">';
    html += '<col class="sc-col-sum"><col class="sc-col-tot"></colgroup>';
    html += '<tr class="sc-header"><th class="sc-cell sc-label">Hull</th>';
    for (let h = 10; h <= 18; h++) html += `<th class="sc-cell">${h}</th>`;
    html += '<th class="sc-cell sc-in">IN</th><th class="sc-cell sc-tot">TOT</th></tr>';
    html += '<tr class="sc-par"><td class="sc-cell sc-label">Par</td>';
    for (let h = 9; h < 18; h++) html += `<td class="sc-cell">${AUGUSTA_PAR[h]}</td>`;
    html += `<td class="sc-cell sc-in">${AUGUSTA_IN}</td><td class="sc-cell sc-tot">${AUGUSTA_TOTAL}</td></tr>`;
    html += '<tr class="sc-score"><td class="sc-cell sc-label">Score</td>';
    for (let h = 10; h <= 18; h++) {
      const hs = holes.find(x => x.hole === h);
      if (hs) { mIn += hs.strokes; const cls = getHoleClass(hs.toPar); html += `<td class="sc-cell ${cls}">${cls ? `<span class="sc-num">${hs.strokes}</span>` : hs.strokes}</td>`; }
      else html += '<td class="sc-cell">-</td>';
    }
    const mTotal = (mOut || 0) + (mIn || 0);
    html += `<td class="sc-cell sc-in">${mIn || '-'}</td>`;
    html += `<td class="sc-cell sc-tot">${mTotal || '-'}</td>`;
    html += '</tr></table></div>';

    html += '</div>'; // sc-round-content
  }

  return html;
}

function getHoleClass(toPar) {
  if (!toPar) return '';
  const n = parseInt(toPar);
  if (toPar === 'E' || n === 0) return '';
  if (n <= -2) return 'sc-eagle';
  if (n === -1) return 'sc-birdie';
  if (n === 1) return 'sc-bogey';
  if (n >= 2) return 'sc-dbl-bogey';
  return '';
}

function renderTicker(leaderboard, challengers) {
  const track = document.getElementById('tickerTrack');
  const top10 = leaderboard.slice(0, 10);
  if (top10.length === 0) return;

  let items = '';
  for (const entry of top10) {
    const info = getPlayerInfo(entry.name);
    const flagEmoji = info.flag !== '🏳️' ? info.flag : getFlagEmoji(entry.countryAlt);

    let posClass = 't-normal';
    if (entry.position === 1) posClass = 't-gold';
    else if (entry.position === 2) posClass = 't-silver';
    else if (entry.position === 3) posClass = 't-bronze';

    const s = String(entry.totalScore);
    let scoreClass = 'even';
    if (s.startsWith('-') || s.startsWith('−')) scoreClass = 'under';
    else if (s.startsWith('+')) scoreClass = 'over';

    let dots = '';
    challengers.forEach((c, i) => {
      const picked = c.picks.some(p => findPlayerOnLeaderboard(p, [entry]));
      if (picked) dots += `<span class="tp-dot" style="background:${getColor(i).dot}"></span>`;
    });

    items += `
      <div class="ticker-item">
        <span class="ticker-pos ${posClass}">${entry.posDisplay}</span>
        <span class="ticker-flag">${flagEmoji}</span>
        <span class="ticker-name">${esc(entry.name)}</span>
        <span class="ticker-score ${scoreClass}">${entry.totalScore}</span>
        ${dots ? `<span class="ticker-picked">${dots}</span>` : ''}
      </div>`;
  }

  track.innerHTML = items + items;
}

function renderStatus(status, round) {
  const dot = document.getElementById('liveDot');
  const text = document.getElementById('statusText');

  if (status === 'in_progress') {
    dot.style.display = 'inline-block';
    text.textContent = `Live — ${ROUND_NAMES[round] || 'Runde ' + round}`;
  } else if (status === 'complete') {
    dot.style.display = 'none';
    if (round >= 4) {
      text.textContent = 'Turneringen er ferdig';
    } else {
      const nextRound = round + 1;
      const nextName = ROUND_NAMES[nextRound] || 'Neste runde';
      const nextTime = ROUND_START_TIMES[nextRound] || '';
      text.textContent = `${ROUND_NAMES[round]} er ferdig — ${nextName} starter ${nextTime ? 'kl. ' + nextTime + ' norsk tid' : 'snart'}`;
    }
  } else {
    dot.style.display = 'none';
    text.textContent = 'Venter på start...';
  }
}

// ============================================================
// REGISTRATION FORM
// ============================================================

function renderRegistrationForm() {
  const section = document.getElementById('registrationSection');
  if (!section) return;

  if (!isRegistrationOpen()) {
    section.innerHTML = `
      <div class="reg-closed">
        <span class="reg-closed-icon">🔒</span>
        <span>Registreringen er stengt (frist: 09. april kl 18:00)</span>
      </div>`;
    return;
  }

  // Calculate remaining time
  const remaining = REGISTRATION_DEADLINE.getTime() - Date.now();
  const hours = Math.floor(remaining / 3600000);
  const mins = Math.floor((remaining % 3600000) / 60000);

  section.innerHTML = `
    <div class="reg-card">
      <div class="reg-header">
        <h3>Bli med i konkurransen</h3>
        <span class="reg-deadline">Stenger om ${hours}t ${mins}min</span>
      </div>
      <div class="reg-form">
        <div class="reg-name-row">
          <input type="text" id="regName" placeholder="Ditt navn" class="reg-input" maxlength="20" />
        </div>
        <div style="background:#fef2f2;border:1px solid #dc2626;border-radius:2px;padding:10px 14px;margin:0 0 12px;font-size:12px;color:#991b1b;line-height:1.4">
          <strong>OBS!</strong> Sen-registrering gir ingen poeng for torsdag. Du har sett resultatene og MÅ SPILLE MED HJERTE — ikke bare velge spillerne som leder!<br><strong>Du kan maks velge 2 spillere som er i nåværende topp 10.</strong>
        </div>
        <div class="reg-picks-grid" id="regPicksGrid"></div>
        <div class="reg-actions">
          <button id="regSubmit" class="reg-btn" disabled>Legg til utfordrer</button>
          <span class="reg-error" id="regError"></span>
        </div>
      </div>
      <div class="reg-share" id="regShare" style="display:none">
        <span class="reg-share-text">Registrert!</span>
      </div>
    </div>`;

  // Create 10 pick inputs
  const grid = document.getElementById('regPicksGrid');
  for (let i = 1; i <= 10; i++) {
    const div = document.createElement('div');
    div.className = 'reg-pick-slot';
    div.innerHTML = `
      <label class="reg-pick-label">#${i}</label>
      <div class="reg-ac-wrap">
        <input type="text" class="reg-input reg-pick-input" data-slot="${i}" placeholder="Søk spiller..." autocomplete="off" />
        <div class="reg-ac-dropdown" data-slot="${i}" style="display:none"></div>
      </div>`;
    grid.appendChild(div);
  }

  // Wire up events
  document.getElementById('regName').addEventListener('input', validateForm);

  grid.querySelectorAll('.reg-pick-input').forEach(input => {
    input.addEventListener('input', (e) => {
      showAutocomplete(e.target);
      validateForm();
    });
    input.addEventListener('focus', (e) => showAutocomplete(e.target));
    input.addEventListener('blur', (e) => {
      setTimeout(() => {
        const dd = grid.querySelector(`.reg-ac-dropdown[data-slot="${e.target.dataset.slot}"]`);
        if (dd) dd.style.display = 'none';
      }, 200);
    });
  });

  document.getElementById('regSubmit').addEventListener('click', submitRegistration);
}

function showAutocomplete(input) {
  const query = input.value.trim().toLowerCase();
  const slot = input.dataset.slot;
  const dropdown = document.querySelector(`.reg-ac-dropdown[data-slot="${slot}"]`);

  if (query.length < 2 || espnPlayerNames.length === 0) {
    dropdown.style.display = 'none';
    return;
  }

  // Get already-selected picks
  const selected = new Set();
  document.querySelectorAll('.reg-pick-input').forEach(inp => {
    if (inp.dataset.slot !== slot && inp.dataset.confirmed === 'true') {
      selected.add(inp.value.toLowerCase());
    }
  });

  // Match on full name, first name, or last name
  const matches = espnPlayerNames
    .filter(name => {
      const low = name.toLowerCase();
      if (selected.has(low)) return false;
      // Match anywhere in name
      if (low.includes(query)) return true;
      // Match start of first or last name
      const parts = low.split(' ');
      return parts.some(p => p.startsWith(query));
    })
    .sort((a, b) => {
      // Prioritize matches at start of name
      const aStarts = a.toLowerCase().startsWith(query) ? 0 : 1;
      const bStarts = b.toLowerCase().startsWith(query) ? 0 : 1;
      return aStarts - bStarts || a.localeCompare(b);
    })
    .slice(0, 8);

  if (matches.length === 0) {
    dropdown.style.display = 'none';
    return;
  }

  dropdown.innerHTML = matches.map(name => {
    const info = getPlayerInfo(name);
    return `<div class="reg-ac-option" data-name="${escAttr(name)}">${info.flag} ${esc(name)}</div>`;
  }).join('');

  dropdown.style.display = 'block';

  dropdown.querySelectorAll('.reg-ac-option').forEach(opt => {
    opt.addEventListener('mousedown', (e) => {
      e.preventDefault();
      input.value = opt.dataset.name;
      input.dataset.confirmed = 'true';
      dropdown.style.display = 'none';
      validateForm();
      // Focus next empty slot
      const nextSlot = parseInt(slot) + 1;
      if (nextSlot <= 10) {
        const nextInput = document.querySelector(`.reg-pick-input[data-slot="${nextSlot}"]`);
        if (nextInput && !nextInput.dataset.confirmed) nextInput.focus();
      }
    });
  });
}

function validateForm() {
  const name = document.getElementById('regName')?.value.trim();
  const inputs = document.querySelectorAll('.reg-pick-input');
  let allConfirmed = true;
  const picks = [];

  inputs.forEach(inp => {
    if (inp.dataset.confirmed === 'true' && inp.value.trim()) {
      picks.push(inp.value.trim());
    } else {
      // Check if typed value matches an ESPN player exactly
      const typed = inp.value.trim().toLowerCase();
      const exact = espnPlayerNames.find(n => n.toLowerCase() === typed);
      if (exact) {
        inp.value = exact;
        inp.dataset.confirmed = 'true';
        picks.push(exact);
      } else {
        allConfirmed = false;
      }
    }
  });

  // Sjekk maks 4 topp-10 picks
  const MAX_TOP10_REG = 2;
  const top10Count = picks.filter(p => {
    const match = findPlayerOnLeaderboard(p, leaderboardData);
    return match && typeof match.position === 'number' && match.position <= 10;
  }).length;
  const top10Ok = top10Count <= MAX_TOP10_REG;

  const errEl = document.getElementById('regError');
  if (errEl) {
    errEl.textContent = (!top10Ok && allConfirmed && picks.length === 10)
      ? `Maks ${MAX_TOP10_REG} spillere i nåværende topp 10! Du har valgt ${top10Count}.`
      : '';
  }

  const btn = document.getElementById('regSubmit');
  if (btn) {
    btn.disabled = !(name && name.length >= 2 && allConfirmed && picks.length === 10 && top10Ok);
  }
}

async function submitRegistration() {
  const name = document.getElementById('regName').value.trim().slice(0, 20);
  const picks = [];
  document.querySelectorAll('.reg-pick-input').forEach(inp => {
    const val = inp.value.trim();
    // Only accept picks that match a valid ESPN player
    if (espnPlayerNames.some(n => n.toLowerCase() === val.toLowerCase())) {
      picks.push(val);
    }
  });

  if (picks.length !== 10 || !name || name.length < 2) {
    document.getElementById('regError').textContent = picks.length !== 10
      ? 'Alle 10 spillere ma velges fra listen!'
      : 'Ugyldig navn.';
    return;
  }

  // Check for duplicate picks
  const uniquePicks = new Set(picks.map(p => p.toLowerCase()));
  if (uniquePicks.size !== 10) {
    document.getElementById('regError').textContent = 'Kan ikke velge samme spiller flere ganger!';
    return;
  }

  // Maks 4 spillere fra nåværende topp 10
  const top10Count = picks.filter(p => {
    const match = findPlayerOnLeaderboard(p, leaderboardData);
    return match && typeof match.position === 'number' && match.position <= 10;
  }).length;
  if (top10Count > 2) {
    document.getElementById('regError').textContent = `Maks 2 spillere i nåværende topp 10! Du har valgt ${top10Count}.`;
    return;
  }

  // Check name not taken
  const all = await getAllChallengers();
  if (all.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    document.getElementById('regError').textContent = 'Navnet er allerede tatt!';
    return;
  }

  // Save to Supabase
  const errEl = document.getElementById('regError');
  const btn = document.getElementById('regSubmit');
  btn.disabled = true;
  btn.textContent = 'Lagrer...';

  try {
    await addChallenger(name, picks);

    // Show success
    document.querySelector('.reg-form').style.display = 'none';
    document.getElementById('regShare').style.display = 'flex';
    document.querySelector('.reg-share-text').textContent = `${esc(name)} er registrert!`;

    // Refresh dashboard
    updateDashboard();
  } catch (err) {
    errEl.textContent = err.message.includes('duplicate') || err.message.includes('unique')
      ? 'Navnet er allerede tatt!'
      : 'Feil ved lagring: ' + err.message;
    btn.disabled = false;
    btn.textContent = 'Legg til utfordrer';
  }
}

// ============================================================
// MAIN UPDATE
// ============================================================

let lastGoodESPNData = null;

async function fetchESPNWithRetry(retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const resp = await fetch('https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard');
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      lastGoodESPNData = data; // cache last good response
      return data;
    } catch (err) {
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 3000 * (attempt + 1)));
      } else {
        throw err;
      }
    }
  }
}

async function updateDashboard() {
  try {
    let data;
    try {
      data = await fetchESPNWithRetry();
    } catch (err) {
      // Use last good data if available
      if (lastGoodESPNData) {
        console.warn('ESPN fetch failed, using cached data:', err.message);
        data = lastGoodESPNData;
      } else {
        throw err;
      }
    }

    const parsed = parseESPNData(data);
    leaderboardData = parsed.leaderboard;
    currentRound = parsed.round;
    tournamentStatus = parsed.status;

    // Update ESPN player names for autocomplete (always refresh)
    if (leaderboardData.length > 0) {
      espnPlayerNames = leaderboardData.map(e => e.name);
      // Render registration form once we have player data
      if (!document.getElementById('regSubmit')) {
        renderRegistrationForm();
      }
    }

    const challengers = await getAllChallengers();
    lastChallengers = challengers;

    // Calculate points for ALL rounds (cumulative)
    const resultsByRound = {};
    const cumulativeResults = challengers.map(() => ({ total: 0, hits: 0, cuts: 0, details: [] }));

    for (let r = 1; r <= currentRound; r++) {
      // For completed rounds (r < currentRound), use that round's positions — not live positions
      const isCompletedRound = r < currentRound;
      const roundResults = challengers.map(c => calcRoundPoints(c.picks, leaderboardData, r, isCompletedRound));
      resultsByRound[r] = roundResults.map(res => res.total);

      // Accumulate totals (skip round 1 for late registrants)
      roundResults.forEach((res, i) => {
        const isLate = challengers[i].createdAt && new Date(challengers[i].createdAt) >= LATE_REG_CUTOFF;
        if (r === 1 && isLate) {
          resultsByRound[r][i] = 0; // show 0 in round breakdown too
          return;
        }
        cumulativeResults[i].total += res.total;
        cumulativeResults[i].hits = res.hits;
        cumulativeResults[i].cuts += res.cuts;
      });
    }

    // Use current round details for pick cards (shows live positions)
    const currentRoundResults = challengers.map(c => calcRoundPoints(c.picks, leaderboardData, currentRound));
    const finalResults = cumulativeResults.map((cum, i) => ({
      ...currentRoundResults[i],
      total: cum.total, // cumulative total across all rounds
    }));

    // Record score snapshot for chart
    recordScoreSnapshot(challengers, finalResults);

    // Render everything
    renderStatus(tournamentStatus, currentRound);

    // Check if tournament is finished → show winner celebration
    if (currentRound >= 4 && tournamentStatus === 'complete') {
      renderWinnerCelebration(challengers, finalResults, resultsByRound);
    }
    renderTicker(leaderboardData, challengers);
    renderRanking(challengers, finalResults, resultsByRound, currentRound);
    renderRoundBreakdown(challengers, resultsByRound, currentRound);
    renderDailyBreakdown(challengers, resultsByRound, currentRound);
    renderPickCards(challengers, finalResults);
    renderLeaderboard(leaderboardData, challengers);

    // Update chat name dropdowns now that challengers are loaded
    updateChatNameDropdowns();

    // Fetch tee times in background (non-blocking)
    fetchTeeTimes().then(() => renderLeaderboard(leaderboardData, lastChallengers)).catch(() => {});

    // Update chart if visible
    if (document.getElementById('chartView')?.classList.contains('active')) {
      renderScoreChart();
    }

    document.getElementById('lastUpdate').textContent =
      new Date().toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  } catch (err) {
    console.error('Update failed:', err);
    document.getElementById('statusText').textContent = 'Feil ved henting av data...';
  }
}

// ============================================================
// ADMIN PANEL (hidden, access via ?admin=masters2026)
// ============================================================

const ADMIN_KEY = 'masters2026';

function isAdmin() {
  return new URLSearchParams(window.location.search).get('admin') === ADMIN_KEY;
}

async function renderAdminPanel() {
  const section = document.getElementById('adminSection');
  if (!section || !isAdmin()) {
    if (section) section.style.display = 'none';
    return;
  }

  section.style.display = 'block';

  const all = await getAllChallengers();

  let challRows = '';
  all.forEach((c, i) => {
    const isBuiltin = BUILTIN_NAMES.has(c.name.toLowerCase());
    const color = getColor(i);
    challRows += `
      <div class="admin-row">
        <span class="rank-dot" style="background:${color.dot}"></span>
        <span class="admin-name">${esc(c.name)} ${isBuiltin ? '<em>(fast)</em>' : ''}</span>
        <span class="admin-picks">${c.picks.map(p => esc(p)).join(', ')}</span>
        ${!isBuiltin ? `<button class="admin-remove-btn" data-name="${escAttr(c.name)}">Fjern</button>` : ''}
      </div>`;
  });

  section.innerHTML = `
    <div class="admin-card">
      <div class="admin-header">ADMIN PANEL — Supabase</div>
      <div class="admin-body">
        <h4>Alle utfordrere (${all.length})</h4>
        <div class="admin-challengers">${challRows || '<em>Ingen ekstra utfordrere</em>'}</div>

        <h4>Legg til utfordrer manuelt</h4>
        <div class="admin-add">
          <input type="text" id="adminName" placeholder="Navn" class="reg-input" style="max-width:200px" maxlength="20" />
          <textarea id="adminPicks" class="reg-input" rows="3" placeholder="10 spillere, en per linje"></textarea>
          <button id="adminAddBtn" class="reg-btn">Legg til</button>
          <span class="admin-msg" id="adminMsg"></span>
        </div>

        <h4>Database</h4>
        <pre class="admin-debug">Supabase: ${esc(SUPABASE_URL)}\nUtfordrere i DB: ${all.length}\nCache TTL: ${CACHE_TTL}ms</pre>
      </div>
    </div>`;

  // Wire up remove buttons
  section.querySelectorAll('.admin-remove-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const nameToRemove = btn.dataset.name;
      btn.textContent = '...';
      try {
        await removeChallenger(nameToRemove);
        await renderAdminPanel();
        updateDashboard();
      } catch (e) {
        btn.textContent = 'Feil!';
      }
    });
  });

  // Wire up manual add
  document.getElementById('adminAddBtn')?.addEventListener('click', async () => {
    const name = document.getElementById('adminName').value.trim().slice(0, 20);
    const raw = document.getElementById('adminPicks').value.trim();
    const lines = raw.split('\n').map(l => l.replace(/^\d+[\.\)\s]+/, '').trim()).filter(Boolean);
    const msg = document.getElementById('adminMsg');

    if (!name || name.length < 2) { msg.textContent = 'Skriv inn et navn.'; return; }
    if (lines.length !== 10) { msg.textContent = `Trenger 10 spillere, fant ${lines.length}.`; return; }

    const validPicks = [];
    for (const line of lines) {
      const match = espnPlayerNames.find(n => n.toLowerCase() === line.toLowerCase())
        || espnPlayerNames.find(n => normalizeName(n) === normalizeName(line))
        || espnPlayerNames.find(n => {
          const last = normalizeName(n).split(' ').pop();
          return last === normalizeName(line).split(' ').pop();
        });
      if (match) {
        validPicks.push(match);
      } else {
        msg.textContent = `Fant ikke "${line}" i Masters-feltet.`;
        return;
      }
    }

    try {
      await addChallenger(name, validPicks);
      msg.textContent = `${name} lagt til!`;
      document.getElementById('adminName').value = '';
      document.getElementById('adminPicks').value = '';
      await renderAdminPanel();
      updateDashboard();
    } catch (e) {
      msg.textContent = 'Feil: ' + e.message;
    }
  });
}

// --- Init ---
// Show loading state in registration until ESPN data arrives
(function initRegSection() {
  const section = document.getElementById('registrationSection');
  if (section && isRegistrationOpen()) {
    section.innerHTML = `
      <div class="reg-card">
        <div class="reg-header">
          <h3>Bli med i konkurransen</h3>
          <span class="reg-deadline">Laster spillere...</span>
        </div>
        <div style="padding:20px;text-align:center;color:#5a6b5a">
          <div class="loading"><div class="spinner"></div>Henter spillerliste fra ESPN...</div>
        </div>
      </div>`;
  } else if (section) {
    renderRegistrationForm();
  }
})();
updateDashboard();
setInterval(updateDashboard, 60000);
renderAdminPanel();

// Refresh registration countdown every minute
setInterval(() => {
  if (!isRegistrationOpen()) renderRegistrationForm();
}, 60000);

// ============================================================
// CHAT
// ============================================================

const CHAT_POLL_INTERVAL = 10000; // 10s
const CHAT_ADMIN_NAME = 'Sebastian';
let chatMessages = [];
let chatLastId = 0;
let chatMyName = ''; // never pre-select — user must choose each session
let chatOpen = { chatMobile: false, chatDesktop: true };
let chatUnread = 0;
let chatSeenId = parseInt(localStorage.getItem('chatSeenId') || '0');

// Unique session ID per browser — persists across reloads
function getChatSessionId() {
  let sid = localStorage.getItem('chatSessionId');
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem('chatSessionId', sid);
  }
  return sid;
}
const chatSessionId = getChatSessionId();

function getChatNameOptions() {
  const names = lastChallengers.map(c => c.name).sort();
  const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;

  // Build map of name → session_id from recent messages
  const nameSessions = {};
  for (const m of chatMessages) {
    if (m.session_id && new Date(m.created_at).getTime() > twoHoursAgo) {
      nameSessions[m.name] = m.session_id; // last session that used this name
    }
  }

  return names.filter(n => {
    // Sebastian only for admin
    if (n === CHAT_ADMIN_NAME && !isAdmin()) return false;
    // If name was used by another session in last 2h, block it
    if (nameSessions[n] && nameSessions[n] !== chatSessionId && n !== chatMyName) return false;
    return true;
  });
}

function updateChatNameDropdowns() {
  const options = getChatNameOptions();
  if (options.length === 0) return;
  const hasValidName = chatMyName && options.includes(chatMyName);
  const optionsHtml = `<option value="" disabled ${!hasValidName ? 'selected' : ''}>Velg navn</option>` +
    options.map(n => `<option value="${escAttr(n)}" ${n === chatMyName ? 'selected' : ''}>${esc(n)}</option>`).join('');
  ['chatMobile', 'chatDesktop'].forEach(id => {
    const sel = document.getElementById(`chatName-${id}`);
    if (sel) sel.innerHTML = optionsHtml;
  });
}

function chatHtml(targetId) {
  const options = getChatNameOptions();
  const hasValidName = chatMyName && options.includes(chatMyName);
  const optionsHtml = options.length > 0
    ? `<option value="" disabled ${!hasValidName ? 'selected' : ''}>Velg navn</option>` +
      options.map(n => `<option value="${escAttr(n)}" ${n === chatMyName ? 'selected' : ''}>${esc(n)}</option>`).join('')
    : '<option value="" disabled selected>Laster...</option>';

  return `
    <div class="chat-header" onclick="toggleChat('${targetId}')">
      💬 Chat <span class="chat-msg-count" id="chatCount-${targetId}"></span>
      <span class="chat-badge" id="chatBadge-${targetId}"></span>
      <span class="chat-toggle-icon" id="chatToggle-${targetId}">▼</span>
    </div>
    <div class="chat-body" id="chatBody-${targetId}">
      <div class="chat-messages" id="chatMsgs-${targetId}">
        <div class="chat-empty">Ingen meldinger ennå — vær den første!</div>
      </div>
      <div class="chat-scroll-btn" id="chatScrollBtn-${targetId}" style="display:none" onclick="chatScrollToBottom('${targetId}')">▼ Nye meldinger</div>
      <div class="chat-input-wrap">
        <select class="chat-name-select" id="chatName-${targetId}">${optionsHtml}</select>
        <input type="text" class="chat-msg-input" id="chatInput-${targetId}" placeholder="Skriv en melding..." maxlength="500">
        <button class="chat-send-btn" id="chatSend-${targetId}">Send</button>
      </div>
    </div>`;
}

function toggleChat(targetId) {
  chatOpen[targetId] = !chatOpen[targetId];
  const container = document.getElementById(targetId);
  const icon = document.getElementById(`chatToggle-${targetId}`);
  if (!container) return;

  if (chatOpen[targetId]) {
    container.classList.remove('chat-collapsed');
    if (icon) icon.textContent = '▲';
    chatUnread = 0;
    if (chatMessages.length > 0) {
      chatSeenId = chatMessages[chatMessages.length - 1].id;
      localStorage.setItem('chatSeenId', chatSeenId);
    }
    updateChatBadges();
    const msgs = document.getElementById(`chatMsgs-${targetId}`);
    if (msgs) setTimeout(() => msgs.scrollTop = msgs.scrollHeight, 50);
  } else {
    container.classList.add('chat-collapsed');
    if (icon) icon.textContent = '▼';
  }
}

function updateChatBadges() {
  ['chatMobile', 'chatDesktop'].forEach(id => {
    const badge = document.getElementById(`chatBadge-${id}`);
    if (badge) badge.textContent = chatUnread > 0 ? chatUnread : '';
    const count = document.getElementById(`chatCount-${id}`);
    if (count) count.textContent = chatMessages.length > 0 ? `(${chatMessages.length})` : '';
  });
  document.title = chatUnread > 0
    ? `(${chatUnread}) The Masters 2026 — Tippekonkurranse`
    : 'The Masters 2026 — Tippekonkurranse';
}

function chatScrollToBottom(targetId) {
  const el = document.getElementById(`chatMsgs-${targetId}`);
  if (el) el.scrollTop = el.scrollHeight;
  const btn = document.getElementById(`chatScrollBtn-${targetId}`);
  if (btn) btn.style.display = 'none';
}

function initChat() {
  const mobile = document.getElementById('chatMobile');
  const desktop = document.getElementById('chatDesktop');
  if (mobile) mobile.innerHTML = chatHtml('chatMobile');
  if (desktop) desktop.innerHTML = chatHtml('chatDesktop');

  if (mobile) { mobile.classList.add('chat-collapsed'); chatOpen.chatMobile = false; }
  if (desktop) { chatOpen.chatDesktop = true; }

  ['chatMobile', 'chatDesktop'].forEach(id => {
    const sendBtn = document.getElementById(`chatSend-${id}`);
    const input = document.getElementById(`chatInput-${id}`);
    const nameSelect = document.getElementById(`chatName-${id}`);
    const msgsEl = document.getElementById(`chatMsgs-${id}`);

    if (!sendBtn) return;

    sendBtn.addEventListener('click', () => sendChatMessage(id));
    input?.addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage(id); });

    // Sync name select between both instances + claim name with confirmation
    nameSelect?.addEventListener('change', async () => {
      const chosen = nameSelect.value;
      if (!chosen) return;

      const confirmed = confirm(`Er du sikker på at du vil chatte som "${chosen}"?\n\nDu vil ikke kunne bytte navn etterpå, og ingen andre vil kunne bruke dette navnet.`);
      if (!confirmed) {
        // Reset dropdown to placeholder
        nameSelect.value = '';
        return;
      }

      chatMyName = chosen;
      localStorage.setItem('chatName', chatMyName);
      const otherId = id === 'chatMobile' ? 'chatDesktop' : 'chatMobile';
      const other = document.getElementById(`chatName-${otherId}`);
      if (other) other.value = chatMyName;
      // Claim name by sending a hidden system message (locks session_id in DB)
      try {
        const payload = { name: chatMyName, message: '__claim__', session_id: chatSessionId };
        if (chatMyName === CHAT_ADMIN_NAME && isAdmin()) payload.admin_token = 'guttorm-er-sansen-2026';
        await fetch(`${SUPABASE_URL}/rest/v1/chat_messages`, {
          method: 'POST',
          headers: { ...SB_HEADERS, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        await fetchChatMessages();
      } catch (e) { console.error('Claim failed:', e); }
    });

    // Scroll detection for "new messages" button
    msgsEl?.addEventListener('scroll', () => {
      const btn = document.getElementById(`chatScrollBtn-${id}`);
      if (!btn || !msgsEl) return;
      const atBottom = msgsEl.scrollHeight - msgsEl.scrollTop - msgsEl.clientHeight < 60;
      btn.style.display = atBottom ? 'none' : 'block';
    });
  });

  fetchChatMessages();
  setInterval(fetchChatMessages, CHAT_POLL_INTERVAL);
}

async function fetchChatMessages() {
  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/chat_messages?select=id,name,message,created_at,session_id&order=created_at.asc&limit=200`,
      { headers: SB_HEADERS }
    );
    if (!resp.ok) return;
    const msgs = await resp.json();
    if (!msgs.length && !chatMessages.length) return;

    const isFirstLoad = chatMessages.length === 0;
    const newMsgs = msgs.filter(m => m.id > chatLastId);
    chatMessages = msgs;
    if (msgs.length > 0) chatLastId = msgs[msgs.length - 1].id;

    const unseenMsgs = msgs.filter(m => m.id > chatSeenId && m.message !== '__claim__' && m.name.toLowerCase() !== chatMyName.toLowerCase());
    const anyOpen = Object.values(chatOpen).some(v => v);
    if (anyOpen && !isFirstLoad) {
      chatUnread = 0;
      if (msgs.length > 0) {
        chatSeenId = msgs[msgs.length - 1].id;
        localStorage.setItem('chatSeenId', chatSeenId);
      }
    } else {
      chatUnread = unseenMsgs.length;
    }
    updateChatBadges();
    renderChatMessages();
    updateChatNameDropdowns(); // refresh available names based on session locks

    if (newMsgs.length > 0) {
      ['chatMobile', 'chatDesktop'].forEach(id => {
        if (chatOpen[id]) {
          const el = document.getElementById(`chatMsgs-${id}`);
          if (el) {
            const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
            if (atBottom) el.scrollTop = el.scrollHeight;
          }
        }
      });
    }
  } catch (err) { console.error('Chat fetch error:', err); }
}

function renderChatMessages() {
  if (chatMessages.filter(m => m.message !== '__claim__').length === 0) {
    const empty = '<div class="chat-empty">Ingen meldinger ennå — vær den første!</div>';
    ['chatMobile', 'chatDesktop'].forEach(id => {
      const el = document.getElementById(`chatMsgs-${id}`);
      if (el) el.innerHTML = empty;
    });
    return;
  }

  let html = '';
  let lastDay = '';

  const visibleMessages = chatMessages.filter(m => m.message !== '__claim__');
  for (const m of visibleMessages) {
    const d = new Date(m.created_at);
    const dayStr = d.toLocaleDateString('no-NO', { weekday: 'long', day: 'numeric', month: 'short' });
    const time = d.toLocaleTimeString('no-NO', { hour: '2-digit', minute: '2-digit' });
    const isOwn = m.name.toLowerCase() === chatMyName.toLowerCase();

    // Day separator
    if (dayStr !== lastDay) {
      html += `<div class="chat-day-sep">${dayStr}</div>`;
      lastDay = dayStr;
    }

    const canDelete = isOwn || isAdmin();
    const isChatAdmin = m.name === CHAT_ADMIN_NAME;
    const adminTag = isChatAdmin ? ' <span class="chat-admin-tag">ADMIN</span>' : '';
    const ci = lastChallengers.findIndex(c => c.name === m.name);
    const nameColor = isChatAdmin ? '#c8a951' : (ci >= 0 ? getColor(ci).text : '#1a2e1a');

    html += `<div class="chat-msg ${isOwn ? 'own' : ''} ${isChatAdmin ? 'admin-msg-row' : ''}">
      <div class="chat-msg-header">
        <span class="chat-msg-name" style="color:${nameColor};font-weight:700">${esc(m.name)}${adminTag}</span>
        <span class="chat-msg-time">${time}</span>
        ${canDelete ? `<button class="chat-delete-btn" onclick="deleteChatMsg(${m.id})" title="Slett melding">&times;</button>` : ''}
      </div>
      <div class="chat-msg-text">${esc(m.message)}</div>
    </div>`;
  }

  ['chatMobile', 'chatDesktop'].forEach(id => {
    const el = document.getElementById(`chatMsgs-${id}`);
    if (el) el.innerHTML = html;
  });
}

async function sendChatMessage(sourceId) {
  const nameSelect = document.getElementById(`chatName-${sourceId}`);
  const msgInput = document.getElementById(`chatInput-${sourceId}`);
  const sendBtn = document.getElementById(`chatSend-${sourceId}`);

  const name = (nameSelect?.value || '').trim();
  const message = (msgInput?.value || '').trim();

  if (!name) { alert('Velg navnet ditt fra listen.'); return; }
  if (!message) { msgInput?.focus(); return; }

  // Block Sebastian for non-admin
  if (name === CHAT_ADMIN_NAME && !isAdmin()) {
    alert('Dette navnet er reservert for admin.');
    return;
  }

  chatMyName = name;
  localStorage.setItem('chatName', chatMyName);

  sendBtn.disabled = true;
  try {
    const payload = { name, message, session_id: chatSessionId };
    // Include admin token for Sebastian messages (validated by Supabase RLS)
    if (name === CHAT_ADMIN_NAME && isAdmin()) {
      payload.admin_token = 'guttorm-er-sansen-2026';
    }
    const resp = await fetch(`${SUPABASE_URL}/rest/v1/chat_messages`, {
      method: 'POST',
      headers: { ...SB_HEADERS, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw new Error('Send failed');
    msgInput.value = '';
    await fetchChatMessages();
    // Scroll to bottom after sending
    ['chatMobile', 'chatDesktop'].forEach(id => {
      const el = document.getElementById(`chatMsgs-${id}`);
      if (el) el.scrollTop = el.scrollHeight;
    });
  } catch (err) {
    console.error('Chat send error:', err);
  } finally {
    sendBtn.disabled = false;
    msgInput?.focus();
  }
}

async function deleteChatMsg(msgId) {
  if (!confirm('Slette denne meldingen?')) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/chat_messages?id=eq.${msgId}`, {
      method: 'DELETE',
      headers: SB_HEADERS,
    });
    chatMessages = chatMessages.filter(m => m.id !== msgId);
    renderChatMessages();
    updateChatBadges();
  } catch (err) { console.error('Delete chat msg error:', err); }
}

initChat();
