import { Controller, Get } from '@nestjs/common';
import { healthResponseSchema, type HealthResponse } from '@report-tool/shared';

@Controller('health')
export class HealthController {
  @Get()
  get(): HealthResponse {
    return healthResponseSchema.parse({ status: 'ok' });
  }
}
