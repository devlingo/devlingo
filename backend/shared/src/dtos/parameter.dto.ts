import { IsAlphanumeric, IsNotEmpty, IsUUID } from 'class-validator';

export class ProjectId {
	@IsUUID('4')
	@IsNotEmpty()
	projectId!: string;
}

export class Key {
	@IsAlphanumeric()
	@IsNotEmpty()
	key!: string;
}
