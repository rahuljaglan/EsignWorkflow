// esign.module.ts
import { Module } from '@nestjs/common';
import { ESignController } from './controllers/e-sign.controller';
import { ESignService } from './services/e-sign.service';
import { SharedModule } from '../shared/shared.module';
import { ZohoSignController } from './controllers/zoho-sign.controller'; // Import your controller

@Module({
  imports: [SharedModule],
  controllers: [ESignController, ZohoSignController],
  providers: [ESignService],
})
export class ESignModule {}
