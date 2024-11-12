import { NestFactory } from '@nestjs/core'
import { AppModule } from './appModule/app.module'
import { ValidationPipe } from '@nestjs/common'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { SeedService } from './modules/seed/seed.service'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
declare const module: any

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    const configService = app.get(ConfigService)
    const PORT = configService.get<number>('port')

    //Webpack
    if (module.hot) {
        module.hot.accept()
        module.hot.dispose(() => app.close)
    }

    //Swagger API
    const config = new DocumentBuilder()
        .setTitle('Spotify Clone')
        .setDescription('The Spotify Clone API documentation')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'JWT',
                description: 'Enter JWT token',
                in: 'header',
            },
            'JWT-auth',
        )
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    //const seedService = app.get(SeedService);
    //await seedService.seed();

    await app.listen(PORT, () => {
        console.log(`Connect ${PORT} success!`)
    })
}

bootstrap()
