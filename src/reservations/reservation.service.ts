import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { ReservationEntity } from 'src/domain/entities/reservation.entity';
import { DataSource, Repository } from 'typeorm';
import {
  CreateReservationDto,
  FindReservationByIdDto,
} from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepository: Repository<ReservationEntity>,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findAll() {
    return this.reservationRepository.find();
  }

  async create(createReservationDto: CreateReservationDto) {
    const { productId, quantity } = createReservationDto;

    return this.dataSource.transaction(async (manager) => {
      const product = await manager.findOne(ProductEntity, {
        where: { id: productId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      if (product.stock < quantity) {
        throw new ConflictException('Insufficient stock for this reservation');
      }

      product.stock -= quantity;
      await manager.save(product);

      const reservation = manager.create(ReservationEntity, {
        productId,
        quantity,
      });
      return manager.save(reservation);
    });
  }

  async findOne(id: FindReservationByIdDto['id']) {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }
}
