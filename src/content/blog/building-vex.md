---
title: "Building a Multi-Language Version Manager from Scratch"
description: "Why I got tired of nvm, rustup, pyenv all fighting over my home directory — and decided to build Vex."
publishDate: "2026-03-15T09:00:00"
tags: ["Rust", "DevTools", "Open Source"]
---

Sometime in late January, I was staring at my home directory and counting how many hidden folders belonged to version managers.

`~/.nvm`. `~/.cargo`. `~/.rustup`. `~/.sdkman`. `~/.pyenv`. `~/.goenv`.

Six tools. Six completely different interfaces. Six ecosystems that don't know each other exist.

Every new language means learning a new set of commands. Every project switch means manually toggling versions. My `.bashrc` was stuffed with `eval` and `export` statements, and I wasn't even sure which ones were still doing anything.

I have engineering OCD. This was driving me insane.

The problem isn't that any individual tool is bad. The problem is that they don't talk to each other.

Node versions belong to nvm. Rust versions belong to rustup. Java belongs to sdkman. Python belongs to pyenv. Go belongs to goenv. They don't know about each other, their files are scattered across your home directory, and the switching mechanisms are all different — some use shims, some use symlinks, some just mutate PATH directly.

I looked at existing unified solutions. asdf and mise come closest — they can manage multiple languages. But asdf uses shims, which means every command invocation goes through an intermediary that looks up the version first. Runtime overhead on every single call. mise is the same story. And their files still end up everywhere.

What I wanted was simple:

- One tool for all languages
- Symlink-based switching, no shims, zero overhead
- Everything in one directory, no home directory pollution
- Auto-switch when I `cd` into a project

Couldn't find it. So I built it.

I chose Rust because the core operation — creating and swapping symlinks — needs to be atomic. If it crashes halfway through a switch, you can't be left with a symlink pointing at nothing. Rust gives the low-level filesystem control I needed: atomic operations, concurrency safety, no GC pauses. And it compiles to a single binary with no runtime dependency.

A tool that manages tools shouldn't depend on any of the things it manages.

February 27th, v0.1.0 went up on GitHub. It could install Node, switch versions, and run. That was about it.

The next 24 hours I shipped 4 patches — v0.1.1 through v0.1.4. Because the distance between "it runs" and "it works" was bigger than I expected. Edge cases came crawling out: what if the path doesn't exist, what if permissions are wrong, what if the download cuts out halfway.

March 8th, v0.2.0. Started adding more languages — Go, Java, Rust. The biggest lesson from this phase: every additional language doesn't add complexity linearly, it adds it exponentially. Every language has different version numbering schemes, different download sources, different post-install directory structures.

March 9th, v1.0.0. I decided it was stable enough. Core features complete, error handling on all critical paths, security hardened — TOCTOU protection, ownership validation, path traversal guards. The gap between "it works" and "I'd let someone else use it" is entirely made of defensive programming.

After that, continued iteration. v1.1 through v1.4 was a rapid feature expansion phase — Python support, lockfiles, team config sync, project templates. v1.5 and v1.6 entered a maturation phase — npm global management, historical Rust version support, `vex doctor` health checks.

As of now: 6 weeks, 19 releases. 5 languages. Homebrew tap, GitHub Action, `.tool-versions` workflow.

My home directory has one folder: `~/.vex`.

All toolchains, caches, configs, symlinks — everything lives there. Clean. Controllable. One `rm -rf` to completely remove, no traces left.

That's what I wanted.

What this project taught me: pick a problem that genuinely bothers you. Not "this would be cool to build," but "this is annoying me every single day." Pain-driven projects don't need extra motivation, because the problem keeps reminding you why you started.

Ship early. v0.1.0 was rough, but it got me real feedback. Waiting for perfect means never shipping.

And security isn't a feature you bolt on at the end. I did TOCTOU protection and path traversal guards before v1.0 because a version manager touches the filesystem and PATH directly — if that's not secure, your entire development environment isn't secure.

Vex is open source: [github.com/imnotnoahhh/vex](https://github.com/imnotnoahhh/vex). Try it, open issues, contribute.
