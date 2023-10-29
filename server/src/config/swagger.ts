import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
};

// https://faraz-faraji.medium.com/generate-sdk-from-endpoints-to-connect-the-frontend-to-the-backend-in-the-standard-way-and-share-922b549cc5bd
export const initSwagger = (app) => {
    // setup Swagger
    const config = new DocumentBuilder()
        .setTitle('Fasterbase')
        .setDescription('Fasterbase API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api', app, document); // here you can define the swagger route
};
