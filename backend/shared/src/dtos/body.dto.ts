import {
	IsAlphanumeric,
	IsArray,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
	Matches,
} from 'class-validator';

export class ProjectCreateDTO {
	@Matches(/[a-zA-Z0-9 \-_]+/)
	@IsString()
	@IsNotEmpty()
	name!: string;
}

export class DesignVersionDTO {
	@IsObject()
	data!: Record<string, any>;

	@IsAlphanumeric()
	@IsNotEmpty()
	name!: string;
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
