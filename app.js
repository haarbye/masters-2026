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
};

const FLAG_MAP = {
  'united states': '🇺🇸', 'usa': '🇺🇸',
  'england': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', 'wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿',
  'northern ireland': '🇬🇧', 'ireland': '🇮🇪',
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
const REGISTRATION_DEADLINE = new Date('2026-04-09T18:00:00+02:00');

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
      `${SUPABASE_URL}/rest/v1/challengers?select=name,picks&order=created_at.asc`,
      { headers: SB_HEADERS }
    );
    if (!resp.ok) throw new Error(`Supabase ${resp.status}`);
    const rows = await resp.json();
    const extras = rows
      .filter(r => r.name && Array.isArray(r.picks) && r.picks.length === 10)
      .map(r => ({ name: r.name, picks: r.picks }));

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
const TOP10_PTS_PER_ROUND = { 1: 1, 2: 2, 3: 3, 4: 3 };
const ROUND_NAMES = { 1: 'Torsdag', 2: 'Fredag', 3: 'Lørdag', 4: 'Søndag' };
const ROUND_PTS_LABELS = { 1: '1p', 2: '2p', 3: '3p', 4: 'Full' };

// --- State ---
let leaderboardData = [];
let currentRound = 1;
let tournamentStatus = 'pre';
let espnPlayerNames = [];
let lastChallengers = []; // cached for sync access in click handlers

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
//   Topp 10: R1=1p, R2=2p, R3=3p
//   Eksakt plassering bonus: R1=+2p, R2=+3p, R3=+5p
//   CUT: -2p (slår inn etter fredag)
//
// R4 (søndag) — full pott:
//   Eksakt riktig plass:  #1=35p  #2=15p  #3=10p  #4–10=4p
//   Tippa vinner, endte på pall: 10p
//   Tippa pall, endte i topp 10: 5p
//   I topp 10, feil plass: 3p
//   DQ: -2p
//   Alle 3 pallplasser riktige: +8 bonus

const CUT_PENALTY = -2;
const EXACT_POS_BONUS = { 1: 2, 2: 3, 3: 5, 4: 5 }; // bonus for exact top-10 position per round

function calcRoundPoints(picks, leaderboard, roundNum) {
  const isSunday = roundNum === 4;
  const top10pts = TOP10_PTS_PER_ROUND[roundNum] || 1;
  let total = 0;
  let hits = 0;
  let cuts = 0;
  const details = [];

  for (let i = 0; i < picks.length; i++) {
    const match = findPlayerOnLeaderboard(picks[i], leaderboard);
    let pos = null;
    let pts = 0;
    let score = null;
    let thru = null;
    let isCut = false;
    const pickSlot = i + 1;

    if (match && typeof match.position === 'number') {
      pos = match.position;
      score = match.totalScore;
      thru = match.thru;

      isCut = match.isCut || false;
      const isDQ = match.isDQ || false;

      if (isSunday && isDQ) {
        // Søndag: DQ gir straff
        pts = CUT_PENALTY;
        cuts++;
      } else if (!isSunday && isCut && roundNum >= 2) {
        // R2–R3: CUT gir straff (ikke R1 — CUT skjer etter fredag)
        pts = CUT_PENALTY;
        cuts++;
      } else if (pos <= 10) {
        hits++;
        if (isSunday) {
          // === SØNDAG: Full scoring ===
          if (pickSlot === pos) {
            if (pos === 1) pts = 35;
            else if (pos === 2) pts = 15;
            else if (pos === 3) pts = 10;
            else pts = 4;
          } else {
            if (pickSlot === 1 && pos >= 2 && pos <= 3) pts = 10;
            else if (pickSlot >= 2 && pickSlot <= 3 && pos >= 4 && pos <= 10) pts = 5;
            else pts = 3;
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

    details.push({ pickRank: pickSlot, name: picks[i], leaderboardPos: pos, score, thru, roundPts: pts, isCut, isDQ: match?.isDQ || false });
    total += pts;
  }

  // === SØNDAGS-BONUS: Alle 3 pallplasser riktige ===
  if (isSunday) {
    let podiumCorrect = 0;
    for (let i = 0; i < Math.min(3, picks.length); i++) {
      const match = findPlayerOnLeaderboard(picks[i], leaderboard);
      if (match && match.position === (i + 1)) podiumCorrect++;
    }
    if (podiumCorrect === 3) total += 8;
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
        if (currentRoundLs && currentRoundLs.linescores) {
          const holes = currentRoundLs.linescores.length;
          thru = holes >= 18 ? 'F' : String(holes);
        } else if (currentRoundLs && currentRoundLs.displayValue) {
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

      result.push({
        name, position: pos, posDisplay: String(pos), totalScore,
        rounds, thru, holeData, isCut, isDQ,
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

// ============================================================
// RENDER FUNCTIONS
// ============================================================

function renderRanking(challengers, results) {
  const container = document.getElementById('rankingTable');

  // Sort by total points descending
  const ranked = challengers.map((c, i) => ({
    name: c.name,
    color: getColor(i),
    total: results[i].total,
    hits: results[i].hits,
    exactMatches: results[i].details.filter(d => d.leaderboardPos !== null && d.pickRank === d.leaderboardPos && d.leaderboardPos <= 10).length,
  })).sort((a, b) => b.total - a.total);

  const maxPts = Math.max(...ranked.map(r => r.total), 1);

  let html = '';
  ranked.forEach((r, idx) => {
    const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}.`;
    const barWidth = Math.round((r.total / maxPts) * 100);
    const lead = idx === 0 ? '' : ` (${r.total - ranked[0].total})`;

    html += `
      <div class="rank-row">
        <div class="rank-pos">${medal}</div>
        <div class="rank-main">
          <div class="rank-name">
            <span class="rank-dot" style="background:${r.color.dot}"></span>
            ${esc(r.name)}
          </div>
          <div class="rank-bar-wrap">
            <div class="rank-bar" style="width:${barWidth}%;background:${r.color.dot}"></div>
          </div>
        </div>
        <div class="rank-stats">
          <span class="rank-hits">${r.hits} i top 10</span>
          ${r.exactMatches > 0 ? `<span class="rank-exact">${r.exactMatches} eksakt</span>` : ''}
        </div>
        <div class="rank-pts" style="color:${r.color.text}">${r.total}<span class="rank-pts-label"> pts</span>${lead ? `<span class="rank-diff">${lead}</span>` : ''}</div>
      </div>`;
  });

  container.innerHTML = html;
}

function renderRoundBreakdown(challengers, resultsByRound, activeRound) {
  const container = document.getElementById('roundBreakdown');
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

// Track which cards are COLLAPSED (persists across re-renders)
// All cards are open by default — user clicks to collapse
const collapsedCards = new Set();

function renderPickCards(challengers, results) {
  const container = document.getElementById('pickColumns');

  // All cards open by default (collapsedCards tracks which are closed)

  // Sort by name alphabetically, keeping original index for color
  const indexed = challengers.map((c, i) => ({ challenger: c, result: results[i], origIdx: i }));
  indexed.sort((a, b) => a.challenger.name.localeCompare(b.challenger.name, 'no'));

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
      if (d.isCut && d.roundPts < 0) {
        posClass = 'cut';
        posText = 'CUT';
        rowClass = 'is-cut';
      } else if (d.isDQ && d.roundPts < 0) {
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

      const scoreText = d.score || '';
      const thruText = d.thru && d.thru !== '-' ? `Thru ${d.thru}` : '';
      const ptsClass = d.roundPts > 0 ? 'has-pts' : 'no-pts';

      rowsHtml += `
        <div class="pick-row ${rowClass}">
          <div class="pick-rank">${d.pickRank}</div>
          <div class="pick-player">
            <span class="flag">${info.flag}</span>
            <div class="info">
              <span class="player-name">${esc(info.name)}</span>
              <span class="country-name">${esc(info.country)}${scoreText ? ' · ' + esc(scoreText) : ''}${thruText ? ' · ' + thruText : ''}</span>
            </div>
          </div>
          <div class="pick-pos ${posClass}">${posText}</div>
          <div class="pick-pts ${ptsClass}">${d.roundPts > 0 ? '+' + d.roundPts : '0'}</div>
        </div>`;
    }

    const summaryText = `${hitsInTop10} i top 10${exactMatches ? ` · ${exactMatches} eksakt` : ''}${bestPos ? ` · beste #${bestPos}` : ''}`;

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

function renderLeaderboard(leaderboard, challengers) {
  const container = document.getElementById('leaderboard');
  let shown = leaderboard.slice(0, 50);

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

  let html = '';
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

    // Build scorecard HTML
    let scorecardHtml = '';
    if (isExpanded && entry.holeData) {
      scorecardHtml = buildScorecardHtml(entry);
    }

    html += `
      <div class="lb-entry ${highlight}">
        <div class="lb-row" data-player="${escAttr(entry.name)}" style="cursor:pointer">
          <div class="lb-pos">${entry.posDisplay}</div>
          <div class="lb-player">
            <span class="flag">${flagEmoji}</span>
            <span class="name">${esc(entry.name)}</span>
            <span class="picked-by">${dots}</span>
          </div>
          <div class="lb-round text-center">${entry.rounds[1] || '-'}</div>
          <div class="lb-round text-center">${entry.rounds[2] || '-'}</div>
          <div class="lb-round text-center">${entry.rounds[3] || '-'}</div>
          <div class="lb-round text-center">${entry.rounds[4] || '-'}</div>
          <div class="lb-total ${scoreClass} text-center">${entry.totalScore}</div>
          <div class="lb-thru text-center">${entry.thru}</div>
        </div>
        ${isExpanded ? `<div class="lb-scorecard">${scorecardHtml}</div>` : ''}
      </div>`;
  }

  container.innerHTML = html;

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
  let html = '';
  const roundNums = Object.keys(entry.holeData).map(Number).sort();

  for (const r of roundNums) {
    const holes = entry.holeData[r];
    if (!holes || holes.length === 0) continue;

    // Build hole number row, par row, score row
    const outHoles = holes.filter(h => h.hole <= 9);
    const inHoles = holes.filter(h => h.hole > 9);

    let outStrokes = 0, inStrokes = 0;

    html += `<div class="sc-round-label">Runde ${r}</div>`;
    html += '<div class="sc-table">';

    // Header: Hole numbers
    html += '<div class="sc-row sc-header"><div class="sc-cell sc-label">Hull</div>';
    for (let h = 1; h <= 9; h++) html += `<div class="sc-cell">${h}</div>`;
    html += '<div class="sc-cell sc-out">UT</div>';
    for (let h = 10; h <= 18; h++) html += `<div class="sc-cell">${h}</div>`;
    html += '<div class="sc-cell sc-in">IN</div><div class="sc-cell sc-tot">TOT</div></div>';

    // Par row
    html += '<div class="sc-row sc-par"><div class="sc-cell sc-label">Par</div>';
    for (let h = 0; h < 9; h++) html += `<div class="sc-cell">${AUGUSTA_PAR[h]}</div>`;
    html += `<div class="sc-cell sc-out">${AUGUSTA_OUT}</div>`;
    for (let h = 9; h < 18; h++) html += `<div class="sc-cell">${AUGUSTA_PAR[h]}</div>`;
    html += `<div class="sc-cell sc-in">${AUGUSTA_IN}</div><div class="sc-cell sc-tot">${AUGUSTA_TOTAL}</div></div>`;

    // Score row
    html += '<div class="sc-row sc-score"><div class="sc-cell sc-label">Score</div>';
    for (let h = 1; h <= 9; h++) {
      const holeScore = holes.find(x => x.hole === h);
      if (holeScore) {
        outStrokes += holeScore.strokes;
        const cls = getHoleClass(holeScore.toPar);
        html += `<div class="sc-cell ${cls}">${cls ? `<span class="sc-num">${holeScore.strokes}</span>` : holeScore.strokes}</div>`;
      } else {
        html += '<div class="sc-cell">-</div>';
      }
    }
    html += `<div class="sc-cell sc-out">${outStrokes || '-'}</div>`;
    for (let h = 10; h <= 18; h++) {
      const holeScore = holes.find(x => x.hole === h);
      if (holeScore) {
        inStrokes += holeScore.strokes;
        const cls = getHoleClass(holeScore.toPar);
        html += `<div class="sc-cell ${cls}">${cls ? `<span class="sc-num">${holeScore.strokes}</span>` : holeScore.strokes}</div>`;
      } else {
        html += '<div class="sc-cell">-</div>';
      }
    }
    const totalStrokes = (outStrokes || 0) + (inStrokes || 0);
    html += `<div class="sc-cell sc-in">${inStrokes || '-'}</div>`;
    html += `<div class="sc-cell sc-tot">${totalStrokes || '-'}</div>`;
    html += '</div>'; // sc-score
    html += '</div>'; // sc-table
  }

  if (roundNums.length === 0) {
    html = '<div class="sc-empty">Ingen hull-data tilgjengelig ennå</div>';
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
    text.textContent = 'Turneringen er ferdig';
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

  const btn = document.getElementById('regSubmit');
  if (btn) {
    btn.disabled = !(name && name.length >= 2 && allConfirmed && picks.length === 10);
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
      const roundResults = challengers.map(c => calcRoundPoints(c.picks, leaderboardData, r));
      resultsByRound[r] = roundResults.map(res => res.total);

      // Accumulate totals
      roundResults.forEach((res, i) => {
        cumulativeResults[i].total += res.total;
        cumulativeResults[i].hits = res.hits; // current round hits (not cumulative)
        cumulativeResults[i].cuts += res.cuts;
      });
    }

    // Use current round details for pick cards (shows live positions)
    const currentRoundResults = challengers.map(c => calcRoundPoints(c.picks, leaderboardData, currentRound));
    const finalResults = cumulativeResults.map((cum, i) => ({
      ...currentRoundResults[i],
      total: cum.total, // cumulative total across all rounds
    }));

    // Render everything
    renderStatus(tournamentStatus, currentRound);
    renderTicker(leaderboardData, challengers);
    renderRanking(challengers, finalResults);
    renderRoundBreakdown(challengers, resultsByRound, currentRound);
    renderPickCards(challengers, finalResults);
    renderLeaderboard(leaderboardData, challengers);

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
