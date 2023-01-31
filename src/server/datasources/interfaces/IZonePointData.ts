import { IZonePointAttributes } from '../../database/models/zonePoint';

// Используем те же имена полей при отправке на клиента, что и в модели для базы
export type IZonePointData = Omit<IZonePointAttributes, 'boundaryId' | 'id'>;
