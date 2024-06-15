import express from 'express';
import { db } from '../db_schemas/db_connection.js';
import { statuses } from '../db_schemas/schema.js';
import { eq } from 'drizzle-orm';

const router = express.Router();

router.get('/', async (req, res): Promise<void> => {
  const statusList = await db.select().from(statuses);
  res.json({ data: statusList, count: statusList.length });
});

router.delete('/:id', async (req, res): Promise<void> => {
  const id = req.params.id;
  try {
    const db_res = await db.delete(statuses).where(eq(statuses.id, +id)).returning();
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
