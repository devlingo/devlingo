import {
	IsAlphanumeric,
	IsArray,
	IsInt,
	IsNotEmpty,
	IsObject,
	IsPositive,
	IsString,
	IsUUID,
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
	@IsAlphanumeric()
	@IsNotEmpty()
	name!: string;

	@IsInt()
	@IsPositive()
	version!: number;

	@IsUUID('4')
	@IsNotEmpty()
	projectId!: string;

	@IsString()
	@IsNotEmpty()
	promptContent!: string;

	@IsObject()
	@IsNotEmpty()
	designData!: Record<string, any>;

	@IsObject()
	@IsNotEmpty()
	exampleData!: Record<string, any>;

	@IsArray()
	@IsNotEmpty()
	nodeTypes!: string[];

	@IsArray()
	@IsNotEmpty()
	edgeTypes!: string[];
}
