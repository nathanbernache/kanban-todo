export const COLUMNS = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' },
];

export function generateId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
