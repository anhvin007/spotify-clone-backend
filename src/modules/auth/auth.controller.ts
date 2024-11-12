import { Body, Controller, Get, Post } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from 'src/modules/users/dto/user/create-user.dto'
import { User } from 'src/entities/user.entity'
import { AuthService } from './auth.service'
import { LoginDTO } from './dto/login.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ) {}

    @Post('signup')
    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({
        status: 201,
        description: 'It will return the user in the response',
    })
    create(@Body() userDTO: CreateUserDto): Promise<User> {
        return this.userService.create(userDTO)
    }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({
        status: 200,
        description: 'It will give you the access_token in the response',
    })
    login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO)
    }

    @Get('test')
    testEnv() {
        return this.authService.getEnvVariables()
    }
}
