
---
title: A Deep Dive into React Server Components
date: 2025-10-28
description: A look at the internal RSC protocol, how components are serialized, and its impact on frontend architecture.
---

# A Deep Dive into React Server Components

**React Server Components (RSC)** technology is the biggest architectural shift in the React ecosystem since the introduction of Hooks. But what's really happening under the hood?

## The Problem: Waterfalls

In the traditional client-side fetching approach, the parent component renders, fetches data, then the child renders and fetches its data. This creates a request waterfall, slowing down the application.

RSC solves this by moving data-driven components to the server.

## The Wire Protocol

When you request an RSC page, the server doesn't return HTML (except on the initial SSR render). It streams a special text format that looks like JSON but has more capabilities.

A simplified example of the protocol:

```
M1:{"id":"./src/ClientCounter.js","chunks":["client-counter"],"name":"default"}
J0:["$","div",null,{"children":[["$","h1",null,{"children":"Hello Server"}],["$","$L1",null,{}]]}]
```

*   **M**: A reference to client-side modules.
*   **J**: The serialized server component tree.

React in the browser reads this stream and intelligently updates the DOM tree without losing the state of client components.

## Serialization

One of the main limitations of RSC is that props passed from the server to the client must be **Serializable**.
*   ✅ String, Number, JSON
*   ❌ Functions, Classes

This means you can't pass an `onClick` function from the server to the client, as functions are not transferable over the network.

## Interleaving Server and Client

RSC allows you to create interleaved trees. The server can import a client component, and a client component can host a server component (as children). This is known as the "Donuts" pattern.

## The Result

RSC drastically reduces the size of JavaScript bundles. Heavy libraries for date formatting or Markdown that are only used on the server are never sent to the user's browser. This means **Zero-Bundle-Size** for server components.
