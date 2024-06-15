export type TaskType = {
  id: number;
  title: string | null;
  description: string | null;
  createdAt: string | null;
  priority: string | null;
  status: string | null;
  dueDate?: Date | null;
  updatedAt?: Date | null;
  priorityId?: number | null;
  statusId?: number | null;
};

export type StatusType = {
  id: number;
  value: string;
  label: string;
  color: string;
};

export type PriorityType = {
  id: number;
  value: string;
  label: string;
  color: string;
};

export type StatusOptionType = {
  value: string;
  label: string;
  color: string;
};

export const consts = {
  tasks: '/tasks',
  priorities: '/priorities',
  statuses: '/statuses',
};
