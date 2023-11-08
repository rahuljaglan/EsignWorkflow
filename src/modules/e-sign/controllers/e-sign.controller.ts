// esign.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ESignService } from '../services/e-sign.service';
import { CreateEsignTagsDto } from '../dtos/create-esign-tags.dto';

@Controller('esign')
export class ESignController {
  constructor(private readonly eSignService: ESignService) {}

  @Post('add-tags')
  async addESignTags(@Body() tagsRequest: CreateEsignTagsDto): Promise<any> {
    try {
      const result = await this.eSignService.createESignTags(
        tagsRequest.documentId,
        tagsRequest.tags,
      );
      return result;
    } catch (error) {
      throw new Error(`Error adding eSign tags: ${error.message}`);
    }
  }
}
