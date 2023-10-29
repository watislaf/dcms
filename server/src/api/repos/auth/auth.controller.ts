import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from '@dto/user/authLoginDto';
import { JwtTokenDTO } from '@dto/jwtTokenDto';
import { AuthService } from '@repos/auth/auth.service';

@ApiTags('Auth')
@Controller('/api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiResponse({ type: JwtTokenDTO })
    @Post('/signin')
    async SignIn(@Res() response, @Body() loginDto: AuthLoginDto) {
        const token = await this.authService.signin(loginDto);
        return response.status(HttpStatus.OK).json(token);
    }

    @Post('/signup')
    @ApiResponse({ type: AuthLoginDto })
    async SignUp(@Res() response, @Body() loginDto: AuthLoginDto) {
        const newUSer = await this.authService.signup(loginDto);
        return response.status(HttpStatus.CREATED).json({
            newUSer,
        });
    }
}
