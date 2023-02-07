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
			{/* <AppBar sx={{ backgroundColor: '#dce1e7' }} className="root-header" position="static">
				<Toolbar>
					<Link style={{ paddingRight: '10px' }} to="/users-registry">Реестр пользователей ВП</Link>
					<Link style={{ paddingRight: '10px' }} to="/aircrafts-registry">Реестр ВС</Link>
					<Link style={{ paddingRight: '10px' }} to="/unmanned-aircrafts-registry">Реестр разрешений на ИВП</Link>
					<Link style={{ paddingRight: '10px' }} to="/permissions-ivp-registry">Реестр БВС</Link>
					<Link style={{ paddingRight: '10px' }} to="/permissions-ivp-bvs-registry">Реестр разрешений на ИВП для БВС</Link>
				</Toolbar>
			</AppBar> */}
			<Routes>
				<Route path="/dashboard" element={<Dashboard />} />
				{/* <Route path="/legal-entities-registry" element={<OrganizationsRegistry />} />
				<Route path="/users-registry" element={<UsersRegistry />} />
				<Route path="/aircraft-registry" element={<AircraftRegistry />} />
				<Route path="/unmanned-aircrafts-registry" element={<UnmannedAircraftRegistry />} />
				<Route path="/permissions-ivp-registry" element={<PermissionsIvpRegistry />} />
				<Route path="/permissions-ivp-bvs-registry" element={<PermissionsIvpBvsRegistry />} /> */}
				<Route path="*" element={<Navigate to="/dashboard" />} />
				{/* <Route path="*" element={<Navigate to="/users-registry" />} /> */}
			</Routes>
		</Router>
	);
};

export default App;
