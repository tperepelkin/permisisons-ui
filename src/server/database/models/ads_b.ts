import {
  Table
  , Column
  , Model
  , PrimaryKey
  , DataType
  , Default
} from 'sequelize-typescript';

export interface IAdsbTableAttributes {
  dsi: number;
  latitude: number;
  longitude: number;
  heightFoots: number;
  heightGround: number;
  courseAngle: number;
  emitCategory: number;
  targetNumber: number;
  targetAddress: number;
  targetIdent: string;
  squawk: number;
}

@Table({ timestamps: false, tableName: 'ads_b' })
export default class Adsb extends Model<IAdsbTableAttributes> {
  @PrimaryKey
  @Column(DataType.SMALLINT)
  dsi: number;

  @Column({ type: DataType.DOUBLE, field: 'B' })
  latitude: number;

  @Column({ type: DataType.DOUBLE, field: 'L' })
  longitude: number;

  @Column({ type: DataType.DOUBLE, field: 'H_fl' })
  heightFoots: number;

  @Column({ type: DataType.DOUBLE, field: 'H_gh' })
  heightGround: number;

  @Column({ type: DataType.DOUBLE, field: 'angel_grd' })
  courseAngle: number;

  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'targ_num' })
  targetNumber: number;

  @PrimaryKey
  @Column({
    type: DataType.INTEGER.UNSIGNED, field: 'target_adress', get() {
      return this.getDataValue('targetAddress').toString(16).toUpperCase();
    }
  })
  targetAddress: number;

  @Column({
    type: DataType.STRING, field: 'target_ident', get() {
      return this.getDataValue('targetIdent').trim();
    }
  })
  targetIdent: string;

  @Column({ type: DataType.SMALLINT.UNSIGNED, field: 'M3A_code' })
  squawk: number;

  @Default(0)
  @Column({ type: DataType.TINYINT.UNSIGNED, field: 'emit_cat' })
  emitCategory: number;
}
