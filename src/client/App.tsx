import * as React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import { AircraftRegistry, UnmannedAircraftRegistry, PermissionsIvpRegistry, PermissionsIvpBvsRegistry } from './pages/tables';
// import { useInterval } from 'usehooks-ts'
// import { useInjection } from './hooks/intensifyContextProvider';
// import { AIR_NAVIGATION_API } from './services/airNavigationApi';
// import { IAirNavigationAPI } from './services/interfaces';
// import { useDispatch } from 'react-redux';
// import { mapSlice } from './store/slices/map.slice';

import './App.scss';
import UsersCard from './pages/tables/UserCard';
import OrganizationCard from './pages/tables/OrganizationCard';
import Dashboard from './components/Dashboard/Dashboard';

interface AppProps { }

const App = (props: AppProps) => {
	// const backend = useInjection<IAirNavigationAPI>(AIR_NAVIGATION_API);
	// const dispatch = useDispatch();

	return (
		<Router>
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="*" element={<Navigate to="/dashboard" />} />
			</Routes>
		</Router>
	);
};

export default App;
