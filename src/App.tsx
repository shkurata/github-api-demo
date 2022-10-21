import { Route, Routes } from 'react-router-dom'
import UserProfile from './features/profile/userProfile'

function App() {
    return (
        <Routes>
            <Route path='/' element={<UserProfile />} />
        </Routes>
    )
}

export default App
