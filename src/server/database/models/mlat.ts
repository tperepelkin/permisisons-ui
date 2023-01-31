import {
  Table
  , Column
  , Model
  , PrimaryKey
  , DataType
} from 'sequelize-typescript';

export interface IMlatTableAttributes {
  dsi: number;
  latitude: number;
  longitude: number;
  heightFoots: number;
  heightGround: number;
  velocityX: number;
  velocityY: number;
  targetNumber: number;
  targetAddress: number;
  targetIdent: string;
  squawk: number;
}

@Table({ timestamps: false, tableName: 'mlat' })
export default class Mlat extends Model<IMlatTableAttributes> {
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

  @Column({ type: DataType.DOUBLE, field: 'VX' })
  velocityX: number;

  @Column({ type: DataType.DOUBLE, field: 'VY' })
  velocityY: number;

  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'targ_num' })
  targetNumber: number;

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
}
