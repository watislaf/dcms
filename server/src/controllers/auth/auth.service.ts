import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtWrapper } from '@/modules/jwt/jwtWrapper.service';
import { ResponseService } from '@/modules/message/response.service';
import { INCORRECT_LOGIN_OR_PASSWORD } from '@/modules/message/messages';
import { AuthLoginDto } from '@/controllers/auth/dto/authLoginDto';
import { JwtTokenDTO } from '@/modules/jwt/dto/jwtTokenDto';
import { CreateUserDto, UsersService } from '@/controllers/users';

@Injectable()
export class AuthService {
    constructor(
        private users: UsersService,
        private jwt: JwtWrapper,
        private response: ResponseService
    ) {}

    async signin(user: AuthLoginDto): Promise<JwtTokenDTO> {
        const foundUser = await this.users.findByEmail(user.email);
        if (foundUser) {
            const { passwordHash } = foundUser;
            if (await bcrypt.compare(user.password, passwordHash)) {
                const payload = { email: user.email };
                return this.jwt.sign(payload);
            }
        }
        this.response.withUnauthorized(INCORRECT_LOGIN_OR_PASSWORD);
    }

    async signup(user: CreateUserDto) {
        return await this.users.create(user);
    }
}
