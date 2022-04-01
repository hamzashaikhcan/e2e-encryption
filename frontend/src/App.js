import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './Pages/Index';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route exact path='/' element={<Index />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/login' element={<Login />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
