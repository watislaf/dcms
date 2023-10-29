import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/config/app.module';
import { initSwagger } from '@/config';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: ['http://localhost:5173'] },
    });
    initSwagger(app);

    await app.listen(8080);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
