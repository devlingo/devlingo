import {
	IsAlphanumeric,
	IsInt,
	IsNotEmpty,
	IsPositive,
	IsUUID,
} from 'class-validator';

export class ProjectIdParam {
	@IsUUID('4')
	@IsNotEmpty()
	projectId!: string;
}

export class DesignIdParam {
	@IsUUID('4')
	@IsNotEmpty()
	designId!: string;
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
