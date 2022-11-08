import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react';
import { format, formatDistance, formatRelative } from 'date-fns';
import { useCallback, useEffect, useRef } from 'react';
import injectedApi from 'src/app/api/repos.service';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { getUserLogin } from '../profile';
import { useInfiniteSearchReposQuery } from './repos-hook';

const UserReposPage = () => {
	const userLogin = useAppSelector(getUserLogin);
	const dispatch = useAppDispatch();
	const { data, error, fetchNextPage, isLoading, isSuccess } =
		useInfiniteSearchReposQuery({
			login: userLogin as string,
		});

	const observer = useRef<IntersectionObserver>();

	const lastRepoElementRef = useCallback(
		(node: HTMLDivElement) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && data?.pageInfo?.hasNextPage) {
					fetchNextPage();
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, data.pageInfo],
	);

	return (
		<Container>
			<div>{userLogin}Repositories</div>
			{isLoading && <div>Loading...</div>}
			{error && <div>Error: {error.message}</div>}
			{data && (
				<VStack p='2'>
					{data?.repos?.map((repo, inx, arr) => {
						const isLastElement = inx === arr.length - 1;
						const opt = isLastElement
							? { ref: lastRepoElementRef }
							: {};
						return (
							<Box
								w='100%'
								px='4'
								py='2'
								borderRadius='md'
								bg='gray.100'
								cursor='pointer'
								key={inx}
								{...opt}
							>
								<Text
									fontSize='xl'
									color='blue.500'
									fontWeight='bold'
								>
									{repo.name}
								</Text>
								<Text fontSize='md'>{repo.description}</Text>
								<Flex justifyContent='space-between' mt='2'>
									<Text fontSize='xs'>
										{repo.primaryLanguage}
									</Text>
									<Text fontSize='xs'>
										Updated&nbsp;
										{formatDistance(
											new Date(repo.updatedAt),
											new Date(),
											{ addSuffix: true },
										)}
									</Text>
								</Flex>
							</Box>
						);
					})}
				</VStack>
			)}
		</Container>
	);
};

export default UserReposPage;
