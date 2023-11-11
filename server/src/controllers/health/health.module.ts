import { Module } from '@nestjs/common';
import { HealthController } from '@/controllers/health/health.controller';
import { RepositoryModule } from '@/database';
import { AuthModule } from '@/controllers/auth';

@Module({
    imports: [RepositoryModule, AuthModule],
    controllers: [HealthController],
})
export class HealthModule {}
