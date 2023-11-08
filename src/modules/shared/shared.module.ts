// shared/shared.module.ts
import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfEntity } from './entities/pdf.entity';
import { PdfService } from '../pdf/services/pdf.service';
import { PdfDto } from './dto/pdf.dto';

@Module({
  // imports: [TypeOrmModule.forFeature([PdfEntity])],
  providers: [PdfService, PdfEntity, PdfDto],
  exports: [PdfService, PdfEntity, PdfDto],
})
export class SharedModule {}
