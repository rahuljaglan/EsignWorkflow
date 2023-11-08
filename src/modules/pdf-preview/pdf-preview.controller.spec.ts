import { Test, TestingModule } from '@nestjs/testing';
import { PdfPreviewController } from './pdf-preview.controller';

describe('PdfPreviewController', () => {
  let controller: PdfPreviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PdfPreviewController],
    }).compile();

    controller = module.get<PdfPreviewController>(PdfPreviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
