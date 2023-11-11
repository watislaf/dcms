import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Repository } from '@/database';
import { AuthService } from '@/controllers/auth';

@Controller('/app')
export class HealthController {
    constructor(
        private readonly repo: Repository,
        private readonly authService: AuthService
    ) {}

    @Get('/health')
    async getHealth(@Res() response) {
        if (await this.repo.users().notExists(0)) {
            return response.status(HttpStatus.OK).json(
                await this.authService.signup({
                    email: 'admin@admin.com',
                    password: 'admin',
                })
            );
        }
        return response.status(HttpStatus.OK).json({ data: 'Ok' });
    }
}
