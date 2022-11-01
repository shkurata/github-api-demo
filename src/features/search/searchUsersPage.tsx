import { Button, Container, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import AutocompleteList from './components/AutocompleteList'
import { BaseUserInfo } from './interfaces'
import { SearchUsersQuery, useLazySearchUsersQuery } from './SearchUsers.generated'
import { transformUserList } from './utils'

const SearchUsersPage = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [userSelected, setUserSelected] = useState(false)
    const [showAutocomplete, setShowAutocomplete] = useState(true)
    const [trigger, { data, currentData, error }, lastPromiseQuery] = useLazySearchUsersQuery()

    if (error) {
        return <div>{error.message}</div>
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>, data: SearchUsersQuery | undefined): void {
        const { value } = e.target
        setSearchTerm(value)
        if (value.length > 0) {
            trigger({ query: value }).unwrap()
            setShowAutocomplete(true)
        } else {
            setShowAutocomplete(false)
        }
        e.preventDefault()
    }

    function handleSelect(login: string): void {
        setSearchTerm(login)
        setUserSelected(true)
        setShowAutocomplete(false)
    }

    function handleOutsideClick(): void {
        setShowAutocomplete(false)
    }

    function createAutoComplete(data: SearchUsersQuery | undefined): JSX.Element | null {
        if (!showAutocomplete || !data) {
            return null
        }

        const users = transformUserList(data)

        if (users.length === 0) {
            return null
        }

        if (users.length === 1) {
            setUserSelected(true)
            setShowAutocomplete(false)
        }

        return <AutocompleteList users={users} handleSelect={handleSelect} handleOutsideClick={handleOutsideClick} />
    }

    function userExists(login: string, data: SearchUsersQuery | undefined): boolean {
        return transformUserList(data).some((user: BaseUserInfo) => user.login === login)
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
                    autoComplete='off'
                    value={searchTerm}
                    onChange={(e) => handleChange(e, data)}
                    onFocus={(e) => setShowAutocomplete(true)}
                />
                {!showAutocomplete && userExists(searchTerm, data) && <Button type='submit'>Load user data</Button>}
            </FormControl>
            {createAutoComplete(data)}
        </Container>
    )
}

export default SearchUsersPage
