import { Route, Routes } from 'react-router-dom'
import { UserProfilePage } from './features/profile'
import { SearchUsersPage } from './features/search'

function App() {
    return (
        <Routes>
            <Route path='/' element={<UserProfilePage />} />
            <Route path='/search' element={<SearchUsersPage />} />
            <Route path='*' element={<div>Not found</div>} />
        </Routes>
    )
}

export default App
