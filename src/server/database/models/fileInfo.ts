import {
  Table
  , Column
  , Model
  , Unique
  , DataType
  , AllowNull
} from 'sequelize-typescript';

export interface IFileInfo {
  name: string | null;
  fileSize: number;
  lastDateUpdate: Date;
  checkSum: number | null;
}

@Table({ timestamps: false, tableName: 'file_info' })
export default class FileInfo extends Model<IFileInfo> {
  @Unique
  @Column({ type: DataType.STRING })
  name!: string;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER.UNSIGNED, field: 'fileSize' })
  fileSize!: number;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  lastDateUpdate!: Date;

  @AllowNull(true)
  @Column({ type: DataType.DATE, field: 'checkSum' })
  checkSum: number;
}
