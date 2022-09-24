import {
  Table,
  Column,
  Model,
  DataType,
} from 'sequelize-typescript';

/* ----------------------------------------- */

@Table
export class Transportation extends Model {

  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public id?: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  owner_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vehicle_identification: string;

  @Column ({
    type: DataType.FLOAT,
    allowNull: false,
  })
  volume_capacity: number;

  @Column ({
    type: DataType.FLOAT,
    allowNull: false,
  })
  weight_capacity: number;

  @Column ({
    type: DataType.STRING,
    allowNull: false,
  })
  cellphone_number: string;

  @Column ({
    type: DataType.INTEGER,
    allowNull: false,
  })
  zone_id: number;
  
}

/* ----------------------------------------- */
