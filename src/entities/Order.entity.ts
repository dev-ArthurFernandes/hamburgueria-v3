import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import Client from './Client.entity';
import Product from './Product.entity';

export enum Status {
  SEND = "send",
  PROCESSING = "em processo",
  DELIVERY = "em entrega",
  FINISHED = "finalizado"
}

@Entity("orders")
class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  totalPrice: number;

  @Column({ type: "enum", enum: Status })
  status: Status;

  @CreateDateColumn({ type: "datetime" })
  createdAt: string | Date;

  @ManyToMany(() => Client, (client) => client.orders)
  @JoinTable()
  clients: Client[];

  @ManyToMany(() => Product, (product) => product.orders)
  @JoinTable()
  products: Product[]
}

export default Order