export type StudioKind = "browser" | "database" | "server" | "phone";

export const studioKinds: StudioKind[] = [
  "browser",
  "database",
  "server",
  "phone",
];

export const studioPoster = (kind: StudioKind) => `/studio/${kind}.webp`;

export const studioPosterSet = (kind: StudioKind) =>
  `/studio/${kind}-320.webp 320w, ${studioPoster(kind)} 480w`;
