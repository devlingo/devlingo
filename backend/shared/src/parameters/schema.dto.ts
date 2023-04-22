import { IsNotEmpty, IsNumber, IsObject, IsUUID } from 'class-validator';

export class ProjectId {
	@IsUUID('4')
	@IsNotEmpty()
	projectId!: string;
}

export class Version {
	@IsNumber()
	version!: number;
}

export class SchemaBody {
	@IsObject()
	schema!: Record<string, any>;
}
