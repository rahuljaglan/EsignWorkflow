// create-esign-tags.dto.ts
import { IsString, IsArray } from 'class-validator';

export class CreateEsignTagsDto {
  @IsString()
  documentId: string;

  @IsArray()
  tags: any[];
}
