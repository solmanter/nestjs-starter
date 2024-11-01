import { sql } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "@libs/package";

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),

  username: varchar('username', { length: 32 }).notNull(),
  password: varchar('password').notNull(),

  updatedAt: timestamp('updated_at', { mode: 'string' }).defaultNow().$onUpdate(() => sql`now()`),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow()
});

export const UserSchema = createSelectSchema(usersTable).omit({ password: true });
