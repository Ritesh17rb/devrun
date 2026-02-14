import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Script, PackageJson } from './types.js';

export function findPackageJson(startDir: string = process.cwd()): string | null {
  let currentDir = startDir;

  while (true) {
    const packageJsonPath = path.join(currentDir, 'package.json');

    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath;
    }

    const parentDir = path.dirname(currentDir);
    if (parentDir === currentDir) {
      return null;
    }

    currentDir = parentDir;
  }
}

export function getScripts(packageJsonPath: string): Script[] {
  try {
    const content = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson: PackageJson = JSON.parse(content);

    if (!packageJson.scripts) {
      return [];
    }

    return Object.entries(packageJson.scripts).map(([name, command]) => ({
      name,
      command
    }));
  } catch (error) {
    return [];
  }
}

export function formatScriptForDisplay(script: Script, maxNameLength: number): string {
  const paddedName = script.name.padEnd(maxNameLength + 2);
  return `${paddedName} ${script.command}`;
}
