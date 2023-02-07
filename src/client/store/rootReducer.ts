import { combineReducers } from '@reduxjs/toolkit';
import { mapSlice } from './slices/map.slice';
import { appConfigSlice } from './slices/appConfig.slice';
import { modalsSlice } from './slices/modals.slice';
import { snackbarSlice } from './slices/snackbar.slice';
import { dashboardSlice } from './slices/dashboard.slice';

export const rootReducer = combineReducers({
    dashboard: dashboardSlice.reducer,
    map: mapSlice.reducer,
    snackbar: snackbarSlice.reducer,
    appConfig: appConfigSlice.reducer,
    modals: modalsSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
