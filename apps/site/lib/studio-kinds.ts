export type StudioKind =
  | "browser"
  | "brain"
  | "database"
  | "server"
  | "phone";

export const studioKinds: StudioKind[] = [
  "browser",
  "brain",
  "database",
  "server",
  "phone",
];

export const studioPoster = (kind: StudioKind) => `/studio/${kind}.webp`;
