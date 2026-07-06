---
title: "The Database Booth I Remembered at an AI Summit"
description: "At AWS Summit China 2026, a Snowflake demo changed how I think about multimodal customer data and production AI."
publishDate: "2026-06-23T18:00:00"
tags: ["AI", "Cloud", "Data", "Event"]
image: "/images/aws-summit-china-entrance.jpg"
---

On June 23, I attended the first day of **AWS Summit China 2026** at the Shanghai World Expo Center.

![The entrance to AWS Summit China 2026](/images/aws-summit-china-entrance.jpg)

The theme was impossible to miss: **Agentic Now, Go Build**. Across the expo floor, companies were demonstrating agents, models, platforms, infrastructure, and the systems required to move AI from an experiment into production.

![My AWS Summit China attendee badge](/images/aws-summit-china-badge.jpg)

I expected the most memorable technology to be a model. Instead, it was Snowflake.

## Customer Data Is Not One Data Type

At the Snowflake booth, a member of the team explained an AI customer-service analytics workflow. The problem sounded simple at first: understand what customers are saying and use that information to improve support.

But customer-service data is rarely simple.

A support interaction might be a phone call. It might be a chat message, a written ticket, or an image sent to show what went wrong. Each format contains part of the customer's experience, but those parts are often stored and processed separately.

The Snowflake demonstration showed how voice, images, and text could be handled within one multimodal data workflow. Calls could be transcribed, visual and textual information could be extracted and classified, and the results could be analyzed alongside existing customer data.

What impressed me was not merely that AI could understand several media formats. It was that these formats could become part of the same analytical system.

![The crowded Agentic AI expo floor](/images/aws-summit-china-expo-floor.jpg)

## The Model Only Sees the Context We Build

This changed the way I thought about the phrase "AI customer service."

It is easy to imagine the visible layer: a chatbot answering questions or an agent producing a summary. But the quality of that answer depends on everything underneath it. If call recordings live in one system, screenshots in another, and ticket history somewhere else, the model receives only a fragment of the customer.

The bottleneck is not always model intelligence. Sometimes it is whether the product has assembled complete, reliable context in the first place.

That is a less dramatic problem than announcing a new model, but it may be the more important engineering problem. A powerful agent working with incomplete data can still reach a weak conclusion—only faster and with more confidence.

## From Demo to Production

The rest of the summit reinforced the same point. The expo was organized around more than models: there were sections for data and knowledge, agent platforms, business applications, infrastructure, security, and observability.

![AWS Summit China at the Shanghai World Expo Center](/images/aws-summit-china-venue.jpg)

Together, they represented the difference between an AI demo and an AI product. A demo needs to work once. A product needs to work repeatedly, on real data, for real users, while remaining understandable and dependable.

As I build products for [Cobay](/projects/cobay), that distinction is useful. Before adding an agent or another AI feature, I need to ask more basic questions: What information does the product create? Where does it live? How is it connected? What context would an intelligent system actually need to be helpful?

![The main expo installation at AWS Summit China](/images/aws-summit-china-expo.jpg)

I walked into AWS Summit thinking about models. I left thinking about data.

An AI system can only reason over the context it is given—and building that context may be the more important part of the work.
