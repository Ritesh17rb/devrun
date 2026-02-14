export interface Script {
  name: string;
  command: string;
}

export interface PackageJson {
  scripts?: Record<string, string>;
}
