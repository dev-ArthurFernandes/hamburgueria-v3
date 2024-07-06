import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany
} from "typeorm"
import Order from "./Order.entity";

export enum Category {
  HAMBURGER = "Hambúrguer",
  DRINKS = "Bebidas",
  ADDONS = "complementos",
  DESSERTS = "sobremesas"
}


@Entity("products")
class Product {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45})
  title: string;

  @Column({ type: "enum", enum: Category })
  category: Category;

  @Column({ type: "integer" })
  price: number;

  @Column({ type: "varchar" })
  observation: string;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];

}

export default Product