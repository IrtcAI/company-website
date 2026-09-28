export type StudioKind =
  | "browser"
  | "chip"
  | "database"
  | "server"
  | "phone";

export const studioKinds: StudioKind[] = [
  "browser",
  "chip",
  "database",
  "server",
  "phone",
];

export const studioPoster = (kind: StudioKind) => `/studio/${kind}.webp`;
