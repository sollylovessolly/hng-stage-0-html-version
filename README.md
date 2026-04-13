# Todo Card

A testable, accessible todo item card built with HTML, CSS and JavaScript for the Frontend Wizards Stage 0 task.

---

## Project Structure

```
├── index.html   
├── style.css    
├── script.js    
└── README.md    
```

---

## Features

- Toggle to mark a task as complete — the title strikes through and the status updates to "Done"
- Live time remaining countdown that updates every 60 seconds
- Priority and status badges
- Category tags
- Edit and Delete buttons
- Fully keyboard navigable and screen-reader accessible

---

## Accessibility

- Checkbox has a visible label and is keyboard focusable
- All buttons have accessible names
- Time remaining is wrapped in `aria-live="polite"` so screen readers pick up updates
- Focus styles are visible
- Color contrast meets WCAG AA
- Semantic HTML throughout — `<article>`, `<time>`, `<label>`, `<button>`, `<ul>`

---

## How to run it

No installation needed. Just make sure all three files are in the same folder and open `index.html` in a browser.

Or with a local server:

```bash
npx serve .
```

```bash
python -m http.server
```

---

## Test IDs

| Element | data-testid |
|---|---|
| Card wrapper | `test-todo-card` |
| Title | `test-todo-title` |
| Description | `test-todo-description` |
| Complete toggle | `test-todo-complete-toggle` |
| Priority badge | `test-todo-priority` |
| Status badge | `test-todo-status` |
| Tags container | `test-todo-tags` |
| Social tag | `test-todo-tag-social` |
| Fashion tag | `test-todo-tag-fashion` |
| Due date | `test-todo-due-date` |
| Time remaining | `test-todo-time-remaining` |
| Edit button | `test-todo-edit-button` |
| Delete button | `test-todo-delete-button` |

---

## Built with

- HTML, CSS, JavaScript
- Google Fonts (Fredoka)
