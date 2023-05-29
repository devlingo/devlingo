import {
	IsAlphanumeric,
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

	@IsString()
	@IsOptional()
	description?: string;

	@IsAlphanumeric()
	@IsNotEmpty()
	name!: string;
}
