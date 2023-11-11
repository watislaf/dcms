import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from '@/config';
import { Module } from '@nestjs/common';
import { JwtWrapper } from '@/modules/jwt/jwtWrapper.service';

@Module({
    imports: [
        JwtModule.register({
            secret: JWT_SECRET(),
            signOptions: { expiresIn: '20m' },
        }),
    ],
    providers: [JwtWrapper],
    exports: [JwtWrapper],
})
export class JwtWrapperModule {}
