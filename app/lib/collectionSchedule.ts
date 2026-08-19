// Collection-slot rules for the "Collection from Hose World store" shipping
// method: at least 4 working days out, and only during store hours. Shared
// between the client-side checkout form (min/max attributes, inline errors)
// and the server-side action that actually creates the order, so a
// tampered/direct POST can't bypass the rule the UI enforces.
//
// Working day = Mon-Fri. ZA public holidays are NOT accounted for (no
// holiday calendar in this codebase) — a date that lands on a public
// holiday will still validate. Revisit if that becomes a real problem.

const WORKING_HOURS: Record<number, {min: string; max: string} | null> = {
  0: null, // Sunday
  1: {min: '08:00', max: '16:30'}, // Monday
  2: {min: '08:00', max: '16:30'}, // Tuesday
  3: {min: '08:00', max: '16:30'}, // Wednesday
  4: {min: '08:00', max: '16:30'}, // Thursday
  5: {min: '08:00', max: '15:30'}, // Friday
  6: null, // Saturday
};

const MIN_WORKING_DAYS_AHEAD = 4;

function todayInStoreTimezone(): Date {
  // The store operates in SAST (no DST), so anchor "today" to that timezone
  // regardless of what timezone the server process happens to run in.
  const ymd = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Africa/Johannesburg',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
  return new Date(`${ymd}T00:00:00`);
}

function addWorkingDays(from: Date, days: number): Date {
  const result = new Date(from);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const day = result.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return result;
}

function toDateInputValue(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Earliest selectable collection date, as a `YYYY-MM-DD` string (for the date input's `min`). */
export function getMinCollectionDate(now: Date = todayInStoreTimezone()): string {
  return toDateInputValue(addWorkingDays(now, MIN_WORKING_DAYS_AHEAD));
}

/** Working-hours window for the weekday `dateStr` falls on, or `null` if it's a weekend. */
export function getWorkingHoursFor(dateStr: string): {min: string; max: string} | null {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return WORKING_HOURS[date.getDay()] ?? null;
}

export function validateCollectionDateTime(
  dateStr: string,
  timeStr: string,
  now: Date = todayInStoreTimezone(),
): {valid: true} | {valid: false; error: string} {
  if (!dateStr || !timeStr) {
    return {valid: false, error: 'Please choose a collection date and time.'};
  }

  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return {valid: false, error: 'Please choose a valid collection date.'};
  }

  const hours = WORKING_HOURS[date.getDay()];
  if (!hours) {
    return {
      valid: false,
      error: 'Collection is only available Monday to Friday.',
    };
  }

  const minDate = addWorkingDays(now, MIN_WORKING_DAYS_AHEAD);
  if (date.getTime() < minDate.getTime()) {
    return {
      valid: false,
      error: `Collection date must be at least ${MIN_WORKING_DAYS_AHEAD} working days from today (earliest: ${toDateInputValue(minDate)}).`,
    };
  }

  if (!/^\d{2}:\d{2}$/.test(timeStr) || timeStr < hours.min || timeStr > hours.max) {
    return {
      valid: false,
      error: `Collection time must be between ${hours.min} and ${hours.max} on this day.`,
    };
  }

  return {valid: true};
}
