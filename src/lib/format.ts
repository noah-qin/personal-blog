// publishDate is a date-only string, which parses as UTC midnight.
const longDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export function formatLongDate(date: string) {
  return longDate.format(new Date(date));
}

export function formatShortDate(date: string) {
  return shortDate.format(new Date(date));
}
