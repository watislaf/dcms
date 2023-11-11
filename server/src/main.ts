import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from '@/config/app.module';
import { AppGlobalFilter, initSwagger } from '@/config';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
    });
    // { origin: ['http://localhost:5173', 'www.watislaf.com'] }
    initSwagger(app);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AppGlobalFilter(httpAdapter));

    await app.listen(8080);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap();
