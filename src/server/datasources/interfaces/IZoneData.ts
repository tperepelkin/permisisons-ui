import { IZoneAttributes } from "../../database/models/zone";

// Используем те же имена полей при отправке на клиента, что и в модели для базы
export interface IZoneData extends IZoneAttributes {
}

export type INackedZoneData = Omit<IZoneAttributes, 'boundaries'>;