import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {AppModule} from "./modules/app/app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    initSwagger(app);

    await app.listen(3000);
}

bootstrap();

function initSwagger(app) {
    const options = new DocumentBuilder()
        .setTitle('Auth Server')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api-docs', app, document);
}