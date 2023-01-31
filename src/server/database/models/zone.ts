import {
  Table
  , Column
  , Model
  , DataType
  , NotEmpty,
  HasMany,
  Scopes,
  PrimaryKey,
  AllowNull
} from 'sequelize-typescript';
import ZoneBoundary from './zoneBoundary';
import ZonePoint from './zonePoint';

export interface IZoneAttributes {
  id: number;
  name: string;
  icao: string;
  flags: string;
  isRoundTheClock: boolean;
  regulations: string;
  type: string;
  belonging: string;
  milRCId: number | null;

  boundaries?: Array<ZoneBoundary>;
}

@Scopes(() => ({
  boundaries: {
    include: [
      {
        model: ZoneBoundary,
        include: [
          {
            model: ZonePoint,
            attributes: {
              exclude: ['id', 'boundaryId'],
            },
          }
        ],
        attributes: {
          exclude: ['id', 'zoneId'],
        }
      },
    ],
  },
}))
@Table({ timestamps: false, tableName: 'zone' })
export default class Zone extends Model<IZoneAttributes> {
  @NotEmpty
  @PrimaryKey
  @Column({ type: DataType.INTEGER.UNSIGNED })
  id: number;

  @NotEmpty
  @Column({ type: DataType.STRING(200), comment: 'Наименование зоны или района', })
  name: string;

  @AllowNull
  @Column({ type: DataType.STRING(45), comment: 'Код ИКАО зоны или района', })
  icao: string;

  @AllowNull
  @Column({ type: DataType.STRING, comment: 'Признак типа зоны или района', })
  flags: string;

  @NotEmpty
  @Column({ type: DataType.BOOLEAN, comment: 'Признак круглосуточной работы зоны', })
  isRoundTheClock: boolean;

  @AllowNull
  @Column({ type: DataType.STRING(200), comment: 'Регламент работы', })
  regulations: string;

  @AllowNull
  @Column({ type: DataType.STRING(10), comment: 'Тип зоны или района', })
  type: string;

  @AllowNull
  @Column({ type: DataType.STRING(45), comment: 'Принадлежность региону', })
  belonging: string;

  @AllowNull
  @Column({ type: DataType.INTEGER.UNSIGNED, field: 'milRcId', comment: 'Код внетрассового РЦ, в который входит данная зона или район', })
  milRCId: number;

  @HasMany(() => ZoneBoundary) boundaries?: Array<ZoneBoundary>;
}
