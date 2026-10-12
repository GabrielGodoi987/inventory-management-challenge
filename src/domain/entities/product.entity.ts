import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { ReservationEntity } from './reservation.entity';

@Entity({ name: 'products' })
export class ProductEntity extends AuditEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'name', type: 'varchar', length: 400, nullable: false })
  name!: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 400,
    nullable: false,
  })
  description!: string;

  @Column({
    name: 'stock',
    type: 'int',
    nullable: false,
    default: 0,
  })
  stock!: number;

  @ManyToOne(() => ReservationEntity, (reservation) => reservation.product)
  reservations!: ReservationEntity[];
}
