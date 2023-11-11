import { Module } from '@nestjs/common';
import { UsersService } from '@/controllers/users/users.service';
import { UsersController } from '@/controllers/users/users.controller';
import { RepositoryModule } from '@/database/repository.module';
import { KeyGeneratorModule } from '@/modules/keyGenerator';

@Module({
    imports: [RepositoryModule, KeyGeneratorModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
