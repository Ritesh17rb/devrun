# Contributing to devrun

Thank you for your interest in contributing to devrun! 🎉

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/devrun.git
cd devrun
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Link locally for testing:
```bash
npm link
```

5. Make changes and rebuild:
```bash
npm run dev  # Watch mode for development
```

## Project Structure

```
devrun/
├── src/
│   ├── cli.ts       # CLI entry point
│   ├── index.ts     # Core logic
│   └── types.ts     # TypeScript types
├── dist/            # Compiled JavaScript (generated)
└── package.json
```

## Feature Ideas

Want to contribute but not sure what to work on? Here are some ideas:

- [ ] Add support for running multiple scripts in parallel
- [ ] Show recently used scripts at the top
- [ ] Add `--help` and `--version` flags
- [ ] Support for monorepos (search multiple package.json files)
- [ ] Save script history and allow quick re-run
- [ ] Add colored output for better readability
- [ ] Support passing arguments to scripts (e.g., `dr -- --watch`)
- [ ] Add configuration file for customization

## Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

- Use TypeScript
- Follow existing code style
- Add types for all functions
- Keep it simple and fast

## Testing

Before submitting a PR:
1. Build the project: `npm run build`
2. Test the CLI locally: `dr` or `devrun`
3. Make sure it works in different projects

## Questions?

Open an issue and we'll be happy to help!
