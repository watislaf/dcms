import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';
import { MONGO_PATH } from '@/config/env';
import { isAuthenticated } from '@/config/app.middleware';
import { ConfigModule } from '@nestjs/config';
import { MaterialsModule } from '@/controllers/materials/materials.module';
import { UsersModule } from '@/controllers/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from '@/controllers/health/health.module';
import { AuthModule } from '@/controllers/auth/auth.module';
import { ResponseModule } from '@/modules/message/response.module';
import { JwtWrapperModule } from '@/modules/jwt/jwtWrapper.module';
import { RepositoryModule } from '@/database/repository.module';

const ENV_PROD = process.env.NODE_ENV === 'production';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    const ext = file.mimetype.split('/')[1];
                    cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
                },
            }),
        }),
        ConfigModule.forRoot({
            envFilePath: ENV_PROD ? `.env.production` : `.env`,
        }),
        MongooseModule.forRoot(`mongodb://${MONGO_PATH()}`),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        ResponseModule,
        JwtWrapperModule,
        RepositoryModule,
        MaterialsModule,
        UsersModule,
        HealthModule,
        AuthModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .exclude(
                {
                    path: '/auth/signin',
                    method: RequestMethod.POST,
                },
                {
                    path: '/app/health',
                    method: RequestMethod.GET,
                }
            )
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
