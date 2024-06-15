import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const statuses = pgTable('statuses', {
  id: serial('id').primaryKey(),
  value: varchar('value', { length: 50 }),
  label: varchar('label', { length: 50 }),
  color: varchar('color', { length: 50 }),
});

export const priorities = pgTable('priorities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }),
});

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at'),
  priorityId: integer('priority_id').references(() => priorities.id),
  statusId: integer('status_id').references(() => statuses.id),
  dueDate: timestamp('due_date'),
});
