import { injectable } from 'inversify';
import { IAdsbClientData } from '../../server/datasources/interfaces/IAdsbClientData';
import { IMlatClientData } from '../../server/datasources/interfaces/IMlatClientData';
import { IPsrClientData } from '../../server/datasources/interfaces/IPsrClientData';
import { IAirFieldData } from '../../server/datasources/interfaces/IAirfieldData';
import { IZoneData } from '../../server/datasources/interfaces/IZoneData';
import { IAirNavigationAPI } from './interfaces';
import { ApiBase } from './apiBase';

export const AIR_NAVIGATION_API = 'IAirNavigationApi';

@injectable()
export class AirNavigationApi extends ApiBase implements IAirNavigationAPI {
    getBaseUrl() {
        return '';
    }

    getAdsbList(): Promise<Array<IAdsbClientData>> {
        return this.request<IAdsbClientData[]>({
            method: 'get',
            url: 'navigation/adsb',
        });
    }
    getMlatList(): Promise<Array<IMlatClientData>> {
        return this.request<IMlatClientData[]>({
            method: 'get',
            url: 'navigation/mlat',
        });

    }
    getPsrList(): Promise<Array<IPsrClientData>> {
        return this.request<IPsrClientData[]>({
            method: 'get',
            url: 'navigation/psr',
        });
    }
    getAirdromesList(): Promise<Array<IAirFieldData>> {
        return this.request<Array<IAirFieldData>>({
            method: 'get',
            url: 'navigation/airdromes',
        });
    }
    getZonesList(): Promise<Array<IZoneData>> {
        return this.request<Array<IZoneData>>({
            method: 'get',
            url: 'navigation/zones',
        });
    }
}
