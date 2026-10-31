import { DefaultScheduler, Rating } from 'ts-fsrs';
export const STATE_KEY = 'cn_fsrs_v1';
export const LEGACY_BACKUP_KEY = 'cn_srs_before_fsrs_v1';
const validDate = value => { const d = new Date(value); if (!Number.isFinite(+d)) throw new Error('複習日期資料損壞，請先匯出備份。'); return d; };
const hydrate = card => ({ ...card, dueAt: validDate(card.dueAt), lastReviewAt: card.lastReviewAt == null ? null : validDate(card.lastReviewAt) });
export async function createReviewEngine({ storage, legacy = {}, now = () => new Date() }) {
  const scheduler = await DefaultScheduler({ version: 'FSRS-7', desiredRetention: 0.9, enableFuzz: false, maximumInterval: 365 });
  let state;
  try {
    const text = storage.getItem(STATE_KEY);
    state = text == null ? { schemaVersion: 1, model: 'FSRS-7', cards: {}, flags: {}, history: [] } : JSON.parse(text);
    if (state.schemaVersion !== 1 || state.model !== 'FSRS-7' || !state.cards || !state.flags || !Array.isArray(state.history)) throw new Error('不支援的資料格式');
    for (const card of Object.values(state.cards)) hydrate(card);
  } catch (error) { throw new Error('無法讀取複習進度；原始資料已保留，請先匯出備份。', { cause: error }); }
  function persist(next) {
    // Original records remain intact; missing historical ratings are never invented.
    if (storage.getItem(LEGACY_BACKUP_KEY) == null) storage.setItem(LEGACY_BACKUP_KEY, JSON.stringify(legacy));
    storage.setItem(STATE_KEY, JSON.stringify(next)); state = next;
  }
  function cardFor(id, at = now()) { return state.cards[id] ? hydrate(state.cards[id]) : scheduler.newCard({ cardId: id, now: at }); }
  function summary() {
    const result = structuredClone(legacy);
    for (const [id, card] of Object.entries(state.cards)) result[id] = { ...(result[id] || {}), due: +validDate(card.dueAt), box: card.reps >= 3 ? 3 : 1, fsrs: true };
    for (const [id, weak] of Object.entries(state.flags)) result[id] = { ...(result[id] || { box: 0, due: +now() }), weak };
    return result;
  }
  return {
    summary,
    isNew(id) { return !state.cards[id] && !legacy[id]; },
    isDue(id, at = now()) { const due = state.cards[id]?.dueAt ?? legacy[id]?.due; return due == null || +validDate(due) <= +at; },
    isLearned(id) { const card = state.cards[id]; return card ? card.scheduleStatus === 'review' && card.reps >= 2 : (legacy[id]?.box || 0) >= 3; },
    preview(id, at = now()) { return [...scheduler.preview({ card: cardFor(id, at), now: at })].map(r => ({ rating: r.grade, dueAt: r.card.dueAt })); },
    review(id, rating, { clearWeak = false } = {}) {
      if (![Rating.Again, Rating.Hard, Rating.Good, Rating.Easy].includes(rating)) throw new Error('無效的自評選項');
      const at = now(), result = scheduler.review({ card: cardFor(id, at), grade: rating, now: at });
      const weak = rating === Rating.Again ? true : clearWeak && rating >= Rating.Good ? false : state.flags[id] ?? legacy[id]?.weak ?? false;
      persist({ ...state, cards: { ...state.cards, [id]: result.card }, flags: { ...state.flags, [id]: weak }, history: [...state.history, { ...result.revlog, nextDueAt: result.card.dueAt }] });
      return result;
    },
    saveFlags(view) { const flags = { ...state.flags }; for (const [id, record] of Object.entries(view)) if (typeof record.weak === 'boolean') flags[id] = record.weak; persist({ ...state, flags }); },
    exportState() { return structuredClone({ fsrs: state, legacy }); },
  };
}
export function describeDue(dueAt, at = new Date()) {
  const minutes = Math.max(1, Math.round((+validDate(dueAt) - +at) / 60000));
  if (minutes < 60) return `約 ${minutes} 分鐘後`;
  if (minutes < 1440) return `約 ${Math.round(minutes / 60)} 小時後`;
  return `約 ${Math.round(minutes / 1440)} 天後`;
}
