import { Module } from '@nestjs/common';
import { PdfController } from '../pdf/controllers/pdf.controller';
import { PdfService } from '../pdf/services/pdf.service';
import { SharedModule } from '../shared/shared.module';
@Module({
  imports: [SharedModule],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
