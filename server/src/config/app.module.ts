import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';
import { JWT_SECRET } from '@/config/env';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from '@/config/app.middleware';
import { Video, VideoSchema } from '@repos/video/video.schema';
import { VideoController } from '@repos/video/video.controller';
import { VideoService } from '@repos/video/video.service';
import { User, UserController, UserSchema, UserService } from '@repos/user';
import { AuthController, AuthService } from '@repos/auth';
import { JwtServiceWrapper } from '@/modules/jwt-service-wrapper.service';
import { ResponseMessageService } from '@/modules/message/response-message.service';
import { ConfigModule } from '@nestjs/config';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
        }),
        MulterModule.register({
            storage: diskStorage({
                destination: './public',
                filename: (req, file, cb) => {
                    const ext = file.mimetype.split('/')[1];
                    cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
                },
            }),
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/dcms'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
        JwtModule.register({
            secret: JWT_SECRET(),
            signOptions: { expiresIn: '20m' },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    controllers: [VideoController, UserController, AuthController],
    providers: [VideoService, UserService, AuthService, JwtServiceWrapper, ResponseMessageService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .exclude({ path: '/api/v1/auth/signin', method: RequestMethod.POST })
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
