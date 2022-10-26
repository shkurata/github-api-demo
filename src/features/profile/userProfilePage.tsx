import { EmailIcon, LinkIcon } from '@chakra-ui/icons'
import { Box, Image, Text, Spinner, useToast, VStack, Link } from '@chakra-ui/react'
import { useGetUserProfileQuery } from './GetUserProfile.generated'

const UserProfile = () => {
    const { data, error, isLoading } = useGetUserProfileQuery({ login: 'shkurata' })
    const toast = useToast()
    if (isLoading) {
        return <Spinner />
    }
    if (error) {
        toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
    }
    return (
        <VStack>
            <Box p='2' minW='max-content'>
                <Image borderRadius='full' boxSize='200px' src={data?.user?.avatarUrl} alt={data?.user?.email} />
            </Box>
            <Box>
                <Text fontWeight='bold' fontSize='lg'>
                    {data?.user?.name}
                </Text>
                <Text>
                    <EmailIcon mr='2' />
                    {data?.user?.email}
                </Text>
                <Link>
                    <LinkIcon mr='2' />
                    {data?.user?.websiteUrl}
                </Link>
                <Text>Repos count: {data?.user?.repositories.totalCount}</Text>
            </Box>
        </VStack>
    )
}

export default UserProfile
