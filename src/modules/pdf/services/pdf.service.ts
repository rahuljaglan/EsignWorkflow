// // pdf.service.ts

// import { Injectable } from '@nestjs/common';
// import { createWriteStream, mkdirSync, existsSync } from 'fs';
// import { join } from 'path';
// import PDFParser from 'pdf2json';
// import { ZohoSignService } from './zoho-sign.service'; // Import your Zoho Sign service
// import * as fs from 'fs'; // Import the 'fs' module
// @Injectable()
// export class PdfService {
//   constructor(private readonly zohoSignService: ZohoSignService) {}

//   async savePdf(
//     originalname: string,
//     buffer: Buffer,
//   ): Promise<{ fileName: string; filePath: string }> {
//     const storageDirectory = 'uploads'; // Set your desired storage directory

//     // Ensure the storage directory exists
//     if (!existsSync(storageDirectory)) {
//       mkdirSync(storageDirectory, { recursive: true });
//     }

//     const timestamp = Date.now();
//     const fileName = `${timestamp}-${originalname}`;
//     const filePath = join(storageDirectory, fileName);

//     // Create a write stream for the file
//     const writeStream = createWriteStream(filePath);

//     return new Promise<{ fileName: string; filePath: string }>(
//       (resolve, reject) => {
//         writeStream.on('finish', () => {
//           resolve({ fileName, filePath });
//         });

//         writeStream.on('error', (error) => {
//           reject(`Error saving PDF: ${error.message}`);
//         });

//         // Write the file data to the stream
//         writeStream.write(buffer);
//         writeStream.end();
//       },
//     );
//   }

//   async loadPdf(filePath: string): Promise<Buffer> {
//     try {
//       // Load and read the PDF file from the specified path
//       const fileBuffer = fs.readFileSync(filePath);
//       return fileBuffer;
//     } catch (error) {
//       throw new Error(`Error loading PDF: ${error.message}`);
//     }
//   }

//   async extractTextFromFile(filePath: string): Promise<string> {
//     return new Promise<string>((resolve, reject) => {
//       const pdfParser: any = new PDFParser(this, 1);

//       pdfParser.on('pdfParser_dataError', (error) => {
//         reject(`Error extracting text from PDF: ${error}`);
//       });

//       pdfParser.on('pdfParser_dataReady', () => {
//         const textContent: string[] = [];

//         if (pdfParser.data && pdfParser.data.Pages) {
//           pdfParser.data.Pages.forEach((page: any) => {
//             if (page.Texts) {
//               page.Texts.forEach((text: any) => {
//                 textContent.push(decodeURIComponent(text.R[0].T));
//               });
//             }
//           });

//           if (textContent.length > 0) {
//             resolve(textContent.join(' '));
//           } else {
//             reject('No text content found in the PDF.');
//           }
//         } else {
//           reject('No Pages or Texts found in the PDF.');
//         }
//       });

//       pdfParser.loadPDF(filePath);
//     });
//   }

//   async addESignTags(pdfData: any): Promise<void> {
//     // Call Zoho Sign service to add eSign tags
//     await this.zohoSignService.addESignTags(pdfData, 'Role 2', 'Role 3');
//   }
// }

import { Injectable } from '@nestjs/common';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import PDFParser from 'pdf2json';
import { ZohoSignService } from './zoho-sign.service';
import * as fs from 'fs'; // Import the 'fs' module

@Injectable()
export class PdfService {
  constructor(private readonly zohoSignService: ZohoSignService) {}

  async savePdf(
    originalname: string,
    buffer: Buffer,
  ): Promise<{ fileName: string; filePath: string }> {
    const storageDirectory = 'uploads'; // Set your desired storage directory

    // Ensure the storage directory exists
    if (!existsSync(storageDirectory)) {
      mkdirSync(storageDirectory, { recursive: true });
    }

    const timestamp = Date.now();
    const fileName = `${timestamp}-${originalname}`;
    const filePath = join(storageDirectory, fileName);

    // Create a write stream for the file
    const writeStream = createWriteStream(filePath);

    return new Promise<{ fileName: string; filePath: string }>(
      (resolve, reject) => {
        writeStream.on('finish', () => {
          resolve({ fileName, filePath });
        });

        writeStream.on('error', (error) => {
          reject(`Error saving PDF: ${error.message}`);
        });

        // Write the file data to the stream
        writeStream.write(buffer);
        writeStream.end();
      },
    );
  }

  async loadPdf(filePath: string): Promise<string> {
    // Implement code to load and return the PDF file content
    const fileContent = fs.readFileSync(filePath, 'utf-8'); // Assuming the PDF is encoded as utf-8
    return fileContent;
  }

  async extractTextFromFile(filePath: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const pdfParser: any = new PDFParser(this, 1);

      pdfParser.on('pdfParser_dataError', (error) => {
        reject(`Error extracting text from PDF: ${error}`);
      });

      pdfParser.on('pdfParser_dataReady', () => {
        const textContent: string[] = [];

        if (pdfParser.data && pdfParser.data.Pages) {
          pdfParser.data.Pages.forEach((page: any) => {
            if (page.Texts) {
              page.Texts.forEach((text: any) => {
                textContent.push(decodeURIComponent(text.R[0].T));
              });
            }
          });

          if (textContent.length > 0) {
            resolve(textContent.join(' '));
          } else {
            reject('No text content found in the PDF.');
          }
        } else {
          reject('No Pages or Texts found in the PDF.');
        }
      });

      pdfParser.loadPDF(filePath);
    });
  }

  async addESignTags(pdfData: any): Promise<void> {
    // Call Zoho Sign service to add eSign tags
    await this.zohoSignService.addESignTags(pdfData, 'Role 2', 'Role 3');
  }
}
