import {
	IsAlphanumeric,
	IsInt,
	IsNotEmpty,
	IsPositive,
	IsUUID,
} from 'class-validator';

export class ProjectId {
	@IsUUID('4')
	@IsNotEmpty()
	projectId!: string;
}

export class Name {
	@IsAlphanumeric()
	@IsNotEmpty()
	name!: string;
}

export class Version {
	@IsPositive()
	@IsInt()
	version!: number;
}
