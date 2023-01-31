import {
  Table
  , Column
  , Model
  , BelongsToMany
  , DataType
  , Default
  , Scopes
  , Unique
  , AllowNull
} from 'sequelize-typescript';
import Group from './group';
import UserGroup from './usergroup';

// const useBcrypt = require('sequelize-bcrypt');

export interface IUserAttributes {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  wrongAttempts: number;
  groups?: Group[];
}

@Scopes(() => ({
  groups: {
    include: [
      {
        model: Group,
      },
    ],
  },
}))
@Table({ tableName: 'user' })
export default class User extends Model<IUserAttributes> {
  @Unique
  @AllowNull(false)
  @Column({ type: DataType.STRING, })
  login!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, })
  password!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, })
  firstName!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING, })
  lastName!: string;
  
  @Default(0)
  @AllowNull(false)
  @Column({ type: DataType.TINYINT, field: 'wrong_attempts', })
  wrongAttempts: number;

  @BelongsToMany(() => Group, () => UserGroup)
  groups?: Group[];
};

// useBcrypt(User, {
//   field: 'password',
//   rounds: 12,
//   compare: 'authenticate',
// });

