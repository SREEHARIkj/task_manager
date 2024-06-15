export interface TaskType {
  id: number;
  title: string | null;
  description: string | null;
  createdAt: Date | null;
  priority: string | null;
  status: string | null;
  dueDate?: Date | null;
  updatedAt?: Date | null;
}

export interface StatusType {
  id: number;
  value: string;
  label: string;
  color: string;
}

export interface PriorityType {
  id: number;
  value: string;
  label: string;
  color: string;
}

export interface StatusOptionType {
  value: string;
  label: string;
  color: string;
}

export const StatusOptions = [
  { value: 'Todo', label: 'To Do', color: '#ADD8E6' },
  { value: 'In Progress', label: 'In Progress', color: '#FFD700' },
  { value: 'Blocked', label: 'Blocked', color: '#FF6347' },
  { value: 'Incomplete', label: 'Incomplete', color: '#D3D3D3' },
  { value: 'Completed', label: 'Completed', color: '#90EE90' },
] as StatusOptionType[];
