import { IZoneBoundaryAttributes } from "../../database/models/zoneBoundary";

// Используем те же имена полей при отправке на клиента, что и в модели для базы
export type IZoneBoundaryData = Omit<IZoneBoundaryAttributes, 'zoneId'>;
