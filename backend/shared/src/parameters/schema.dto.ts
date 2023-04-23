import {
	IsAlphanumeric,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

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
export class SchemaBody {
	@IsObject()
	schema!: Record<string, any>;

	@IsString()
	@IsOptional()
	description?: string;

	@IsAlphanumeric()
	@IsNotEmpty()
	key!: string;
}
