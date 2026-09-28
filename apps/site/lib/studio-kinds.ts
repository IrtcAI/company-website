export type StudioKind = "code" | "database" | "server" | "phone";

export const studioKinds: StudioKind[] = ["code", "database", "server", "phone"];

export const studioPoster = (kind: StudioKind) => `/studio/${kind}.webp`;
