import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SongsModule } from '../modules/songs/songs.module'
import { LoggerModule } from '../common/middleware/logger/logger.module'
import { LoggerMiddleware } from '../common/middleware/logger/logger.middleware'
import { SongsController } from '../modules/songs/songs.controller'
import { DataSource } from 'typeorm'
import { PlaylistsModule } from '../modules/playlists/playlists.module'
import { UsersModule } from '../modules/users/users.module'
import { AuthModule } from '../modules/auth/auth.module'
import { Song } from 'src/entities/song.entity'
import { Artist } from 'src/entities/artist.entity'
import { User } from 'src/entities/user.entity'
import { Playlist } from 'src/entities/playlist.entity'
import { ArtistsModule } from 'src/modules/artists/artists.module'
import { SeedModule } from 'src/modules/seed/seed.module'
import { ConfigModule } from '@nestjs/config'
import configuration from 'src/config/configuration'
import { typeOrmAsyncConfig } from 'src/db/data-source'
import { validate } from 'env.validation'

@Module({
    imports: [
        SongsModule,
        LoggerModule,
        PlaylistsModule,
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
            isGlobal: true,
            load: [configuration],
            validate: validate,
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        TypeOrmModule.forFeature([Artist, User]),
        UsersModule,
        AuthModule,
        ArtistsModule,
        SeedModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    constructor(private dataSource: DataSource) {
        console.log(dataSource.driver.database)
    }

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('')
    }
}
