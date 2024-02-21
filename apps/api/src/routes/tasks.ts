import express from 'express';
import { TaskType, Tasks } from '../constants/const.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ data: Tasks, count: Tasks.length });
});

router.get('/:id', (req, res) => {
  const taskId = req.params.id;
  const task = Tasks.find((t) => t.id === taskId);
  res.json({ data: task });
});

router.post('/', (req: express.Request<{ title: string; description: string }>, res: express.Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Missing title' });
  const newTask = {
    id: (Math.floor(Math.random()) * 10).toString(),
    createdAt: Date.now().toString(),
    ...req.body,
    priority: 'high',
    status: 'Todo',
    dueDate: '',
  } as TaskType;
  Tasks.push(newTask);
  res.json({ data: newTask });
});

router.put('/:id', (req, res) => {
  const taskId = req.params.id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { title, description }: { title: string; description: string } = req.body;
  const taskIndex = Tasks.findIndex((t) => t.id === taskId);
  if (taskIndex < 0) return res.status(404).json({ error: 'Not found.' });
  Tasks[taskIndex] = { ...Tasks[taskIndex], title, description };
  res.json({ data: Tasks[taskIndex] });
});

router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = Tasks.findIndex((t) => t.id === taskId);
  if (taskIndex < 0) return res.status(404).json({ error: 'Not found.' });
  Tasks.splice(taskIndex, 1);
  res.json({ message: `Deleted task with id ${taskId}` });
});

export default router;
