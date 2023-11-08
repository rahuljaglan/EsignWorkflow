import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { PdfService } from '../services/pdf.service';
import * as fs from 'fs';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('pdf'))
  async uploadFile(@UploadedFile() file) {
    // Define the directory where you want to save the uploaded PDF files
    const uploadDir = './uploads'; // You can adjust this to your preferred location

    if (!file) {
      // Handle the case where 'file' is undefined
      return { message: 'No file uploaded' };
    }
    // Ensure the directory exists; create it if it doesn't
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Use createWriteStream to write the file to the designated directory
    const filename = `${Date.now()}-${file.originalname}`;
    const fileStream = createWriteStream(join(uploadDir, filename));

    // Save the file to the designated directory
    fileStream.write(file.buffer);
    fileStream.end();

    // You can also save information about the uploaded file in your service
    const savedPdf = await this.pdfService.savePdf(filename, file.buffer);

    return { message: 'File uploaded successfully', savedPdf };
  }
}
