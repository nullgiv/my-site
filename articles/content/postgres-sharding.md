
---
title: Sharding Strategies in PostgreSQL
date: 2025-09-30
description: A practical guide to scaling relational databases to petabyte-scale using Citus and native sharding.
---

# Sharding Strategies in PostgreSQL

When your database grows beyond a few terabytes, a single node is no longer sufficient. This is where **Sharding** (partitioning data) comes in. But how do we do it in Postgres?

## What is Sharding?

Sharding is the horizontal partitioning of data from a table across multiple physical servers. Each server holds only a subset of the data.

## Method 1: Application-Level Sharding

The simplest (and sometimes most painful) method. Your application decides where the data goes.
```python
shard_id = user_id % 4
db_conn = connections[shard_id]
```
**Cons**: Application code complexity, loss of ACID transactions across shards, difficult joins.

## Method 2: Native Partitioning + FDW

Postgres has Table Partitioning capabilities. By combining it with **Foreign Data Wrappers (postgres_fdw)**, partitions can be placed on other servers. This method is standard but management is manual and difficult.

## Method 3: Citus (Recommended for 2025)

The **Citus** extension (now part of Microsoft Azure but fully open-source) turns Postgres into a distributed database.

With Citus, you divide tables into two categories:
1.  **Distributed Tables**: Large tables (like Events, Orders) that are sharded based on a `Distribution Column` (e.g., `tenant_id`).
2.  **Reference Tables**: Small tables (like Countries, Roles) that are copied to all nodes for fast joins.

```sql
SELECT create_distributed_table('orders', 'company_id');
```

Citus automatically rewrites your SQL queries, parallelizes them, and runs them on the various nodes.

## Choosing a Shard Key

The most important decision in sharding is choosing the distribution key.
*   If your system is **Multi-tenant** (like a SaaS), the best key is `tenant_id` or `company_id`. This ensures all of a customer's data is on one node (Co-location), making joins very fast.
*   If it's a B2C system, `user_id` is usually a good option.

## Challenges

*   **Rebalancing**: When a node gets full, moving shards to a new node is complex (Citus has a Shard Rebalancer tool).
*   **Unique Constraints**: Ensuring global uniqueness (e.g., a unique email across the entire system) is costly in a sharded architecture.

Sharding significantly increases operational complexity. The golden rule: **Don't shard until you have to.**
