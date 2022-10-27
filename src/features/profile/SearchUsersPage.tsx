import {
	Button,
	Container,
	FormControl,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AutocompleteList from './components/AutocompleteList';
import { searchUsers } from './search.service';
import { UserProfile } from './interfaces';

const SearchUsersPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [userList, setUserList] = useState<UserProfile[]>([]);
	const [showAutocomplete, setShowAutocomplete] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			searchUsers(searchTerm)
				.then((data) => {
					setUserList(data);
					setShowAutocomplete(data.length > 1);
				})
				.catch((error) => {
					console.log(error);
				});
		}, 100);
		return () => clearTimeout(timeoutId);
	}, [searchTerm]);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setSearchTerm(e.target.value);
		e.preventDefault();
	}

	function showSubmit(): boolean {
		return (
			!showAutocomplete &&
			userList.some((user: UserProfile) => user.login === searchTerm)
		);
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
					onChange={handleChange}
				/>
				{showSubmit() && <Button type='submit'>Load user data</Button>}
			</FormControl>
			{showAutocomplete && (
				<AutocompleteList
					users={userList}
					handleSelect={setSearchTerm}
					handleOutsideClick={() => setShowAutocomplete(false)}
				/>
			)}
		</Container>
	);
};

export default SearchUsersPage;
