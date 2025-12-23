
---
title: Clean Architecture in 2025 A Pragmatic Approach
date: 2025-10-10
description: Is Clean Architecture still the answer? A critique and review of modern approaches like Vertical Slice Architecture.
---

# Clean Architecture in 2025: A Pragmatic Approach

Robert Martin's (Uncle Bob) "Clean Architecture" has been our guide for years: strict layering, separation of domain from infrastructure, and Dependency Injection. But in 2025, should we still adhere to it so rigidly?

## Critique of Layered Architecture

In traditional Clean Architecture, we have horizontal layers:
1.  Presentation
2.  Domain
3.  Data

The problem is that every new feature (e.g., "Create Order") has to be modified across all these layers. This causes the code for a single feature to be scattered throughout the project.

## The Rise of Vertical Slice Architecture

A more modern approach, popular in the .NET world and now in Node.js/Go, is the **Vertical Slice**. In this approach, we organize code by **Features**, not by technical layers.

```
/features
  /create-order
    - handler.ts
    - command.ts
    - repository.ts
    - db-schema.ts
  /get-order
    - handler.ts
    - query.ts
```

Each slice can have its own internal architecture. A simple slice might directly run a SQL query, while a complex slice might use a full Domain Model.

## The YAGNI Principle and Pragmatism

In 2025, we've learned that **Abstractions Cost**. Every layer of abstraction you add increases mental overhead.
*   Do you really need to hide the database behind 5 layers of Repositories and Interfaces when you know you'll never migrate from Postgres?
*   Are repetitive DTOs that just copy fields worth maintaining?

## The Recommended 2025 Approach

1.  **Screaming Architecture**: The project structure should scream what the system does (e.g., Orders, Users), not what framework it uses (e.g., Controllers, Models).
2.  **Use Cases as First-Class Citizens**: Business logic should be centralized in Use Cases or Command Handlers.
3.  **Loose Coupling, High Cohesion**: Vertical slices adhere to this principle better than horizontal layers.

Clean Architecture isn't dead, but it has moved from a dogmatic state towards pragmatism.
