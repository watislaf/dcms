import { Module } from '@nestjs/common';
import { KeyGeneratorService } from '@/modules/keyGenerator/keyGenerator.service';
import { RepositoryModule } from '@/database';
import { ResponseModule } from '@/modules/message';

@Module({
    imports: [RepositoryModule, ResponseModule],
    providers: [KeyGeneratorService],
    exports: [KeyGeneratorService],
})
export class KeyGeneratorModule {}
