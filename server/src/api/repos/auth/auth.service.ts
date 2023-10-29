import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '@repos/user/user.schema';
import { JwtServiceWrapper } from '@/modules/jwt-service-wrapper.service';
import { AuthLoginDto } from '@/api/dto';
import { JwtTokenDTO } from '@dto/jwtTokenDto';
import { ResponseMessageService } from '@/modules/message/response-message.service';
import { INCORRECT_LOGIN_OR_PASSWORD } from '@/modules/message/messages';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwt: JwtServiceWrapper,
        private response: ResponseMessageService
    ) {}

    async signin(user: AuthLoginDto): Promise<JwtTokenDTO> {
        const foundUser = await this.userModel.findOne({ email: user.email }).exec();
        if (foundUser) {
            const { password } = foundUser;
            if (await bcrypt.compare(user.password, password)) {
                const payload = { email: user.email };
                return this.jwt.sign(payload);
            }
        }
        this.response.withUnauthorized(INCORRECT_LOGIN_OR_PASSWORD);
    }

    async signup(user: AuthLoginDto): Promise<AuthLoginDto> {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        const reqBody = {
            email: user.email,
            password: hash,
        };
        const newUser = new this.userModel(reqBody);
        return newUser.save();
    }
}
