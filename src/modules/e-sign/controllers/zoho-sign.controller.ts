// src/modules/e-sign/controllers/zoho-sign.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { ESignService } from '../services/e-sign.service';
import { CreateEsignTagsDto } from '../dtos/create-esign-tags.dto';

@Controller('zoho-sign')
export class ZohoSignController {
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

  @Post('submit-for-esign')
  async submitForESign(@Body() submissionRequest: any): Promise<any> {
    try {
      const result = await this.eSignService.submitForESign(
        submissionRequest.documentId,
        submissionRequest.recipients,
      );
      return result;
    } catch (error) {
      throw new Error(`Error submitting for eSign: ${error.message}`);
    }
  }
}
