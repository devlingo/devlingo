import { Type } from 'class-transformer';
import {
	IsArray,
	IsBoolean,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
} from 'class-validator';
import type {
	EdgeData,
	NodeData,
	VersionData,
	ViewPortData,
} from 'shared/types';

import type { DesignData } from '@/api/prompt/types';

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

export class VersionDTO implements VersionData {
	@Type(() => Object)
	@IsArray()
	nodes!: NodeData[];

	@Type(() => Object)
	@IsArray()
	edges!: EdgeData[];

	@IsObject()
	viewport!: ViewPortData;
}

export class PromptRequestDTO {
	@IsString()
	@IsNotEmpty()
	promptContent!: string;

	@IsObject()
	@IsNotEmpty()
	designData!: DesignData;

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
