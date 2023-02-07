import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chain, groupBy, isArray, intersection } from 'lodash';
import { IAdsbClientData } from '../../../server/datasources/interfaces/IAdsbClientData'
import { IAirFieldData } from '../../../server/datasources/interfaces/IAirfieldData';
import { IMlatClientData } from '../../../server/datasources/interfaces/IMlatClientData'
import { IPsrClientData } from '../../../server/datasources/interfaces/IPsrClientData'
import { IZoneData } from '../../../server/datasources/interfaces/IZoneData';

export interface IDashboard {
    currentNavMenuItem: string;
}

export const initialState: IDashboard = {
    currentNavMenuItem: '',
}

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState as IDashboard,
    reducers: {
        setNavMenuItem: (state, action: PayloadAction<string>) => {
            state.currentNavMenuItem = action.payload;
        },
    }
});