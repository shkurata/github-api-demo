import { BaseUserInfo } from './interfaces'
import { SearchUsersQuery } from './SearchUsers.generated'

export function mapSearchResults(data: SearchUsersQuery | undefined): BaseUserInfo[] {
    if (!data?.search || !data?.search.nodes?.length) {
        return []
    }

    return data.search.nodes as BaseUserInfo[]
}

export function transformUserList(data: SearchUsersQuery | undefined, filterTerm = ''): BaseUserInfo[] {
    const loginIncludesTerm = ({ login }: BaseUserInfo): boolean =>
        login ? login.toLowerCase().includes(filterTerm.toLowerCase()) : false
    return mapSearchResults(data).filter(loginIncludesTerm)
}
