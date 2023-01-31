import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { chain, groupBy, isArray, intersection } from 'lodash';
import { IAdsbClientData } from '../../../server/datasources/interfaces/IAdsbClientData'
import { IAirFieldData } from '../../../server/datasources/interfaces/IAirfieldData';
import { IMlatClientData } from '../../../server/datasources/interfaces/IMlatClientData'
import { IPsrClientData } from '../../../server/datasources/interfaces/IPsrClientData'
import { IZoneData } from '../../../server/datasources/interfaces/IZoneData';

type groupsToggleType = { [key: number]: boolean } | Record<number, never>;

export interface IMapInfo {
    adsbList: Array<IAdsbClientData>;
    mlatList: Array<IMlatClientData>;
    psrList: Array<IPsrClientData>;
    airdromesList: Array<IAirFieldData>;
    zonesList: Array<IZoneData>;
    adsbGroupsToggler: groupsToggleType;
    mlatGroupsToggler: groupsToggleType;
    psrGroupsToggler: groupsToggleType;
}

export const initialState: IMapInfo = {
    adsbList: [],
    mlatList: [],
    psrList: [],
    airdromesList: [],
    zonesList: [],
    adsbGroupsToggler: {},
    mlatGroupsToggler: {},
    psrGroupsToggler: {},
}

export const mapSlice = createSlice({
    name: 'mapInfo',
    initialState: initialState as IMapInfo,
    reducers: {
        setAdsb: (state, action: PayloadAction<Array<IAdsbClientData>>) => {
            state.adsbList = action.payload;
            // Получим список групп АДСН из очередного обновления
            const newGroupsList: Array<number> =
                chain(action.payload).groupBy('sacSic').keys().map(it => parseInt(it)).value();
            // Если старых групп в нём нет - отбросим их, если присутствуют - скопируем признак видимости
            state.adsbGroupsToggler = newGroupsList.reduce((acc: groupsToggleType, it) => {
                acc[it] = state.adsbGroupsToggler[it] ?? false;
                return acc;
            }, {});
        },
        setMlat: (state, action: PayloadAction<Array<IMlatClientData>>) => {
            state.mlatList = action.payload;
            // Получим список групп МЛАТ из очередного обновления
            const newGroupsList: Array<number> =
                chain(action.payload).groupBy('sacSic').keys().map(it => parseInt(it)).value();
            // Если старых групп в нём нет - отбросим их, если присутствуют - скопируем признак видимости
            state.mlatGroupsToggler = newGroupsList.reduce((acc: groupsToggleType, it) => {
                acc[it] = state.mlatGroupsToggler[it] ?? false;
                return acc;
            }, {});
        },
        setPsr: (state, action: PayloadAction<Array<IPsrClientData>>) => {
            // Получим список групп ПСР из очередного обновления
            const newGroupsList: Array<number> =
                chain(action.payload).groupBy('sacSic').keys().map(it => parseInt(it)).value();
            // Если старых групп в нём нет - отбросим их, если присутствуют - скопируем признак видимости
            state.psrGroupsToggler = newGroupsList.reduce((acc: groupsToggleType, it) => {
                acc[it] = state.psrGroupsToggler[it] ?? false;
                return acc;
            }, {});

            state.psrList = action.payload;
        },
        setAirdromesList: (state, action: PayloadAction<Array<IAirFieldData>>) => {
            state.airdromesList = action.payload;
        },
        setZonesList: (state, action: PayloadAction<Array<IZoneData>>) => {
            state.zonesList = action.payload;
        },
        toggleAdsbGroup: (state, action: PayloadAction<number>) => {
            const value = state.adsbGroupsToggler[action.payload];
            if (value !== undefined) {
                state.adsbGroupsToggler[action.payload] = !value;
            } else {
                console.error('Can not find key with name:', action.payload);
            }
        },
        toggleMlatGroup: (state, action: PayloadAction<number>) => {
            const value = state.mlatGroupsToggler[action.payload];
            if (value !== undefined) {
                state.mlatGroupsToggler[action.payload] = !value;
            } else {
                console.error('Can not find key with name:', action.payload);
            }
        }
        ,
        togglePsrGroup: (state, action: PayloadAction<number>) => {
            const value = state.psrGroupsToggler[action.payload];
            if (value !== undefined) {
                state.psrGroupsToggler[action.payload] = !value;
            } else {
                console.error('Can not find key with name:', action.payload);
            }
        }

    }
});