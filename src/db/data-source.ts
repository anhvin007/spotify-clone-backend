// data-source.ts
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm'
import { Artist } from 'src/entities/artist.entity'
import { Playlist } from 'src/entities/playlist.entity'
import { Song } from 'src/entities/song.entity'
import { User } from 'src/entities/user.entity'

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> => {
        return {
            type: 'postgres',
            host: configService.get<string>('dbHost'),
            port: configService.get<number>('dbPort'),
            username: configService.get<string>('username'),
            database: configService.get<string>('dbName'),
            password: configService.get<string>('password'),
            entities: [User, Playlist, Artist, Song],
            // entities: ["dist/entities/**/*.entity.js"],
            synchronize: false,
            migrations: ['dist/db/migrations/*.js'],
        }
    },
}
