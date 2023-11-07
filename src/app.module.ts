import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfModule } from './modules/pdf/pdf.module';
import { ESignModule } from './modules/e-sign/e-sign.module';

@Module({
  imports: [PdfModule, ESignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
