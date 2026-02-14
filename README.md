# devrun 🚀

A blazingly fast interactive npm script runner with fuzzy search.

## Why devrun?

Tired of typing `npm run` repeatedly? Can't remember your script names? **devrun** makes running npm scripts a breeze with:

✨ **Interactive fuzzy search** - Type to filter scripts instantly
⚡ **Lightning fast** - No config, zero overhead
📋 **Command preview** - See what you're about to run
🎯 **Smart filtering** - Fuzzy matching finds what you mean
🔥 **Two commands**: `devrun` or `dr` (shorter!)

## 🎬 Demo

### The Old Way 😴
```bash
$ npm run
# Scroll through scripts...
# Try to remember the name...
# Type the full command...
$ npm run dev:server:watch
```

### The devrun Way 😎
```bash
$ dr

? Select a script to run: ›
❯ dev              tsc --watch
  build            tsc
  test             echo "Running tests..."
  lint             eslint src/

# Type 'te' to filter:
? Select a script to run: › te
❯ test             echo "Running tests..."

# Press Enter:
✔ Selected: test
> echo "Running tests..."
Running tests... ✅
```

**That's it!** No memorization, no typing long commands, just fuzzy search and go.

## Installation

```bash
npm install -g devrun
```

Or use with npx (no installation needed):

```bash
npx devrun
```

## Usage

In any project with a `package.json`, just run:

```bash
devrun
# or the shorter version
dr
```

You'll get an interactive list of all available scripts. Start typing to filter, use arrow keys to select, and hit Enter to run!

### Example

```bash
$ dr
? Select a script to run: ›
❯ build        tsc && vite build
  dev          vite --port 3000
  test         vitest run
  test:watch   vitest
  lint         eslint src/
  format       prettier --write src/
```

Type "te" and it instantly filters to test scripts. Press Enter to run it!

## Features

- 🔍 **Fuzzy search** - Type any part of the script name
- 🎨 **Syntax highlighting** - Easy-to-read output
- 📂 **Smart discovery** - Automatically finds package.json in current or parent directories
- ⌨️ **Keyboard navigation** - Intuitive and fast
- 🚫 **No configuration** - Just works out of the box

## Why not just use npm run?

```bash
# Traditional way 😴
npm run dev
# Wait, what was it called? Let me check...
npm run
# Scroll through the list...
npm run start:dev

# With devrun 😎
dr
# Type 'dev', press Enter. Done!
```

## Comparison

| Feature | devrun | npm run | |
|---------|--------|---------|---|
| Interactive selection | ✅ | ❌ | |
| Fuzzy search | ✅ | ❌ | |
| Command preview | ✅ | ❌ | |
| Zero config | ✅ | ✅ | |
| Speed | ⚡ Fast | 🐌 Slow | |

## Contributing

Found a bug or have a feature request? Open an issue on [GitHub](https://github.com/yourusername/devrun)!

## License

MIT

---

Made with ❤️ for developers who hate typing `npm run`
