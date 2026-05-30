import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma.service';
import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { PaymentService } from './payment.service';
import { OrderCleanupService } from './order-cleanup.service';

@Module({
  imports: [WhatsappModule],
  controllers: [OrderController],
  providers: [OrderService, PrismaService, PaymentService, OrderCleanupService],
  exports: [OrderService]
})
export class OrderModule {}