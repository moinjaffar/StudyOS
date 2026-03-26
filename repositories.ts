import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FocusSession, Goal, Task } from "@/lib/types";
import { isWithinOneYear, nowISO } from "@/lib/utils";

const userId = "demo-user";

export async function getTasks() {
  const snap = await getDocs(query(collection(db, "tasks"), where("userId", "==", userId)));
  return snap.docs.map((d) => ({ ...(d.data() as Task), id: d.id })).filter((t) => isWithinOneYear(t.createdAt));
}

export async function createTask(task: Omit<Task, "id" | "createdAt" | "updatedAt">) {
  const createdAt = nowISO();
  const docRef = await addDoc(collection(db, "tasks"), { ...task, userId, createdAt, updatedAt: createdAt });
  return { id: docRef.id, ...task, createdAt, updatedAt: createdAt };
}

export async function updateTask(id: string, patch: Partial<Task>) {
  await updateDoc(doc(db, "tasks", id), { ...patch, updatedAt: nowISO() });
}

export async function removeTask(id: string) {
  await deleteDoc(doc(db, "tasks", id));
}

export async function getGoals() {
  const snap = await getDocs(query(collection(db, "goals"), where("userId", "==", userId)));
  return snap.docs.map((d) => ({ ...(d.data() as Goal), id: d.id })).filter((g) => isWithinOneYear(g.createdAt));
}

export async function createGoal(goal: Omit<Goal, "id" | "createdAt" | "updatedAt">) {
  const createdAt = nowISO();
  const docRef = await addDoc(collection(db, "goals"), { ...goal, userId, createdAt, updatedAt: createdAt });
  return { id: docRef.id, ...goal, createdAt, updatedAt: createdAt };
}

export async function getSessions() {
  const snap = await getDocs(query(collection(db, "sessions"), where("userId", "==", userId)));
  return snap.docs.map((d) => ({ ...(d.data() as FocusSession), id: d.id })).filter((s) => isWithinOneYear(s.createdAt));
}

export async function createSession(session: Omit<FocusSession, "id" | "createdAt">) {
  const createdAt = nowISO();
  const docRef = await addDoc(collection(db, "sessions"), { ...session, userId, createdAt });
  return { id: docRef.id, ...session, createdAt };
}
