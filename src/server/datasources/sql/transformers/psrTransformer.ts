import { IPsrTableAttributes } from '../../../database/models/psr';
import { IPsrClientData } from '../../interfaces/IPsrClientData';
import { getCourseAngle } from './utils';

  export class PsrTransformer {
   
    public static transform(db: IPsrTableAttributes): IPsrClientData {
      return {
        sacSic: db.dsi,
        latitude: db.latitude,
        longitude: db.longitude,
        altitude: db.heightGround,
        courseAngle: getCourseAngle(db.velocityX, db.velocityY),
        targetNumber: db.targetNumber,
        trackStatus: db.trackStatus,
      }
    }
  }