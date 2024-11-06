import { nanoid } from "@packages/nanoid";
import { sql } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const usersTable = pgTable('users', {
  id: varchar('id').primaryKey().$default(nanoid),

  username: varchar('username', { length: 32 }).notNull(),
  password: varchar('password').notNull(),

  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().$onUpdate(() => sql`now()`),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow()
});

export const UserSchema = createSelectSchema(usersTable).omit({ password: true });
