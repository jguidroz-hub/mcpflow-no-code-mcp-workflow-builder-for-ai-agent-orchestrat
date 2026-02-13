import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default(true),
  weeklyDigest: boolean('weekly_digest').default(true),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
});

// Core workflow configurations for MCP agent orchestration
export const workflows = pgTable('workflows', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  configuration: jsonb('configuration').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

// Tracking individual workflow execution instances
export const workflowRuns = pgTable('workflow_runs', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  workflowId: text('workflow_id').notNull().references(() => workflows.id, { onDelete: 'cascade' }),
  status: text('status').notNull(),
  executionLogs: jsonb('execution_logs'),
  createdAt: timestamp('created_at').notNull(),
  completedAt: timestamp('completed_at'),
});

// Pre-configured workflow templates for quick start
export const templateWorkflows = pgTable('template_workflows', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  configuration: jsonb('configuration').notNull(),
  category: text('category').notNull(),
  complexity: text('complexity').notNull(),
  createdAt: timestamp('created_at').notNull(),
});
