import type { Project as DBProject, User as DBUser } from '@prisma/client';

interface AuditValues {
	createdAt: string;
	updatedAt: string;
}

export type User = DBUser & AuditValues;

export type Project = DBProject & AuditValues;
