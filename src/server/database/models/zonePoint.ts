import { DataTypes } from 'sequelize';
import {
  Table
  , Column
  , Model
  , DataType
  , NotEmpty
  , ForeignKey
  , PrimaryKey,
} from 'sequelize-typescript';
import ZoneBoundary from './zoneBoundary';

export interface IZonePointAttributes {
  boundaryId: number;
  latitude: number;
  longitude: number;
}

@Table({ timestamps: false, tableName: 'zonePoint', })
export default class ZonePoint extends Model<IZonePointAttributes> {
  @NotEmpty
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataTypes.UUIDV4, })
  id!: string;

  @NotEmpty
  @Column({ type: DataType.DOUBLE, field: 'latitude', comment: 'Широта точки', })
  latitude: number;

  @NotEmpty
  @Column({ type: DataType.DOUBLE, field: 'longitude', comment: 'Долгота точки', })
  longitude: number;

  @ForeignKey(() => ZoneBoundary)
  @Column({ type: DataType.INTEGER.UNSIGNED, field: 'boundaryId', comment: 'Идентификатор границы зоны или района', })
  boundaryId!: number;
}
