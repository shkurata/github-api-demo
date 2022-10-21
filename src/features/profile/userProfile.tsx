import { Badge, Box, Container, Image } from '@chakra-ui/react'
import { useGetUserProfileQuery } from './GetUserProfile.generated'

const UserProfile = () => {
    const { data, error, isLoading } = useGetUserProfileQuery({ login: 'shkurata' })
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error.message}</div>
    }
    return (
        <Container>
            <Box borderRadius='full'>
                <Image src={data?.user?.avatarUrl} alt={data?.user?.email} />
            </Box>
            <Badge>{data?.user?.email}</Badge>
        </Container>
    )
}

export default UserProfile
