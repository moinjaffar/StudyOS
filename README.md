# Academic Task Tracker

A lightweight app for tracking your day-to-day academic work:

- academic tasks
- lectures attended
- topics learned

## Features

- Add tasks with date, category, notes, and completion status.
- Mark tasks completed/not completed at any time.
- **Week-wise view** using ISO week picker.
- **Semester-wise view** (Semester 1 = Jan–Jun, Semester 2 = Jul–Dec).
- Built-in **dark mode / light mode** toggle with saved preference.
- **Backup tools** to export/import task data as JSON.
- Local browser storage with **one-year retention** (older items are auto-pruned).

## Run

Open `index.html` directly in your browser.

For local server (optional):

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/academic-task-tracker/`.
