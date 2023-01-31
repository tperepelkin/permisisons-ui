import {
  Table
  , Column
  , Model
  , DataType
  , NotEmpty
  , HasMany
  , ForeignKey
  , Scopes
  , PrimaryKey
} from 'sequelize-typescript';
import Zone from './zone';
import ZonePoint from './zonePoint';

export interface IZoneBoundaryAttributes {
  id: number;
  zoneId: number;
  heightMin: number;
  heightMax: number;
  points?: Array<ZonePoint>;
}

@Scopes(() => ({
  boundaries: {
    include: [
      {
        model: ZonePoint,
        attributes: {
          exclude: ['boundaryId'],
        },
      },
    ],
  },
}))
@Table({ timestamps: false, tableName: 'zoneBoundary' })
export default class ZoneBoundary extends Model<IZoneBoundaryAttributes> {
  @NotEmpty
  @PrimaryKey
  @Column({ type: DataType.INTEGER.UNSIGNED })
  id: number;

  @NotEmpty
  @Column({ type: DataType.INTEGER.UNSIGNED, field: 'heightMin', comment: 'Минимальная высота', })
  heightMin: number;

  @NotEmpty
  @Column({ type: DataType.INTEGER.UNSIGNED, field: 'heightMax', comment: 'Максимальная высота', })
  heightMax: number;

  @ForeignKey(() => Zone)
  @Column({ type: DataType.INTEGER.UNSIGNED, field: 'zoneId', comment: 'Идентификатор зоны или района', })
  zoneId!: number;

  @HasMany(() => ZonePoint) points: Array<ZonePoint>;
}
