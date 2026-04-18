---
title: "The Illusion of Certainty"
description: "After heavy use of AI coding assistants during development, I went digging into why they fail — and what I found changed how I work with them."
publishDate: "2026-03-10T14:00:00"
tags: ["AI", "Opinion", "Programming"]
---

For the past few weeks I've been using AI coding assistants pretty heavily while building a project. And honestly — they're impressive. Scaffolding, boilerplate, sometimes even elegant solutions I wouldn't have thought of myself.

But they also get things wrong in ways that are hard to catch.

A function that looks correct but has an off-by-one error buried inside it. A script that runs fine on the happy path but silently breaks on edge cases. A confident suggestion that points you in a completely wrong direction. I've hit all of these, more than once.

There's a narrative online that AI assistants can replace engineering ability. They can't. And the reason isn't that the technology "isn't there yet." The reason is more fundamental than that.

I got curious and started reading about how large language models actually work. Not the marketing copy — the math. What I found is this: an LLM is, at its core, a next-token predictor. It doesn't execute logic. It doesn't verify correctness. It produces the output that is statistically most likely to follow the input. That's it.

This isn't a flaw. It's the architecture.

When an AI assistant generates working code, it's because the correct answer happens to be the highest-probability token sequence. When it generates subtly buggy code, it's because a wrong-but-plausible sequence is also high-probability. There's no reasoning step in between, no "wait, that's not right" moment. The model doesn't know what it doesn't know.

The current trend is to throw more structure at this problem — longer prompts, more `.md` files, multi-agent orchestration, MCP servers, tool-calling frameworks. The idea is that if you constrain the model enough, it'll behave deterministically.

But stacking probabilistic systems doesn't produce determinism. Running three next-token predictors in sequence doesn't give you a logic engine. It gives you three layers of probability where errors compound rather than cancel out.

You can't build a solid house out of unreliable bricks. No matter how many you stack.

So what's the right approach? I don't think the answer is to stop using AI. And I don't think the answer is to pretend it's something it's not.

My approach is: don't let AI replace your thinking.

A lot of people's workflow is to throw an entire requirement at the AI and wait for it to produce a complete solution. It's tempting, but it's dangerous. Because you're skipping the most important step — your own understanding. If you haven't thought through how the problem should be solved, you have no ability to judge whether the AI's solution is right or wrong. You think you're using a tool. You're actually blindly following a probability generator.

What I do instead is break the work into small pieces. The repetitive, mechanical parts go to the AI — scaffolding, boilerplate, generating test cases. Then I review each piece. Core logic, architectural decisions, edge case handling — those I think through and write myself. Because when those parts are wrong, the AI won't tell you they're wrong. It'll confidently keep being wrong.

At the end of the day, AI is a very powerful tool. But a tool shouldn't replace your judgment.

You should be the one thinking. AI should be the one helping you move faster. The order can't be reversed.
