import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { authConstants } from './auth.constants'
import { JWTStrategy } from 'src/strategy/jwt.strategy'
import { ArtistsService } from '../artists/artists.service'
import { ArtistsModule } from '../artists/artists.module'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ArtistsModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('secret'),
                signOptions: { expiresIn: '1d' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy],
    exports: [AuthService],
})
export class AuthModule {}
