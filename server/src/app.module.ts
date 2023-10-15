import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path/posix';
import { secret } from 'src/utils/constants';
import { Video, VideoSchema } from './model/video.schema';
import { User, UserSchema } from './model/user.schema';
import { UserService } from 'src/services/user.service';
import { VideoService } from 'src/services/video.service';
import { UserController } from 'src/controllers/user.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { isAuthenticated } from 'src/app.middleware';
import { VideoController } from 'src/controllers/video.controller';

// https://blog.logrocket.com/full-stack-app-tutorial-nestjs-react/

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
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/dcms'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
        JwtModule.register({
            secret,
            signOptions: { expiresIn: '2h' },
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
    ],
    controllers: [AppController, VideoController, UserController],
    providers: [AppService, VideoService, UserService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(isAuthenticated)
            .exclude({ path: 'api/v1/video/:id', method: RequestMethod.GET })
            .forRoutes(VideoController);
    }
}
