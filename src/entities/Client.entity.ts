import { 
  Column,
  Entity,
  BeforeInsert,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  OneToOne,
  ManyToMany,
  JoinTable
} from "typeorm";
import { hashSync } from "bcryptjs";
import Address from "./Address.entity";
import Order from "./Order.entity";


@Entity('clients')
class Client {

  @PrimaryGeneratedColumn()
  id: Number

  @Column({ type: "varchar", length: 45 })
  name: string

  @Column({ type: "varchar", length: 45, unique: true })
  email: string

  @Column({ type: "varchar", length: 120})
  password: string

  @Column({ type: "varchar", length: 11, unique: true})
  phone: Number
  
  @CreateDateColumn({ type: "datetime"})
  createdAt: string | Date

  @UpdateDateColumn({ type: "datetime"})
  updatedAt: string | Date

  @DeleteDateColumn({ type: "datetime"})
  deletedAt: string | Date

  @OneToOne(() => Address, (address) => address.id)
  address: Address
  
  @ManyToMany(() => Order, (order) => order.clients)
  orders: Order[]

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password, this.password.length)
  }
}

export default Client