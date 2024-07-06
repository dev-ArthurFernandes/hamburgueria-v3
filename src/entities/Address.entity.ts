import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne
} from "typeorm"
import Client from "./Client.entity";

@Entity("addresses")
class Address {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  street: string;

  @Column({ type: "integer" })
  number: number;

  @Column({ type: "integer" })
  zipCode: number;

  @Column({ type: "varchar" })
  city: string

  @OneToOne(() => Client, (client) => client.address)
  client: Client;

}

export default Address;