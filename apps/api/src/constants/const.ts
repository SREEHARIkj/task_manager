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

export const Tasks = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Draft and finalize the project proposal document for client submission.',
    createdAt: '2024-02-15T09:30:00Z',
    priority: 'High',
    status: 'Incomplete',
    dueDate: '2024-02-18T09:30:00Z',
  },
  {
    id: '2',
    title: 'Review Code Changes',
    description: 'Review and provide feedback on recent code changes.',
    createdAt: '2024-02-14T10:15:00Z',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2024-02-17T10:15:00Z',
  },
  {
    id: '3',
    title: 'Prepare Presentation Slides',
    description: 'Create slides for the upcoming project presentation.',
    createdAt: '2024-02-17T11:00:00Z',
    priority: 'High',
    status: 'Blocked',
    dueDate: '2024-02-20T11:00:00Z',
  },
  {
    id: '12',
    title: 'Implement New Feature',
    description: 'Work on implementing the new feature according to the specifications.',
    createdAt: '2024-03-01T09:45:00Z',
    priority: 'High',
    status: 'Todo',
    dueDate: '2024-03-04T09:45:00Z',
  },
  {
    id: '13',
    title: 'Client Meeting',
    description: 'Attend a meeting with the client to discuss project requirements.',
    createdAt: '2024-03-02T10:30:00Z',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2024-03-05T10:30:00Z',
  },
  {
    id: '14',
    title: 'Code Review',
    description: 'Participate in the code review process to ensure code quality.',
    createdAt: '2024-03-03T11:15:00Z',
    priority: 'Medium',
    status: 'Blocked',
    dueDate: '2024-03-06T11:15:00Z',
  },
  {
    id: '15',
    title: 'Testing Phase',
    description: 'Initiate the testing phase to identify and fix any issues.',
    createdAt: '2024-03-06T09:30:00Z',
    priority: 'High',
    status: 'Incomplete',
    dueDate: '2024-03-09T09:30:00Z',
  },
  {
    id: '16',
    title: 'Documentation Updates',
    description: 'Update project documentation with the latest changes and features.',
    createdAt: '2024-03-07T10:00:00Z',
    priority: 'Low',
    status: 'Todo',
    dueDate: '2024-03-10T10:00:00Z',
  },
  {
    id: '17',
    title: 'Bug Fixing',
    description: 'Identify and fix reported bugs in the application.',
    createdAt: '2024-03-08T11:00:00Z',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2024-03-11T11:00:00Z',
  },
  {
    id: '18',
    title: 'Final Presentation',
    description: 'Prepare for and deliver the final project presentation to stakeholders.',
    createdAt: '2024-03-09T09:45:00Z',
    priority: 'High',
    status: 'Blocked',
    dueDate: '2024-03-12T09:45:00Z',
  },
] as TaskType[];

export const StatusOptions = [
  { value: 'Todo', label: 'To Do', color: '#ADD8E6' },
  { value: 'In Progress', label: 'In Progress', color: '#FFD700' },
  { value: 'Blocked', label: 'Blocked', color: '#FF6347' },
  { value: 'Incomplete', label: 'Incomplete', color: '#D3D3D3' },
  { value: 'Completed', label: 'Completed', color: '#90EE90' },
] as StatusOptionType[];
