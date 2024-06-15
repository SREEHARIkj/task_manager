import express from 'express';
import { db } from '../db_schemas/db_connection.js';
import { priorities, statuses, tasks } from '../db_schemas/schema.js';
import { eq } from 'drizzle-orm';
import { TaskType } from '../constants/const.js';

interface PostRequestBody {
  title: string | null;
  description: string | null;
  statusId: number | null;
  priorityId: number | null;
  dueDate: Date;
}

const router = express.Router();

const basicTaskValuesStruct = {
  id: tasks.id,
  title: tasks.title,
  description: tasks.description,
  status: statuses.label,
  priority: priorities.name,
  createdAt: tasks.createdAt,
  dueDate: tasks?.dueDate,
};

router.get('/', async (req, res): Promise<void> => {
  const taskList = await db
    .select(basicTaskValuesStruct)
    .from(tasks)
    .leftJoin(statuses, eq(tasks.statusId, statuses.id))
    .leftJoin(priorities, eq(tasks.priorityId, priorities.id));

  res.json({ data: taskList, count: taskList.length });
});

router.get('/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const [singleTask] = (await db
      .select(basicTaskValuesStruct)
      .from(tasks)
      .leftJoin(statuses, eq(tasks.statusId, statuses.id))
      .leftJoin(priorities, eq(tasks.priorityId, priorities.id))
      .where(eq(tasks.id, +taskId))) ?? [null];

    if (!singleTask) {
      res.status(404).json({ error: 'Not found.' });
      return;
    }

    res.json({ data: singleTask });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post('/', async (req: express.Request<unknown, unknown, PostRequestBody>, res: express.Response) => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: 'Missing title' });
    return;
  }
  try {
    const newTask = {
      ...req.body,
      ...(req.body?.dueDate && { dueDate: new Date(req.body.dueDate) }),
    } as PostRequestBody;
    const db_res = await db.insert(tasks).values(newTask).returning({ id: tasks.id });
    res.json({ data: db_res });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put('/:id', async (req, res) => {
  const taskId = req.params.id;
  const request = req.body as Partial<Omit<TaskType, 'priority' | 'status'>>;
  delete request.createdAt;
  try {
    const db_res = await db
      .update(tasks)
      .set({
        ...request,
        ...(request?.updatedAt && { updatedAt: new Date(request.updatedAt) }),
        ...(request?.dueDate && { dueDate: new Date(request?.dueDate) }),
      })
      .where(eq(tasks.id, +taskId))
      .returning({ id: tasks.id });

    if (!db_res?.length) {
      res.status(404).json({ error: 'Not found.' });
      return;
    }

    res.json({ data: db_res });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete('/:id', async (req, res) => {
  const taskId = req.params.id;
  try {
    const db_res = await db.delete(tasks).where(eq(tasks.id, +taskId)).returning({ id: tasks.id });
    if (!db_res?.length) {
      res.status(404).json({ error: 'Not found.' });
      return;
    }
    res.json({ message: `Deleted task with id ${taskId}` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
