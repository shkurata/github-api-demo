import { WrapItem, Center, Avatar, Box } from '@chakra-ui/react'
import { BaseUserInfo } from '../interfaces'

type AutoCompleteListItemProps = BaseUserInfo & {
    handleClick: (login: string) => void
}

const AutocompleteListItem = (props: AutoCompleteListItemProps) => {
    const { avatarUrl, login, name, handleClick } = props
    const handleSelect = (e: React.MouseEvent<HTMLElement>): void => {
        handleClick(login)
    }

    return (
        <WrapItem justifyContent='center' cursor='pointer' _hover={{ background: 'gray.200' }} onClick={handleSelect}>
            <Center>
                <Avatar size='sm' name={name} src={avatarUrl} mr='2' />
                <Box>{login}</Box>
            </Center>
        </WrapItem>
    )
}

export default AutocompleteListItem
