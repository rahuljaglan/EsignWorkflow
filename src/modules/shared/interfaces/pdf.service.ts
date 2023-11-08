// shared/interfaces/pdf.service.ts
import { PdfDto } from '../dto/pdf.dto';
import { PdfEntity } from '../entities/pdf.entity';

export interface PdfService {
  createPdf(pdfDto: PdfDto): Promise<PdfEntity>;
  findPdfById(id: number): Promise<PdfEntity | undefined>;
  // Add other methods as needed
}
