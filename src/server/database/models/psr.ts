import {
  Table
  , Column
  , Model
  , PrimaryKey
  , DataType
} from 'sequelize-typescript';

export interface IPsrTableAttributes {
  dsi: number;
  latitude: number;
  longitude: number;
  heightGround: number;
  velocityX: number;
  velocityY: number;
  targetNumber: number;
  trackStatus: number;
}

@Table({ timestamps: false, tableName: 'psr' })
export default class Psr extends Model<IPsrTableAttributes> {
  @PrimaryKey
  @Column(DataType.SMALLINT)
  dsi: number;

  @Column({ type: DataType.DOUBLE, field: 'B' })
  latitude: number;

  @Column({ type: DataType.DOUBLE, field: 'L' })
  longitude: number;

  @Column({ type: DataType.DOUBLE, field: 'H_ms' })
  heightGround: number;

  @Column({ type: DataType.DOUBLE, field: 'VX' })
  velocityX: number;

  @Column({ type: DataType.DOUBLE, field: 'VY' })
  velocityY: number;

  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'targ_num' })
  targetNumber: number;

  @Column({ type: DataType.INTEGER, field: 'track_status' })
  trackStatus: number;
}
