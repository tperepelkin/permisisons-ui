import {
  Table
  , Column
  , Model
  , DataType
  , NotEmpty
  , AllowNull
} from 'sequelize-typescript';

export interface IAirfieldTableAttributes {
  code: string | null;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  militaryZoneId: number | null;
  militaryZoneName: string | null;
  workAboutSchedule: string | null;
}

@Table({ timestamps: false, tableName: 'airfield' })
export default class Airfield extends Model<IAirfieldTableAttributes> {
  @AllowNull
  @Column({ type: DataType.STRING(4), field: 'code' })
  code: string;

  @NotEmpty
  @Column({ type: DataType.STRING(45) })
  name: string;

  @NotEmpty
  @Column({ type: DataType.STRING(10) })
  type: string;

  @NotEmpty
  @Column({ type: DataType.DOUBLE, field: 'lat' })
  latitude: number;

  @NotEmpty
  @Column({ type: DataType.DOUBLE, field: 'lon' })
  longitude: number;

  @AllowNull
  @Column({ type: DataType.INTEGER.UNSIGNED, field: 'militaryZoneId' })
  militaryZoneId: number;

  @AllowNull
  @Column({ type: DataType.STRING(45), field: 'militaryZoneName' })
  militaryZoneName: string;

  @AllowNull
  @Column({ type: DataType.STRING(1000), field: 'workAboutSchedule' })
  workAboutSchedule: string;
}
