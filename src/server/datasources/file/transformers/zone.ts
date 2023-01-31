import { isArray, omit } from 'lodash';
import { IZoneAttributes } from "../../../database/models/zone";
import { IZoneData } from "../../interfaces/IZoneData";
import { FileTransformer } from "./fileTransformer";

export class ZoneTransformer implements FileTransformer<IZoneAttributes, IZoneData> {
  public transformToDbModel(line: string): IZoneAttributes {
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

    const roundTheClock = Number.parseInt(fields[5]);
    const isRoundTheClock = Number.isNaN(roundTheClock) || roundTheClock === 0 ? false : true;
    const milRCRawValue = Number.parseFloat(fields[8]);
    const milRCId = Number.isNaN(milRCRawValue) ? null : milRCRawValue;
    let name = fields[1]?.trim() ?? '';

    return {
      id: Number.parseInt(fields[0]),
      name,
      flags: fields[2],
      regulations: fields[3],
      icao: fields[4],
      isRoundTheClock,
      type: fields[6],
      belonging: fields[7],
      milRCId,
    };
  }

  public transformToClientModel(record: IZoneAttributes): IZoneData {
    return Object.assign(
      {}
      , { ...record }
      , { icao: record.icao ?? '' }
      , { flags: record.flags ?? '' }
      , { regulations: record.regulations ?? '' }
      , { type: record.type ?? '' }
      , { belonging: record.belonging ?? '' }
      , { milRCId: !isArray(record.milRCId) ? [] : record.milRCId }
    );
  }
}
