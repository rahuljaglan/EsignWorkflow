import { Injectable, Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ESignController } from './modules/e-sign/controllers/e-sign.controller';
import { ESignModule } from './modules/e-sign/e-sign.module';
import { ESignService } from './modules/e-sign/services/e-sign.service';
import { PdfModule } from './modules/pdf/pdf.module';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
@Module({
  imports: [PdfModule, ESignModule],
  controllers: [AppController, ESignController],
  providers: [AppService, ESignService],
})
export class AppModule {}
