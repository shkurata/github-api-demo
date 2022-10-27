import { Route, Routes } from 'react-router-dom';
import { SearchUsersPage } from './features/profile';

function App() {
	return (
		<Routes>
			<Route path='/' element={<SearchUsersPage />} />
			<Route path='*' element={<div>Not found</div>} />
		</Routes>
	);
}

export default App;
