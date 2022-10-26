import { Container, useOutsideClick, Wrap } from '@chakra-ui/react'
import { useRef } from 'react'
import { AutoCompleteListItemProps } from '../interfaces'
import AutocompleteListItem from './AutocompleteListItem'

type AutoCompleteListProps = {
    users: AutoCompleteListItemProps[]
    handleOutsideClick?: () => void
}

const AutocompleteList = ({ users, handleOutsideClick }: AutoCompleteListProps) => {
    const ref = useRef(null)
    useOutsideClick({
        ref,
        handler: handleOutsideClick,
    })

    return (
        <Container width='sm' ref={ref}>
            <Wrap direction='column' borderWidth='1px' border='gray.500' borderRadius='10px' p='10px 0'>
                {users.map((user, i) => (
                    <AutocompleteListItem key={i} {...user} />
                ))}
            </Wrap>
        </Container>
    )
}

export default AutocompleteList
