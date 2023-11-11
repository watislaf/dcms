import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '@/controllers/auth/auth.service';
import { JwtTokenDTO } from '@/modules/jwt/dto/jwtTokenDto';
import { AuthLoginDto } from '@/controllers/auth/dto/authLoginDto';
import { CreateUserDto } from '@/controllers/users';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiResponse({ type: JwtTokenDTO })
    @Post('/signin')
    async signIn(@Res() response, @Body() loginDto: AuthLoginDto) {
        const token = await this.authService.signin(loginDto);
        return response.status(HttpStatus.OK).json(token);
    }

    @Post('/signup')
    @ApiResponse({ type: CreateUserDto })
    async signUp(@Res() response, @Body() loginDto: CreateUserDto) {
        const newUSer = await this.authService.signup(loginDto);
        return response.status(HttpStatus.CREATED).json({
            newUSer,
        });
    }
}
