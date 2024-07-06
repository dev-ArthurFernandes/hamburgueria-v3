import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1720128316855 implements MigrationInterface {
    name = 'CreateTable1720128316855'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`addresses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`street\` varchar(255) NOT NULL, \`number\` int NOT NULL, \`zipCode\` int NOT NULL, \`city\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(45) NOT NULL, \`category\` enum ('Hambúrguer', 'Bebidas', 'complementos', 'sobremesas') NOT NULL, \`price\` int NOT NULL, \`observation\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalPrice\` int NOT NULL, \`status\` enum ('send', 'em processo', 'em entrega', 'finalizado') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`clients\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(45) NOT NULL, \`email\` varchar(45) NOT NULL, \`password\` varchar(120) NOT NULL, \`phone\` varchar(11) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_b48860677afe62cd96e1265948\` (\`email\`), UNIQUE INDEX \`IDX_aa22377d7d3e794ae4cd39cd9e\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders_clients_clients\` (\`ordersId\` int NOT NULL, \`clientsId\` int NOT NULL, INDEX \`IDX_5e969a95233861879fd111ad26\` (\`ordersId\`), INDEX \`IDX_c647007dba7ca905c77b27b2a6\` (\`clientsId\`), PRIMARY KEY (\`ordersId\`, \`clientsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders_products_products\` (\`ordersId\` int NOT NULL, \`productsId\` int NOT NULL, INDEX \`IDX_dbab812991c32a735a34748370\` (\`ordersId\`), INDEX \`IDX_af9cb00de5ab2af01a6a325343\` (\`productsId\`), PRIMARY KEY (\`ordersId\`, \`productsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders_clients_clients\` ADD CONSTRAINT \`FK_5e969a95233861879fd111ad26b\` FOREIGN KEY (\`ordersId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`orders_clients_clients\` ADD CONSTRAINT \`FK_c647007dba7ca905c77b27b2a60\` FOREIGN KEY (\`clientsId\`) REFERENCES \`clients\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_products_products\` ADD CONSTRAINT \`FK_dbab812991c32a735a34748370c\` FOREIGN KEY (\`ordersId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`orders_products_products\` ADD CONSTRAINT \`FK_af9cb00de5ab2af01a6a3253435\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders_products_products\` DROP FOREIGN KEY \`FK_af9cb00de5ab2af01a6a3253435\``);
        await queryRunner.query(`ALTER TABLE \`orders_products_products\` DROP FOREIGN KEY \`FK_dbab812991c32a735a34748370c\``);
        await queryRunner.query(`ALTER TABLE \`orders_clients_clients\` DROP FOREIGN KEY \`FK_c647007dba7ca905c77b27b2a60\``);
        await queryRunner.query(`ALTER TABLE \`orders_clients_clients\` DROP FOREIGN KEY \`FK_5e969a95233861879fd111ad26b\``);
        await queryRunner.query(`DROP INDEX \`IDX_af9cb00de5ab2af01a6a325343\` ON \`orders_products_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_dbab812991c32a735a34748370\` ON \`orders_products_products\``);
        await queryRunner.query(`DROP TABLE \`orders_products_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_c647007dba7ca905c77b27b2a6\` ON \`orders_clients_clients\``);
        await queryRunner.query(`DROP INDEX \`IDX_5e969a95233861879fd111ad26\` ON \`orders_clients_clients\``);
        await queryRunner.query(`DROP TABLE \`orders_clients_clients\``);
        await queryRunner.query(`DROP INDEX \`IDX_aa22377d7d3e794ae4cd39cd9e\` ON \`clients\``);
        await queryRunner.query(`DROP INDEX \`IDX_b48860677afe62cd96e1265948\` ON \`clients\``);
        await queryRunner.query(`DROP TABLE \`clients\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`addresses\``);
    }

}
