type PageDates = Record<string, { hash: string }>;

export declare const SITE_URL: string;
export declare const INDEXNOW_KEY: string;
export declare const ENDPOINT: string;
export declare function changedPaths(
  before: PageDates,
  after: PageDates,
): string[];
export declare function payload(paths: string[]): {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
};
