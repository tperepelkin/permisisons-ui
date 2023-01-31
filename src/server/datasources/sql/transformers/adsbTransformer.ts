import { IAdsbTableAttributes } from '../../../database/models/ads_b';
import { IAdsbClientData } from '../../interfaces/IAdsbClientData';
import { getAltitude } from './utils';

  export class AdsbTransformer {
    public static transform(db: IAdsbTableAttributes): IAdsbClientData {
      return {
        sacSic: db.dsi,
        latitude: db.latitude,
        longitude: db.longitude,
        altitude: getAltitude(db.heightGround, db.heightFoots),
        courseAngle: db.courseAngle,
        targetNumber: db.targetNumber,
        callSign: db.targetIdent,
        icao: db.targetAddress,
        squawk: db.squawk,
        planeType: db.emitCategory,
      }
    }
  }