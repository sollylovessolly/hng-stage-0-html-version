Todo Card

A testable, accessible todo item card built with HTML, CSS and JavaScript for the Frontend Wizards task.

Project Structure
├── index.html   
├── style.css    
├── script.js    
└── README.md    
What Changed from Stage 0
Added full edit mode with form inputs for updating task details
Introduced status control system (Pending, In Progress, Done)
Implemented expand/collapse behavior for long descriptions
Added priority visual indicators (not just text)
Improved time tracking with more detailed and dynamic updates
Added overdue state handling
Synced logic between checkbox, status, and UI state
Improved overall visual feedback for different states
New Design Decisions
Edit Mode UI
Instead of inline editing, a dedicated form appears when editing
This keeps the display mode clean and structured
Status System
Replaced static badge behavior with an interactive control
Status is now the central source of truth, synced with checkbox
Priority Indicator
Added visual cues (color/icon/border) instead of relying only on text
Makes priority scannable at a glance
Collapsible Description
Long text is collapsed by default to avoid clutter
Users can expand only when needed
Time Logic
More human-readable time format (minutes, hours, days)
Stops updating when task is completed
Features
Toggle to mark a task as complete
Full edit functionality (title, description, priority, due date)
Status transitions (Pending, In Progress, Done)
Expand/collapse long descriptions
Live time tracking with granular updates
Overdue detection with visual feedback
Priority indicators with dynamic styling
Category tags
Delete functionality
Fully keyboard accessible
Accessibility Notes
All interactive elements are keyboard accessible
Expand/collapse toggle is operable via keyboard
Form inputs are properly labeled
Focus states are visible and consistent
Time updates use aria-live="polite" for screen readers
Semantic HTML is maintained throughout
Color usage is supported with visual indicators (not color alone)
Known Limitations
Edit mode focus trapping is not fully implemented (optional enhancement)
Data is not persisted (refresh resets state)
Time updates run on intervals and may not be perfectly precise
No backend integration yet (pure frontend state)
Behavioral Logic
1. Edit Mode
Clicking Edit opens the edit form
Save updates the task
Cancel restores previous values
Focus returns to Edit button after closing (if implemented)
2. Status Logic Rules
Checkbox checked → status becomes Done
Status set to Done → checkbox is checked
Unchecking after Done → status resets to Pending
UI stays synced across:
Checkbox
Status display
Status control
3. Visual State Changes
Done
Title is struck through
Colors are muted
High Priority
Strong visual indicator (color/icon/border)
Overdue
Red accent or badge
“Overdue” label shown
In Progress
Distinct visual style
Time Management Enhancements
Updates every 30–60 seconds
Displays:
“Due in 2 days”
“Due in 3 hours”
“Due in 45 minutes”
“Overdue by 1 hour”
When task is Done:
Stops updating
Displays “Completed”
Test IDs
Existing (Stage 0)
Element	data-testid
Card wrapper	test-todo-card
Title	test-todo-title
Description	test-todo-description
Complete toggle	test-todo-complete-toggle
Priority badge	test-todo-priority
Status display	test-todo-status
Tags container	test-todo-tags
Social tag	test-todo-tag-social
Fashion tag	test-todo-tag-fashion
Due date	test-todo-due-date
Time remaining	test-todo-time-remaining
Edit button	test-todo-edit-button
Delete button	test-todo-delete-button
New (Stage 1)
Edit Mode
Element	data-testid
Edit form container	test-todo-edit-form
Title input	test-todo-edit-title-input
Description input	test-todo-edit-description-input
Priority select	test-todo-edit-priority-select
Due date input	test-todo-edit-due-date-input
Save button	test-todo-save-button
Cancel button	test-todo-cancel-button
Status Controls
Element	data-testid
Status control	test-todo-status-control
Priority Indicator
Element	data-testid
Priority indicator	test-todo-priority-indicator
Expand / Collapse
Element	data-testid
Expand toggle	test-todo-expand-toggle
Collapsible section	test-todo-collapsible-section
Time Enhancements
Element	data-testid
Overdue indicator	test-todo-overdue-indicator
How to Run

No installation needed.

Open index.html in your browser.

Or run a local server:

npx serve .
python -m http.server
Built With
HTML
CSS
JavaScript
Google Fonts (Fredoka
