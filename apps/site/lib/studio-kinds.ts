export type StudioKind =
  | "browser"
  | "network"
  | "database"
  | "server"
  | "phone";

export const studioKinds: StudioKind[] = [
  "browser",
  "network",
  "database",
  "server",
  "phone",
];

export const studioPoster = (kind: StudioKind) => `/studio/${kind}.webp`;
