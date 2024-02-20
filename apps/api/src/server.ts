import express from 'express';
import cors from 'cors';
import { TaskType, Tasks } from './constants/const.js';
// Todo: convert http to https

const app = express();
const corsOptions = {
  origin: '*', // Specify the allowed origin(s)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
  // optionsSuccessStatus: 204, // Specify the status code for successful preflight requests
};
app.use(express.json());
app.use(cors(corsOptions)); // allow all origins for development purposes only
// const port = process.env.PORT || 3000;
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/tasks', (req, res) => {
  res.json({ data: Tasks, count: Tasks.length });
});
app.get('/api/task/:id', (req, res) => {
  const taskId = req.params.id;
  const task = Tasks.find((t) => t.id === taskId);
  res.json({ data: task });
});

app.post('/api/add-task', (req: express.Request<{ title: string; description: string }>, res: express.Response) => {
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

app.put('/api/update-task/:id', (req, res) => {
  const taskId = req.params.id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { title, description }: { title: string; description: string } = req.body;
  const taskIndex = Tasks.findIndex((t) => t.id === taskId);
  if (taskIndex < 0) return res.status(404).json({ error: 'Not found.' });
  Tasks[taskIndex] = { ...Tasks[taskIndex], title, description };
  res.json({ data: Tasks[taskIndex] });
});

app.delete('/api/remove-task/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = Tasks.findIndex((t) => t.id === taskId);
  if (taskIndex < 0) return res.status(404).json({ error: 'Not found.' });
  Tasks.splice(taskIndex, 1);
  res.json({ message: `Deleted task with id ${taskId}` });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
