import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/entities/user.entity'
import { LoginDTO } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { ArtistsService } from '../artists/artists.service'
import { PayloadType } from 'src/types/payload.type'
import * as speakeasy from 'speakeasy'
import { Enable2FAType } from 'src/types/auth-types'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private artistService: ArtistsService,
        private configService: ConfigService
    ) {}

    async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
        const user = await this.usersService.findOne(loginDTO)
        const passwordMatched = await bcrypt.compare(
            loginDTO.password,
            user.password,
        )

        if (!passwordMatched) {
            throw new UnauthorizedException('Password wrong!')
        }

        const payload: PayloadType = { email: user.email, userId: user.id }
        const artist = await this.artistService.findArtist(user.id)

        if (artist) {
            payload.artistId = artist.id
        }
        const accessToken = this.jwtService.sign(payload)

        return { accessToken }
    }

    getEnvVariables() {
        return {
            port: this.configService.get<number>("port")
        }
    }

    async enable2FA(userId: number): Promise<Enable2FAType> {
        const user = await this.usersService.findById(userId) // (1)

        // (2) Nếu người dùng đã kích hoạt 2FA, trả về mã bí mật hiện tại
        if (user.enable2FA) {
            return { secret: user.twoFASecret }
        }

        // (3) Nếu chưa kích hoạt, tạo mã bí mật mới
        const secret = speakeasy.generateSecret()
        console.log(secret)

        // (4) Sử dụng mã bí mật ở dạng base32
        user.twoFASecret = secret.base32

        // (5) Cập nhật mã bí mật cho người dùng
        await this.usersService.updateSecretKey(user.id, user.twoFASecret)

        // (6) Trả về mã bí mật trong response
        return { secret: user.twoFASecret }
    }
}
