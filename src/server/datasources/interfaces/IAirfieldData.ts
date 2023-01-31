import { IAirfieldTableAttributes } from "../../database/models/airfield";

// Используем те же имена полей при отправке на клиента, что и в модели для базы
export interface IAirFieldData extends IAirfieldTableAttributes {
}