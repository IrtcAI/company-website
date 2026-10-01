export type StudioKind = "browser" | "database" | "server" | "phone";

export const studioKinds: StudioKind[] = [
  "browser",
  "database",
  "server",
  "phone",
];

export const studioPoster = (kind: StudioKind) => `/studio/${kind}.webp`;
