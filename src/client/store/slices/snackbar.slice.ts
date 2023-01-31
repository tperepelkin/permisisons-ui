import { Snackbar, SnackbarClassKey } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAdsbClientData } from '../../../server/datasources/interfaces/IAdsbClientData'
import { IMlatClientData } from '../../../server/datasources/interfaces/IMlatClientData'
import { IPsrClientData } from '../../../server/datasources/interfaces/IPsrClientData'

export enum SnackbarTypeEnum {
    success = 'success',
    warn = 'warn',
    error = 'error',
    info = 'info'
};

export type SnackbarType = keyof typeof SnackbarTypeEnum;

export interface ISnackbarState {
    open: boolean;
    type: SnackbarType;
    message: string;
}

export const initialState: ISnackbarState = {
    open: false,
    type: SnackbarTypeEnum[SnackbarTypeEnum.success] as SnackbarType,
    message: '',
}

export const snackbarSlice = createSlice({
    name: 'mapInfo',
    initialState: initialState as ISnackbarState,
    reducers: {
        setSnackbar: (state, action: PayloadAction<ISnackbarState>) => {
            const { open , type, message } = action.payload;
            state.open = open;
            state.type = type;
            state.message = message;
        },
        showSuccess: (state, action: PayloadAction<string>) => {
            state.open = true;
            state.type = SnackbarTypeEnum[SnackbarTypeEnum.success] as SnackbarType;
            state.message = action.payload;
        },
        showWarning: (state, action: PayloadAction<string>) => {
            state.open = true;
            state.type = SnackbarTypeEnum[SnackbarTypeEnum.warn] as SnackbarType;
            state.message = action.payload;
        },
        showError: (state, action: PayloadAction<string>) => {
            state.open = true;
            state.type = SnackbarTypeEnum[SnackbarTypeEnum.error] as SnackbarType;
            state.message = action.payload;
        },
        showInfo: (state, action: PayloadAction<string>) => {
            state.open = true;
            state.type = SnackbarTypeEnum[SnackbarTypeEnum.info] as SnackbarType;
            state.message = action.payload;
        },
        resetSnackbar: (state) => {
            state = initialState;
        },
    }
});