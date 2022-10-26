export interface AutoCompleteListItemProps {
    avatarUrl: string
    login: string
    name?: string
    handleClick: (userLogin: string) => void
}
