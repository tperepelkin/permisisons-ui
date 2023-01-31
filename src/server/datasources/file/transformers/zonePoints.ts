import { IZonePointAttributes } from '../../../database/models/zonePoint';
import { IZonePointData } from '../../interfaces/IZonePointData';
import { FileTransformer } from "./fileTransformer";

export class ZonePointsTransformer implements FileTransformer<IZonePointAttributes, IZonePointData> {
  public transformToDbModel(line: string): IZonePointAttributes {
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

    return {
      // id: Number.parseInt(fields[0]),
      boundaryId: Number.parseInt(fields[1]),
      latitude: Number.parseFloat(fields[2]),
      longitude: Number.parseFloat(fields[3]),
    };
  }

  public transformToClientModel(record: IZonePointAttributes): IZonePointData {
    return Object.assign(
      {},
      {
        latitude: record.latitude,
        longitude: record.longitude,
      }
    );
  }
}
