import {
  Table, Column, Model
  , ForeignKey
  , DataType
} from 'sequelize-typescript';
import User from './user';
import Group from './group';

export interface IUserGroupAttributes {
  userId: number;
  groupId: number;
}

@Table({ tableName: 'user_group', timestamps: false, })
export default class UserGroup extends Model<IUserGroupAttributes> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, })   
  userId!: number;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, })   
  groupId!: number;
}
