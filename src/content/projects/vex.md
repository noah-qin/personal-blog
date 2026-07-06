---
title: "Vex"
description: "A fast, multi-language version manager for macOS. Symlink-based switching, zero shim overhead, everything under ~/.vex."
publishDate: "2026-02-27"
tags: ["Rust", "DevTools", "Open Source", "CLI"]
type: "other"
stats: "19 Releases"
github: "https://github.com/noah-qin/vex"
---

# Vex

**Vex** is a multi-language version manager for macOS, built in Rust. It manages Node.js, Go, Java, Rust, and Python from a single tool, using symlinks instead of shims for instant, zero-overhead version switching.

## Why I Built This

Every language has its own version manager — nvm, rustup, sdkman, pyenv, goenv. They each scatter files across your home directory, use different switching mechanisms, and don't know about each other. I wanted one tool that keeps everything clean under a single `~/.vex` directory.

## Technical Highlights

*   **Symlink-based switching** — no shim overhead, version changes are instant
*   **Atomic operations** — TOCTOU protection ensures symlink swaps can't leave broken state
*   **Parallel downloads** — up to 3 concurrent downloads with atomic writes
*   **Checksum verification** — SHA256 verification for Node.js, upstream metadata for others
*   **Concurrent install protection** — file-based locking prevents parallel install corruption
*   **Security hardening** — ownership validation, path traversal protection

## Features

*   5 languages: Node.js, Go, Java (Eclipse Temurin), Rust, Python
*   `.tool-versions` support with auto-switch on `cd`
*   Fuzzy version matching (`node@20` → latest 20.x)
*   Lockfile support for reproducible environments
*   Team config sync from HTTPS URLs or Git repos
*   Project templates (`vex init --template rust-cli`)
*   TUI dashboard (`vex tui`)
*   Python venv integration
*   Self-update (`vex self-update`)
*   Official GitHub Action (`uses: noah-qin/vex@v1`)
*   Homebrew tap (`brew install noah-qin/homebrew-vex/vex`)

## Development Timeline

| Date | Version | Milestone |
|------|---------|-----------|
| Feb 27 | v0.1.0 | First release — Node.js support |
| Feb 28 | v0.1.1–0.1.4 | Rapid bug fixes (4 patches in 24 hours) |
| Mar 8 | v0.2.0 | Multi-language support (Go, Java, Rust) |
| Mar 9 | v1.0.0 | Stable release with security hardening |
| Mar 11–16 | v1.1–v1.4 | Python, lockfiles, team sync, templates |
| Mar 30 | v1.5.0 | Feature expansion |
| Apr 4–8 | v1.6.0–v1.6.1 | npm global management, Rust historical versions |

*Read the full story in my [blog post](/blog/building-vex).*

## Architecture

```
~/.vex/
├── bin/            # Symlinks (on PATH)
├── toolchains/     # Installed versions
├── current/        # Active version symlinks
├── cache/          # Download + version cache
├── locks/          # Concurrent install protection
└── config.toml     # User configuration
```

Built with Rust. Single binary, no runtime dependencies.
