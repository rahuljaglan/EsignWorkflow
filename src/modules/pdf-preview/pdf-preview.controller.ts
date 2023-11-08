import { Controller, Get, Param, Res } from '@nestjs/common';
import { PdfService } from '../pdf/services/pdf.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('pdf-preview')
export class PdfPreviewController {
  constructor(private readonly pdfService: PdfService) {}

  @Get(':filename')
  async previewPdf(@Param('filename') filename: string, @Res() response) {
    const storagePath = 'uploads'; // Use 'uploads' as the storage directory

    // Construct the full file path
    const filePath = path.join(storagePath, filename);

    if (!fs.existsSync(filePath)) {
      return response.status(404).send('File not found');
    }

    // Extract text from the PDF
    const textContent = await this.pdfService.extractTextFromFile(filePath);

    response.header('Content-Type', 'text/plain');
    response.send(textContent);
  }
}
