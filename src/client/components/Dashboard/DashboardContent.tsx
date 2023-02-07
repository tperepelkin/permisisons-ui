import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Users from './Users';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import EmptyDashboardContent from './EmptyDashboardContent';
import Organizations from './Organizations';

export function DashboardContent() {
  const currentNavMenuItem = useSelector((state: RootState) => state.dashboard.currentNavMenuItem);
  console.log('currentNavMenuItem', currentNavMenuItem);
  return (
    //   {/* Chart */ }
    //     {/* <Grid item xs={12} md={8} lg={9}>
    //       <Paper
    //         sx={{
    //           p: 2,
    //           display: 'flex',
    //           flexDirection: 'column',
    //           height: 240,
    //         }}
    //       >
    //         <Chart />
    //       </Paper>
    //     </Grid> */}
    // {/* Recent Deposits */ }
    // {/* <Grid item xs={12} md={4} lg={3}>
    //       <Paper
    //         sx={{
    //           p: 2,
    //           display: 'flex',
    //           flexDirection: 'column',
    //           height: 240,
    //         }}
    //       >
    //         <Deposits />
    //       </Paper>
    //     </Grid> */}
    // {/* Recent Orders */ }
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        {currentNavMenuItem==='' && <EmptyDashboardContent />}
        {currentNavMenuItem==='user' && <Users />}
        {currentNavMenuItem==='organization' && <Organizations />}
      </Paper>
    </Grid>
  );
}
