import { Route, Routes } from 'react-router-dom';
import { SearchUsersPage } from './features/profile';
import { UserReposPage } from './features/repos';

function App() {
	return (
		<Routes>
			<Route path='/' element={<SearchUsersPage />} />
			<Route path='/repos' element={<UserReposPage />} />
			<Route path='*' element={<div>Not found</div>} />
		</Routes>
	);
}

export default App;
