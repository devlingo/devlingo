import {
	IsAlphanumeric,
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
}
