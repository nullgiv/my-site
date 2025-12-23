
# CSS Grid vs. Flexbox

A common question for frontend developers: when to use Grid and when to use Flexbox?

## Flexbox: One-Dimensional

Flexbox is designed for layouts in **one direction** (either a row or a column). It's perfect for aligning items in a navigation bar, a list, or a card.

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

## Grid: Two-Dimensional

Grid is for **two-dimensional** layouts (both rows and columns). It's the best choice for the overall page structure.

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
```

## General Rule
*   Small component-level content: **Flexbox**
*   Main page structure: **Grid**
