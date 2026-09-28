export type StudioKind = "browser" | "robot" | "database" | "server" | "phone";

export const studioKinds: StudioKind[] = [
  "browser",
  "robot",
  "database",
  "server",
  "phone",
];

export const studioPoster = (kind: StudioKind) => `/studio/${kind}.webp`;
