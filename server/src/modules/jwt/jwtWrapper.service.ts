import { Injectable } from '@nestjs/common';
import { JwtSignOptions } from '@nestjs/jwt/dist/interfaces';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenDTO } from '@/modules/jwt/dto/jwtTokenDto';

@Injectable()
export class JwtWrapper {
    constructor(private jwtService: JwtService) {}

    sign(payload: Buffer | object, options?: JwtSignOptions): JwtTokenDTO {
        const token = this.jwtService.sign(payload, options);
        return { token };
    }

    async verify(token: string) {
        return this.jwtService.verify(token);
    }
}
