// esign.module.ts
import { Module } from '@nestjs/common';
import { ESignController } from './controllers/e-sign.controller';
import { ESignService } from './services/e-sign.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [ESignController],
  providers: [ESignService],
})
export class ESignModule {}
