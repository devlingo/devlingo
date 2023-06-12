import { IsNotEmpty, IsUUID } from 'class-validator';

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

export class VersionIdParam {
	@IsUUID('4')
	@IsNotEmpty()
	versionId!: string;
}
