// pdf.controller.ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { PdfService } from '../services/pdf.service';
import { ESignService } from 'src/modules/e-sign/services/e-sign.service';
import { ZohoSignService } from '../services/zoho-sign.service';
import { ESignDto } from '../dtos/e-sign.dto';
import { createWriteStream } from 'fs';
import { join } from 'path';
import * as fs from 'fs'; // Import the 'fs' module
// import { Injectable } from '@nestjs/common';

@Controller('pdf')
export class PdfController {
  constructor(
    private readonly pdfService: PdfService,
    private readonly eSignService: ESignService,
    private readonly zohoSignService: ZohoSignService,
  ) {}

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

  @Post('esign')
  async eSignPdf(@Body() eSignData: ESignDto) {
    try {
      // Specify the name of the PDF file you want to e-sign
      const pdfFileName = 'example.pdf'; // Replace with the actual file name

      // Define the path to the PDF file
      const pdfFilePath = `uploads/${pdfFileName}`;

      // Load the PDF file
      // const pdfData = await this.pdfService.loadPdf(pdfFilePath);
      // Load the PDF file
      const pdfData: string = await this.pdfService.loadPdf(pdfFilePath); // Read PDF content from the file

      // Implement e-signing logic here for Role 2
      const eSignedDocument = await this.eSignService.signDocument(
        pdfData,
        eSignData.role2,
      );

      // After e-signing, call the Zoho Sign API to add eSign tags
      await this.zohoSignService.addESignTags(
        eSignedDocument,
        eSignData.role1,
        eSignData.role2,
      );

      // Then, call the Zoho Sign API to forward the document to Role 3
      await this.zohoSignService.forwardDocumentToRole3(
        eSignedDocument,
        'role3@example.com',
      );

      return 'PDF e-signed, tags added, and forwarded to Role 3';
    } catch (error) {
      // Handle any errors that may occur during e-signing, tag addition, or forwarding
      return 'Error occurred during e-signing and forwarding';
    }
  }
}
