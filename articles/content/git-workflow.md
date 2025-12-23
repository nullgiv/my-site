
# The Git Flow Workflow

Managing source code in large teams requires discipline. Git Flow is one of the most popular strategies.

## Main Branches

1.  **main/master**: Production code. Always stable.
2.  **develop**: Code under development. New features are merged here.

## Temporary Branches

*   **feature/**: For developing new features. Branched from `develop`.
*   **release/**: For preparing a new release.
*   **hotfix/**: For fixing urgent bugs on production.

```bash
git checkout -b feature/login-page develop
```
