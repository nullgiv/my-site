
# TypeScript Best Practices

TypeScript is powerful, but using it incorrectly can complicate your code.

## 1. Avoid `any`

Using `any` defeats the purpose of TS. If you don't know the type, use `unknown` instead.

## 2. Use Union Types

Instead of enums, Union Types are often simpler and more lightweight.

```typescript
type Status = 'success' | 'error' | 'loading';
```

## 3. Utility Types

Use `Pick`, `Omit`, and `Partial` to avoid redefining interfaces.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

type UserPreview = Pick<User, 'id' | 'name'>;
```
