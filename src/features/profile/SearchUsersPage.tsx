import { CloseIcon } from '@chakra-ui/icons';
import {
	Button,
	Center,
	Container,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import AutocompleteList from './components/AutocompleteList';
import UserProfileDetails from './components/UserProfileDetails';
import { UserProfile } from './interfaces';
import { getUserProfile, setProfile } from './profileSlice';
import { searchUsers } from './search.service';

const SearchUsersPage = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [userList, setUserList] = useState<UserProfile[]>([]);
	const [showAutocomplete, setShowAutocomplete] = useState(false);
	const selectedUser = useAppSelector(getUserProfile);
	const dispatch = useAppDispatch();

	useEffect(() => {
		searchUsers(searchTerm)
			.then((users) => {
				setUserList(users);
				setShowAutocomplete(
					!selectedUser && !!searchTerm && users.length > 1,
				);
				if (users.length === 1) {
					handleSelect(users[0].login);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [searchTerm]);

	function handleSelect(login: string): void {
		const user = userList.find((user) => user.login === login);
		if (user) {
			setSearchTerm(user.login);
			dispatch(setProfile(user));
			setShowAutocomplete(false);
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		dispatch(setProfile(null));
		setSearchTerm(e.target.value);
		e.preventDefault();
	}

	function showDetails(): boolean {
		return (
			!showAutocomplete &&
			!!selectedUser &&
			searchTerm === selectedUser.login &&
			userList.some((user: UserProfile) => user.login === searchTerm)
		);
	}

	function resetSearchResults(e: React.MouseEvent<HTMLDivElement>): void {
		setSearchTerm('');
		setUserList([]);
		setShowAutocomplete(false);
		dispatch(setProfile(null));
		e.preventDefault();
	}

	return (
		<Container>
			<FormControl>
				<FormLabel mt='2' textAlign='center'>
					Search Users
				</FormLabel>

				<InputGroup>
					<Input
						placeholder='Github user username'
						mb='2'
						type='text'
						autoComplete='off'
						value={searchTerm}
						onChange={handleChange}
						onFocus={() => setShowAutocomplete(userList.length > 0)}
					/>
					{searchTerm && (
						<InputRightElement
							cursor='pointer'
							onClick={resetSearchResults}
						>
							<CloseIcon color='gray' />
						</InputRightElement>
					)}
				</InputGroup>
			</FormControl>
			{showAutocomplete && (
				<AutocompleteList
					users={userList}
					handleSelect={handleSelect}
					// handleOutsideClick={() => setShowAutocomplete(false)}
				/>
			)}
			{showDetails() && (
				<VStack>
					<UserProfileDetails user={selectedUser!} />
					<Center>
						<Button type='submit'>Load user repositories</Button>
					</Center>
				</VStack>
			)}
		</Container>
	);
};

export default SearchUsersPage;
