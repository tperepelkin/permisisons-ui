import { IAirfieldTableAttributes } from "../../../database/models/airfield";
import { IAirFieldData } from "../../interfaces/IAirfieldData";
import { FileTransformer } from "./fileTransformer";

export class AirdromeTransformer implements FileTransformer<IAirFieldData, IAirfieldTableAttributes> {
  public transformToDbModel(line: string): IAirfieldTableAttributes {
    let fields: Array<string>;
    // Поля внутри строки разделены табуляцией
    fields = line.split('\t').map(it => {
      // Каждое поле в кавычках. Снимем их или вернём пустоую строку в случае ошибки
      try {
        return it.substring(1, it.length - 1);
      } catch (e) {
        return '';
      }
    });

    let militaryZoneId = Number.parseInt(fields[6]);
    if (isNaN(militaryZoneId)) {
      militaryZoneId = null;
    }

    return {
      code: fields[1] || null,
      name: fields[2],
      type: fields[3],
      latitude: Number.parseFloat(fields[4]),
      longitude: Number.parseFloat(fields[5]),
      militaryZoneId,
      militaryZoneName: fields[7] || null,
      workAboutSchedule: fields[8] || null,
    };
  }

  public transformToClientModel(record: IAirfieldTableAttributes): IAirFieldData {
    return Object.assign(
      {}
      , { ...record }
      , { militaryZoneName: record.militaryZoneName ?? '' }
      , { workAboutSchedule: record.workAboutSchedule ?? '' }
    );
  }
}
