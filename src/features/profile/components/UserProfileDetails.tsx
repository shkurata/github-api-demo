import { EmailIcon, LinkIcon } from '@chakra-ui/icons';
import { VStack, Box, Image, Text, Link } from '@chakra-ui/react';
import { UserProfile } from '../interfaces';

type UserProfileDetailsProps = {
	user: UserProfile;
};

const UserProfileDetails = ({ user }: UserProfileDetailsProps) => {
	return (
		<VStack>
			{user.avatarUrl && (
				<Box p='2' minW='max-content'>
					<Image
						borderRadius='full'
						boxSize='200px'
						src={user.avatarUrl}
						alt={user.email || ''}
					/>
				</Box>
			)}
			<Box>
				{user.name && (
					<Text fontWeight='bold' fontSize='lg'>
						{user.name}
					</Text>
				)}
				{user.email && (
					<Text>
						<EmailIcon mr='2' />
						{user.email}
					</Text>
				)}
				{user.websiteUrl && (
					<Link>
						<LinkIcon mr='2' />
						{user.websiteUrl}
					</Link>
				)}
				<Text>Repos count: {user.repositories.totalCount}</Text>
			</Box>
		</VStack>
	);
};

export default UserProfileDetails;
