import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers/auth/auth.controller';
import { RepositoryModule } from '@/database/repository.module';
import { JwtWrapperModule } from '@/modules/jwt/jwtWrapper.module';
import { AuthService } from '@/controllers/auth/auth.service';
import { ResponseModule } from '@/modules/message/response.module';
import { UsersModule } from '@/controllers/users';

@Module({
    imports: [RepositoryModule, JwtWrapperModule, ResponseModule, UsersModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
