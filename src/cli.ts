#!/usr/bin/env node

import prompts from 'prompts';
import fuzzysort from 'fuzzysort';
import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findPackageJson, getScripts, formatScriptForDisplay } from './index.js';
import type { Script } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getVersion(): string {
  try {
    const pkgPath = path.join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    return pkg.version || '0.0.0';
  } catch {
    return '0.0.0';
  }
}

function showHelp() {
  console.log(chalk.bold.cyan('\ndevrun') + chalk.dim(' - Interactive npm script runner\n'));
  console.log('Usage:');
  console.log('  ' + chalk.cyan('devrun') + ' or ' + chalk.cyan('dr') + '       Run in interactive mode');
  console.log('  ' + chalk.cyan('devrun --help') + '       Show this help message');
  console.log('  ' + chalk.cyan('devrun --version') + '    Show version number\n');
  console.log('Examples:');
  console.log('  ' + chalk.dim('$ devrun'));
  console.log('  ' + chalk.dim('$ dr\n'));
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  if (args.includes('--version') || args.includes('-v')) {
    console.log(getVersion());
    process.exit(0);
  }

  const packageJsonPath = findPackageJson();

  if (!packageJsonPath) {
    console.error(chalk.red('✗ No package.json found in current directory or parents'));
    process.exit(1);
  }

  const scripts = getScripts(packageJsonPath);

  if (scripts.length === 0) {
    console.error(chalk.yellow('⚠ No scripts found in package.json'));
    process.exit(1);
  }

  const maxNameLength = Math.max(...scripts.map(s => s.name.length));

  const choices = scripts.map(script => ({
    title: chalk.cyan(script.name.padEnd(maxNameLength + 2)) + chalk.dim(script.command),
    value: script.name,
    script
  }));

  const response = await prompts({
    type: 'autocomplete',
    name: 'scriptName',
    message: 'Select a script to run:',
    choices,
    suggest: async (input, choices) => {
      if (!input) return choices;

      const results = fuzzysort.go(input, choices, {
        key: 'value',
        limit: 10,
        threshold: -10000
      });

      return results.map(result => result.obj);
    }
  });

  if (!response.scriptName) {
    console.log(chalk.dim('Cancelled'));
    process.exit(0);
  }

  const selectedScript = scripts.find(s => s.name === response.scriptName);

  if (!selectedScript) {
    console.error(chalk.red('✗ Script not found'));
    process.exit(1);
  }

  console.log(chalk.dim(`\n> ${selectedScript.command}\n`));

  try {
    await execa('npm', ['run', selectedScript.name], {
      stdio: 'inherit',
      cwd: process.cwd()
    });
  } catch (error: any) {
    if (error.exitCode) {
      process.exit(error.exitCode);
    }
    throw error;
  }
}

main().catch(error => {
  console.error(chalk.red('Error:'), error.message);
  process.exit(1);
});
