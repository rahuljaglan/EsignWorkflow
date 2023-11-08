import { Test, TestingModule } from '@nestjs/testing';
import { ESignService } from './e-sign.service';

describe('EsignService', () => {
  let service: ESignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ESignService],
    }).compile();

    service = module.get<ESignService>(ESignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
