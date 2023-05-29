import {
	IsAlphanumeric,
	IsEnum,
	IsInt,
	IsNotEmpty,
	IsPositive,
	IsUUID,
} from 'class-validator';
import { PromptProvider } from 'shared/constants';

export class ProjectIdParam {
	@IsUUID('4')
	@IsNotEmpty()
	projectId!: string;
}

export class NameParam {
	@IsAlphanumeric()
	@IsNotEmpty()
	name!: string;
}

export class VersionParam {
	@IsPositive()
	@IsInt()
	version!: number;
}

export class PromptProviderParam {
	@IsEnum(PromptProvider)
	promptProvider!: PromptProvider;
}
