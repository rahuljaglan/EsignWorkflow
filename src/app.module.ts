import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { PdfModule } from './modules/pdf/pdf.module';
import { ESignModule } from './modules/e-sign/e-sign.module';
import { ESignController } from './modules/e-sign/controllers/e-sign.controller';
import { ESignService } from './modules/e-sign/services/e-sign.service';
import { PdfPreviewController } from './modules/pdf-preview/pdf-preview.controller';

@Module({
  imports: [PdfModule, ESignModule, ESignModule],
  controllers: [AppController, ESignController, PdfPreviewController],
  providers: [ESignService],
})
export class AppModule {}
