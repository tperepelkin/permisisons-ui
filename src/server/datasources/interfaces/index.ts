import { IAdsbClientData } from "./IAdsbClientData";
import { IMlatClientData } from "./IMlatClientData";
import { IPsrClientData } from "./IPsrClientData";
import { IAirFieldData } from "./IAirfieldData";

export interface IDatasource {
    getAdsbList(): Array<IAdsbClientData>;
    getMlatList(): Array<IMlatClientData>;
    getPsrList(): Array<IPsrClientData>;
    getAirfieldsList(): Array<IAirFieldData>;
}