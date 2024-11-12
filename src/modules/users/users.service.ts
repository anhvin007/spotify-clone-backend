import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, UpdateResult } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from 'src/modules/users/dto/user/create-user.dto'
import { User } from 'src/entities/user.entity'
import { error } from 'console'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(userDTO: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt()
        userDTO.password = await bcrypt.hash(userDTO.password, salt)

        const user = await this.userRepository.save(userDTO)
        delete user.password
        return user
    }

    async findOne(data: Partial<User>): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: data.email })

        if (!user) {
            throw new UnauthorizedException('Could not find User')
        }

        return user
    }

    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id: id })
        return user
    }

    async updateSecretKey(
        userId: number,
        secret: string,
    ): Promise<UpdateResult> {
        return this.userRepository.update(
            { id: userId },
            { twoFASecret: secret, enable2FA: true },
        )
    }
}
