/**
 * Indian Date & Time Utilities
 * Handles parsing, conversion, and formatting for Indian Standard Time (IST),
 * 12-hour AM/PM formats, and DD/MM/YYYY date presentations.
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Parses any time representation (24-hour "23:59:59", "17:00", or 12-hour "11:59 PM")
 * into standard 12-hour components: { hour: '11', minute: '59', period: 'PM' }.
 */
export function parseTo12Hour(timeStr) {
  if (!timeStr) {
    return { hour: '11', minute: '59', period: 'PM' };
  }

  const clean = String(timeStr).trim();

  // 1. Matches 12-hour format e.g. "11:59 PM", "05:00 am", "11:59:59 PM (IST)"
  const match12 = clean.match(/(\d{1,2})\s*:\s*(\d{2})(?::\d{2})?\s*(AM|PM)/i);
  if (match12) {
    let h = parseInt(match12[1], 10);
    const m = match12[2];
    const p = match12[3].toUpperCase();
    if (h === 0) h = 12;
    if (h > 12) h = h % 12 || 12;
    return {
      hour: String(h).padStart(2, '0'),
      minute: m,
      period: p
    };
  }

  // 2. Matches 24-hour format e.g. "23:59:59", "23:59", "09:30"
  const match24 = clean.match(/^(\d{1,2})\s*:\s*(\d{2})/);
  if (match24) {
    let h = parseInt(match24[1], 10);
    const m = match24[2];
    const period = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    if (h === 0) h = 12;
    return {
      hour: String(h).padStart(2, '0'),
      minute: m,
      period: period
    };
  }

  return { hour: '11', minute: '59', period: 'PM' };
}

/**
 * Formats time into Indian style (12-hour format with AM/PM and optional IST label).
 * Example: "23:59:59" -> "11:59 PM" (or "11:59 PM (IST)")
 */
export function formatIndianTime(timeStr, includeIST = false) {
  if (!timeStr) return '';
  const { hour, minute, period } = parseTo12Hour(timeStr);
  const base = `${hour}:${minute} ${period}`;
  return includeIST ? `${base} (IST)` : base;
}

/**
 * Formats date into Indian numerical style DD/MM/YYYY.
 * Example: "2026-03-31" -> "31/03/2026"
 */
export function formatIndianDate(dateStr) {
  if (!dateStr) return '';
  const clean = String(dateStr).trim();
  const match = clean.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [, yyyy, mm, dd] = match;
    return `${dd}/${mm}/${yyyy}`;
  }
  return clean;
}

/**
 * Formats date into Indian readable long format "DD Month YYYY".
 * Example: "2026-03-31" -> "31 March 2026"
 */
export function formatIndianDateLong(dateStr) {
  if (!dateStr) return '';
  const clean = String(dateStr).trim();
  const match = clean.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [, yyyy, mm, dd] = match;
    const mIndex = parseInt(mm, 10) - 1;
    const month = MONTH_NAMES[mIndex] || mm;
    return `${parseInt(dd, 10)} ${month} ${yyyy}`;
  }
  return clean;
}

/**
 * Full Indian date and time display string.
 * Example: "31/03/2026 at 11:59 PM (IST)"
 */
export function formatIndianDateTime(dateStr, timeStr, includeIST = true) {
  const dateFormatted = formatIndianDate(dateStr);
  const timeFormatted = formatIndianTime(timeStr, includeIST);
  if (dateFormatted && timeFormatted) {
    return `${dateFormatted} at ${timeFormatted}`;
  }
  return dateFormatted || timeFormatted || '';
}
