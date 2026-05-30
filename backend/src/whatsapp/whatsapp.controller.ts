import { Controller } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
 
@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}
  
  // All endpoints removed - WhatsApp is now only used for OTP and order status notifications
}
