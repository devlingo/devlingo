export const GET_USER_PROFILE_PATH = 'users/profile';
export const GET_USER_PROJECTS_PATH = 'projects';

export enum ApiOperationId {
	GetUserProfile = 'GetUserProfile',
	GetUserProjects = 'GetUserProjects',
}

export enum HttpMethod {
	Get = 'GET',
	Post = 'POST',
	Patch = 'PATCH',
	Put = 'PUT',
	Delete = 'DELETE',
}
