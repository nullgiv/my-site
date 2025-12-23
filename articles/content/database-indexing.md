
# The Art of Database Indexing

Proper indexing is one of the most critical skills for a software engineer working with large datasets.

## B-Tree Index

The most common index type in relational databases like PostgreSQL and MySQL. It's excellent for range queries (`<`, `>`, `=`).

## Hash Index

Only useful for equality checks (`=`), but it's much faster than a B-Tree for that purpose.

```sql
CREATE INDEX idx_user_email ON users (email);
```

## When Not to Index
*   On columns with low cardinality (e.g., gender: male/female).
*   On small tables where a full scan is faster.
