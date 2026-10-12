import 'dotenv/config';
import { DataSource } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ReservationEntity } from './entities/reservation.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'sa',
  password: process.env.DB_PASSWORD || 'sa',
  database: process.env.DB_NAME || 'inventory_db',
  entities: [ProductEntity, ReservationEntity],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});
