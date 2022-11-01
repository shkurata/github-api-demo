export interface UserProfile {
	id: string;
	login: string;
	name: string;
	avatarUrl: string;
	url: string;
	email: string;
	websiteUrl: string;
	repositories: {
		totalCount: number;
	};
}
