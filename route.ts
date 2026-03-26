import { NextResponse } from "next/server";
import { createTask, getTasks } from "@/lib/repositories";

export async function GET() {
  const tasks = await getTasks();
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  const body = await request.json();
  const created = await createTask({
    title: body.title,
    subject: body.subject,
    deadline: body.deadline,
    priority: body.priority,
    completed: Boolean(body.completed)
  });
  return NextResponse.json({ task: created }, { status: 201 });
}
