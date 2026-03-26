# Firestore Schema

## Collection: `tasks`
```json
{
  "id": "docId",
  "userId": "demo-user",
  "title": "Finish chapter 3",
  "subject": "Physics",
  "deadline": "2026-04-10",
  "priority": "high",
  "completed": false,
  "createdAt": "ISO",
  "updatedAt": "ISO"
}
```

## Collection: `goals`
```json
{
  "id": "docId",
  "userId": "demo-user",
  "title": "Complete Calculus syllabus",
  "subject": "Math",
  "targetDays": 45,
  "startDate": "ISO",
  "completed": false,
  "progress": 25,
  "createdAt": "ISO",
  "updatedAt": "ISO"
}
```

## Collection: `sessions`
```json
{
  "id": "docId",
  "userId": "demo-user",
  "subject": "Chemistry",
  "mode": "pomodoro",
  "minutes": 25,
  "createdAt": "ISO"
}
```

## Retention
All repositories enforce one-year history by filtering records older than 365 days.
