import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomainModule } from './domain/domain.module';
import { ProductsModule } from './products/products.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [DomainModule, ProductsModule, ReservationsModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
