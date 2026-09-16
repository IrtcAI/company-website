export function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().replace(/[\u0000-\u001F\u007F]/g, " ").slice(0, max) : "";
}

export function email(value: unknown) {
  const candidate = text(value, 160);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : "";
}

export function clientAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}
