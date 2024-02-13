export type TaskType = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
};

export type StatusOptionType = { value: string; label: string; color: string };

export const Tasks = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Draft and finalize the project proposal document for client submission.',
    dueDate: '2024-02-15',
    priority: 'High',
    status: 'Incomplete',
  },
  {
    id: '2',
    title: 'Review Code Changes',
    description: 'Review and provide feedback on recent code changes.',
    dueDate: '2024-02-14',
    priority: 'Medium',
    status: 'In Progress',
  },
  {
    id: '3',
    title: 'Prepare Presentation Slides',
    description: 'Create slides for the upcoming project presentation.',
    dueDate: '2024-02-17',
    priority: 'High',
    status: 'Blocked',
  },
  {
    id: '4',
    title: 'Meeting with Team',
    description: 'Attend the weekly team meeting to discuss project progress.',
    dueDate: '2024-02-13',
    priority: 'Medium',
    status: 'Completed',
  },
  {
    id: '5',
    title: 'Update Documentation',
    description: 'Update project documentation with the latest changes.',
    dueDate: '2024-02-16',
    priority: 'Low',
    status: 'Todo',
  },
  {
    id: '6',
    title: 'Test Application',
    description: 'Perform testing on the new features implemented in the application.',
    dueDate: '2024-02-18',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: '7',
    title: 'Code Refactoring',
    description: 'Refactor code to improve performance and maintainability.',
    dueDate: '2024-02-20',
    priority: 'Medium',
    status: 'Todo',
  },
  {
    id: '8',
    title: 'Client Demo',
    description: 'Prepare and conduct a demo session for the client.',
    dueDate: '2024-02-21',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: '9',
    title: 'Bug Fixing',
    description: 'Investigate and fix reported bugs in the application.',
    dueDate: '2024-02-22',
    priority: 'High',
    status: 'Blocked',
  },
  {
    id: '10',
    title: 'Training Session',
    description: 'Attend a training session on the latest technologies.',
    dueDate: '2024-02-25',
    priority: 'Low',
    status: 'Todo',
  },
  {
    id: '11',
    title: 'Write Monthly Report',
    description: 'Compile and submit the monthly project status report.',
    dueDate: '2024-02-28',
    priority: 'Medium',
    status: 'Completed',
  },
] as TaskType[];

export const StatusOptions = [
  { value: 'Todo', label: 'To Do', color: '#ADD8E6' },
  { value: 'In Progress', label: 'In Progress', color: '#FFD700' },
  { value: 'Blocked', label: 'Blocked', color: '#FF6347' },
  { value: 'Incomplete', label: 'Incomplete', color: '#D3D3D3' },
  { value: 'Completed', label: 'Completed', color: '#90EE90' },
] as StatusOptionType[];
