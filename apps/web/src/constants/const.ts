export interface TaskType {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: string;
  status: string;
  dueDate?: string;
}

export interface StatusOptionType {
  value: string;
  label: string;
  color: string;
}

export const consts = {
  tasks: '/tasks',
};

export const StatusOptions = [
  { value: 'Todo', label: 'To Do', color: '#ADD8E6' },
  { value: 'In Progress', label: 'In Progress', color: '#FFD700' },
  { value: 'Blocked', label: 'Blocked', color: '#FF6347' },
  { value: 'Incomplete', label: 'Incomplete', color: '#D3D3D3' },
  { value: 'Completed', label: 'Completed', color: '#90EE90' },
] as StatusOptionType[];
