import { CloseIcon } from '@chakra-ui/icons';
import { Link as ReachLink } from 'react-router-dom';
import {
	Button,
	Center,
	Container,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Link,
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
	const selectedUser = useAppSelector(getUserProfile);
	const dispatch = useAppDispatch();
	const [searchTerm, setSearchTerm] = useState(selectedUser?.login || '');
	const [userList, setUserList] = useState<UserProfile[]>([]);
	const [showAutocomplete, setShowAutocomplete] = useState(false);

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
				/>
			)}
			{selectedUser && (
				<VStack>
					<UserProfileDetails user={selectedUser!} />
					<Center>
						<Link
							textDecorationLine='none'
							as={ReachLink}
							to='/repos'
						>
							<Button>Load user repositories</Button>
						</Link>
					</Center>
				</VStack>
			)}
		</Container>
	);
};

export default SearchUsersPage;
