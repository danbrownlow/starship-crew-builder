export function parseLimit(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
