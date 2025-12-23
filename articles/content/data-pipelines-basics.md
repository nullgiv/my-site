
# Data Pipeline Fundamentals

Data pipelines are the lifeblood of modern systems. In this article, we'll explore the main components.

## Core Components

1.  **Source**: The origin of the data.
2.  **Processing**: Transformation and reformatting.
3.  **Destination**: The final endpoint (e.g., a Data Warehouse).

```sql
SELECT * FROM raw_events WHERE status = 'active';
```

A crucial design principle is **Idempotency**.
