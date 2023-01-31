import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAdsbClientData } from '../../../server/datasources/interfaces/IAdsbClientData'
import { IMlatClientData } from '../../../server/datasources/interfaces/IMlatClientData'
import { IPsrClientData } from '../../../server/datasources/interfaces/IPsrClientData'
import { SourceType } from '../../interfaces/sources';

type EmptyInfoPanelRecordType = Record<string, never>;
type InfoPanelRecordType = IAdsbClientData | IMlatClientData | IPsrClientData;

type RecordType = {
    dsi: number;
    targetNumber: number;
    type: SourceType;
};

export interface IModalsState {
    infoPanelIsOpen: boolean;
    infoPanelRecord: InfoPanelRecordType | EmptyInfoPanelRecordType;
    recordType: SourceType | undefined;
}

export const initialState: IModalsState = {
    infoPanelIsOpen: false,
    infoPanelRecord: {},
    recordType: undefined,
}

export const modalsSlice = createSlice({
    name: 'modals',
    initialState: initialState as IModalsState,
    reducers: {
        toggleInfoPanel: (state, action: PayloadAction<boolean | undefined>) => {
            if (action.payload === undefined) {
                state.infoPanelIsOpen = !state.infoPanelIsOpen;
            } else {
                state.infoPanelIsOpen = action.payload;
            }
        },
        setInfoPanelRecord: (state, action: PayloadAction<{ record: InfoPanelRecordType, type: SourceType }>) => {
            state.infoPanelRecord = action.payload.record;
            state.recordType = action.payload.type;
        },
        resetInfoPanelRecord: (state) => {
            state.infoPanelRecord = {};
            state.recordType = undefined;
        },
    }
});