import { IAdsbClientData } from '../../server/datasources/interfaces/IAdsbClientData'
import { IMlatClientData } from '../../server/datasources/interfaces/IMlatClientData'
import { IPsrClientData } from '../../server/datasources/interfaces/IPsrClientData'
import { IAirFieldData } from '../../server/datasources/interfaces/IAirfieldData';
import { IZoneData } from '../../server/datasources/interfaces/IZoneData';

export interface IAirNavigationAPI {
    getAdsbList(): Promise<Array<IAdsbClientData>>;
    getMlatList(): Promise<Array<IMlatClientData>>;
    getPsrList(): Promise<Array<IPsrClientData>>;
    getAirdromesList(): Promise<Array<IAirFieldData>>;
    getZonesList(): Promise<Array<IZoneData>>;
}
