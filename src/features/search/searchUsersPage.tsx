import { Button, Container, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { User } from 'src/app/api/types.generated'
import AutocompleteList from './components/AutocompleteList'
import { AutoCompleteListItemProps } from './interfaces'
import { SearchUsersQuery, useSearchUsersQuery } from './SearchUsers.generated'

const SearchUsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [userSelected, setUserSelected] = useState(false)
    const [showAutocomplete, setShowAutocomplete] = useState(true)
    const { error, isLoading, data, refetch } = useSearchUsersQuery({ query: searchTerm }, { skip: !searchTerm })

    if (error) {
        return <div>{error.message}</div>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('handleChange')
        setSearchTerm(e.target.value)
        refetch()
        e.preventDefault()
    }

    const handleSelect = (login: string): void => {
        setSearchTerm(login)
        setUserSelected(true)
        setShowAutocomplete(false)
    }

    const handleOutsideClick = (): void => {
        console.log('handleOutsideClick')
        if (!userSelected) {
            setShowAutocomplete(false)
        }
    }

    const mapSearchResults = (data: SearchUsersQuery | undefined): AutoCompleteListItemProps[] => {
        if (!data?.search || !data?.search.nodes?.length) {
            return []
        }
        return data.search.nodes.map((user) => {
            const { avatarUrl, login, name } = user as User
            return {
                avatarUrl,
                login,
                name,
                handleClick: handleSelect,
            }
        })
    }

    return (
        <Container>
            <FormControl>
                <FormLabel mt='2' textAlign='center'>
                    Search Users
                </FormLabel>
                <Input
                    placeholder='Github user username'
                    mb='2'
                    type='text'
                    value={searchTerm}
                    onChange={handleChange}
                    onFocus={(e) => setShowAutocomplete(true)}
                />
                {userSelected && <Button type='submit'>Load user data</Button>}
            </FormControl>
            {data && showAutocomplete && (
                <AutocompleteList handleOutsideClick={handleOutsideClick} users={mapSearchResults(data)} />
            )}
        </Container>
    )
}

export default SearchUsersPage
