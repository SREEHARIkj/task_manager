import express from 'express';
import { db } from '../db_schemas/db_connection.js';
import { priorities } from '../db_schemas/schema.js';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.get('/', async (req: Express.Request, res) => {
  try {
    const priorityList = await db.select().from(priorities);
    if (!priorityList.length) {
      res.status(404).json({ message: 'No Priority found' });
      return;
    }
    res.json({ data: priorityList, count: priorityList.length });
  } catch (error) {
    console.error('Error fetching priority list:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const db_res = await db.delete(priorities).where(eq(priorities.id, +id)).returning();
    if (!db_res?.[0]) {
      res.status(404).send('No Priority with the given ID was found');
      return;
    }
    res.status(200).send(`Priority ${db_res[0].id} deleted successfully`);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
