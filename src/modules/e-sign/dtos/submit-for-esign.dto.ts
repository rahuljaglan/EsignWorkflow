// src/modules/e-sign/dtos/submit-for-esign.dto.ts
import { IsString, IsArray } from 'class-validator';

export class SubmitForESignDto {
  @IsString()
  documentId: string;

  @IsArray()
  recipients: any[];
}
