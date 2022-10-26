import { Container, useOutsideClick, Wrap } from '@chakra-ui/react'
import { useRef } from 'react'
import { BaseUserInfo } from '../interfaces'
import AutocompleteListItem from './AutocompleteListItem'

type AutoCompleteListProps = {
    users: BaseUserInfo[]
    handleSelect: (login: string) => void
    handleOutsideClick?: () => void
}

const AutocompleteList = ({ users, handleOutsideClick, handleSelect }: AutoCompleteListProps) => {
    const ref = useRef(null)
    useOutsideClick({
        ref,
        handler: handleOutsideClick,
    })

    return (
        <Container width='sm' ref={ref}>
            <Wrap direction='column' borderWidth='1px' border='gray.500' borderRadius='10px' p='10px 0'>
                {users.map((user, i) => (
                    <AutocompleteListItem key={i} {...user} handleClick={handleSelect} />
                ))}
            </Wrap>
        </Container>
    )
}

export default AutocompleteList
