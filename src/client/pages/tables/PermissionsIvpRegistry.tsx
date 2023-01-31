import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Container, Box } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../store/rootReducer';

export const PermissionsIvpRegistry = () => {
	// const adsbList = useSelector((state: RootState) => state.map.adsbList);

	return (
		<Container maxWidth="lg">
			<Box>
				<h1 className="text-primary text-center"></h1>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								Sac Sic
							</TableCell>
							<TableCell>
								Target Number
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
							<TableRow>
								<TableCell>
									123
								</TableCell>
								<TableCell>
									234
								</TableCell>
							</TableRow>
					</TableBody>
				</Table>
			</Box>
		</Container>
	);
};

export default PermissionsIvpRegistry;
