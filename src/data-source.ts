import 'cross-env';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import path from 'path';

function dataSourceConfig(): DataSourceOptions {
  const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}')

  const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}')

  return {
    "type": "mariadb",
    "host": "localhost",
    "port": 3306,
    "username": "conta",
    "password": "Addagio244",
    "database": "hamburgueria",
    "synchronize": true,
    "logging": false,
    "entities": [entitiesPath],
    "migrations": [migrationsPath],
    "subscribers": []
  }
  
}

const AppDataSource: DataSource = new DataSource(dataSourceConfig())

export {
  AppDataSource
}