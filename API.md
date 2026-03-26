# API Structure

## Tasks
- `GET /api/tasks`
- `POST /api/tasks`
  - body: `{ title, subject, deadline, priority, completed }`

## Goals
- `GET /api/goals`
- `POST /api/goals`
  - body: `{ title, subject, targetDays, startDate, completed, progress }`

## Sessions
- `GET /api/sessions`
- `POST /api/sessions`
  - body: `{ subject, mode, minutes }`

## AI
- `GET /api/ai/insights`
  - returns dashboard summary + generated improvement suggestions
- `POST /api/ai/assistant`
  - body: `{ question }`
  - returns contextual assistant reply
