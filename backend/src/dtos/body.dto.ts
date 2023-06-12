import {
	IsArray,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

export class ProjectCreateDTO {
	@IsString()
	@IsNotEmpty()
	name!: string;
}

export class DesignVersionDTO {
	@IsUUID('4')
	@IsNotEmpty()
	projectId!: string;

	@IsUUID('4')
	@IsOptional()
	designId?: string;

	@IsObject()
	data!: Record<string, any>;

	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsOptional()
	description?: string | null;
}

export class PromptRequestDTO {
	@IsString()
	@IsNotEmpty()
	promptContent!: string;

	@IsObject()
	@IsNotEmpty()
	designData!: { nodes: Record<string, any>[]; edges: Record<string, any>[] };

	@IsArray()
	@IsNotEmpty()
	nodeTypes!: string[];

	@IsArray()
	@IsNotEmpty()
	edgeTypes!: string[];

	@IsString()
	@IsOptional()
	modelName = 'gpt-3.5-turbo';
}
