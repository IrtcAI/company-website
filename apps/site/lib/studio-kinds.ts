export type StudioKind = "laptop" | "database" | "server" | "phone";

export const studioKinds: StudioKind[] = ["laptop", "database", "server", "phone"];

export const studioPoster = (kind: StudioKind) => `/studio/${kind}.webp`;
