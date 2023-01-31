import { omit } from 'lodash';
import { IZoneBoundaryAttributes } from '../../../database/models/zoneBoundary';
import { IZoneBoundaryData } from '../../interfaces/IZoneBoundaryData';
import { FileTransformer } from "./fileTransformer";

export class ZoneBoundariesTransformer implements FileTransformer<IZoneBoundaryAttributes, IZoneBoundaryData> {
  public transformToDbModel(line: string): IZoneBoundaryAttributes {
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
      id: Number.parseInt(fields[0], 10),
      zoneId: Number.parseInt(fields[1], 10),
      heightMin: Number.parseInt(fields[2], 10),
      heightMax: Number.parseInt(fields[3], 10),
    };
  }

  public transformToClientModel(record: IZoneBoundaryAttributes): IZoneBoundaryData {
    return Object.assign(
      {}
      , { ...omit(record, ['zoneId']) }
    );
  }
}
