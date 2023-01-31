import {
  Table
  , Column
  , Model
  , DataType
  , BelongsToMany
  , Scopes
  , Unique
  , AllowNull
} from 'sequelize-typescript';
import User from './user';
import UserGroup from './usergroup';

export interface IGroupAttributes {
  name: string;
  comment: string;
  users?: User[];
}

@Scopes(() => ({
  users: {
    include: [
      {
        model: User,
      },
    ],
  },
}))
@Table({ tableName: 'groups', timestamps: false, })
export default class Group extends Model<IGroupAttributes> {
  @Unique
  @AllowNull(false)
  @Column({ type: DataType.STRING, })  
  name!: string;
  
  @Column({ type: DataType.STRING, }) 
  comment: string;

  @BelongsToMany(() => User, () => UserGroup)
  users?: User[];
}
