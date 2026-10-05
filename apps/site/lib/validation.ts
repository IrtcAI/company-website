const controls = /[\u0000-\u001F\u007F-\u009F]/g;
const invisible =
  /[\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5\u180B-\u180F\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFFB]|\uDB40[\uDC00-\uDDEF]/g;

export function text(value: unknown, max: number) {
  if (typeof value !== "string") return "";

  const normalized = value
    .normalize("NFKC")
    .replace(controls, " ")
    .replace(invisible, "")
    .replace(/\s+/g, " ")
    .trim();

  return Array.from(normalized).slice(0, max).join("").trim();
}

export function email(value: unknown) {
  const candidate = text(value, 160);
  return /^[^\s@,;:<>()[\]\\"']+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(
    candidate,
  )
    ? candidate
    : "";
}

export function clientAddress(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export const undecidedTopic = "undecided";
