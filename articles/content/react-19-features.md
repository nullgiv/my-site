
# What's New in React 19

React 19 introduces exciting changes that simplify frontend development.

## The React Compiler

No more manual `useMemo`! The new compiler automatically detects dependencies.

## Server Actions

Now you can call server functions directly in client components.

```jsx
<form action={createPost}>
  <input name="title" />
  <button type="submit">Submit</button>
</form>
```
