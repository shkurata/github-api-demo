import { SearchUsersQuery } from 'src/app/api/types.generated';
import { UserProfile } from './interfaces';

export function mapSearchResults(
	data: SearchUsersQuery | undefined,
): UserProfile[] {
	if (!data?.search || !data?.search.nodes?.length) {
		return [];
	}

	return data.search.nodes as UserProfile[];
}

export function transformUserList(
	data: SearchUsersQuery | undefined,
	filterTerm = '',
): UserProfile[] {
	const loginIncludesTerm = ({ login }: UserProfile): boolean =>
		login ? login.toLowerCase().includes(filterTerm.toLowerCase()) : false;
	return mapSearchResults(data).filter(loginIncludesTerm);
}
