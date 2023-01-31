import { IMlatTableAttributes } from '../../../database/models/mlat';
import { IMlatClientData } from '../../interfaces/IMlatClientData';
import { getAltitude, getCourseAngle } from './utils';

  export class MlatTransformer {
   
    public static transform(db: IMlatTableAttributes): IMlatClientData {
      return {
        sacSic: db.dsi,
        latitude: db.latitude,
        longitude: db.longitude,
        altitude: getAltitude(db.heightGround, db.heightFoots),
        courseAngle: getCourseAngle(db.velocityX, db.velocityY),
        targetNumber: db.targetNumber,
        callSign: db.targetAddress,
        icao: db.targetIdent,
        squawk: db.squawk,
      }
    }
  }