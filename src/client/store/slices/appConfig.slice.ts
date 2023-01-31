import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppConfigState {
    baseUrl: string;
    config?: object;
}

export const initialState: IAppConfigState = {
    baseUrl: '',
    config: {},
}

export const appConfigSlice = createSlice({
    name: 'mapInfo',
    initialState: initialState as IAppConfigState,
    reducers: {
        setBaseUrl: (state, action: PayloadAction<string>) => {
            state.baseUrl = action.payload;
        },
        setConfig: (state, action: PayloadAction<Object>) => {
            state.config = action.payload;
        },
    }
});