import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuditEntity } from './audit.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'reservations' })
export class ReservationEntity extends AuditEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id!: string;

  @Column({ name: 'quantity', type: 'int', nullable: false })
  quantity!: number;

  @Column({ name: 'product_id', type: 'uuid', nullable: false })
  productId!: string;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product!: ProductEntity;
}
