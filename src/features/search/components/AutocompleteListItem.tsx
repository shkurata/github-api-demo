import { WrapItem, Center, Avatar, Box } from '@chakra-ui/react'
import { AutoCompleteListItemProps } from '../interfaces'

const AutocompleteListItem = ({ avatarUrl, login, name, handleClick }: AutoCompleteListItemProps) => {
    const handleSelect = (e: React.MouseEvent<HTMLElement>): void => {
        console.log('handleSelect')
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
