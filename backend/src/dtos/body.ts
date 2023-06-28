import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
} from 'class-validator';

export class ProjectCreateDTO {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsOptional()
	description?: string;
}

export class DesignDTO {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsOptional()
	description?: string | null;

	@IsBoolean()
	@IsOptional()
	isDefault?: boolean;
}

export class VersionDTO {
	@IsObject()
	data!: Record<string, any>;
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

export class UserUpdateDTO {
	@IsString()
	@IsOptional()
	name?: string;

	@IsString()
	@IsOptional()
	avatarUrl?: string;
}
