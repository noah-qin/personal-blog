---
title: "Corta"
description: "A fast, focused terminal made for Mac. Built in Swift, with Metal 4 rendering, native CJK input, and a dependency-free terminal core."
publishDate: "2026-09-04"
url: "/projects/corta/"
tags: ["macOS", "Swift", "DevTools", "Open Source"]
projectType: "other"
stats: "15 Releases"
github: "https://github.com/noah-qin/Corta"
---

# Corta

**Corta** is a native macOS terminal built in Swift. It is made for people who live in the terminal: crisp text, native input, and remote workflows that feel like part of the Mac rather than something bolted on.

## Why I Built This

I spend most of my day in a terminal, and I type in both English and Chinese. Many terminals treat CJK input and IME composition as an afterthought, and many treat macOS as just another platform to support. I wanted a terminal that goes _through_ AppKit instead of around it, and that is fast enough to prove it with numbers.

## Technical Highlights

- **Metal 4 rendering** with Core Text font fallback
- **Native Mac input**: CJK input and IME composition, VoiceOver, Secure Keyboard Entry, Services, Quick Terminal, and Shortcuts actions
- **Measured performance**: 2.3× the core throughput of v1.1, a frame less of full-screen input latency, and 11 MiB instead of 185 MiB for 100,000 lines of history, each figure published with its method and its gaps
- **Zero-dependency terminal core** written in Swift, with resource limits for untrusted output and a sandboxed image decoder
- **Security by omission**: clipboard reads and title queries are deliberately not supported

## Features

- Split panes, scrollback search, and a command palette
- True colour, OSC 8 links, and the Kitty keyboard and graphics protocols
- Shell integration for zsh, bash, and fish, plus restored layouts
- System OpenSSH with your `~/.ssh/config`
- A Finder-like SFTP browser with drag and drop
- Remote files opened in your local editor, with a conflict check before upload
- One settings store shared by the Settings window and `~/.config/corta/config`
- Developer ID-signed, notarised releases with in-app updates

## Development Timeline

| Date   | Version | Milestone                              |
| ------ | ------- | -------------------------------------- |
| Sep 1  | —       | First commit                           |
| Sep 4  | v0.1.0  | First release                          |
| Oct 19 | v1.2.3  | Latest release, 15 releases in 7 weeks |

Corta requires macOS 26 on Apple silicon. Downloads are on [GitHub Releases](https://github.com/noah-qin/Corta/releases/latest).
