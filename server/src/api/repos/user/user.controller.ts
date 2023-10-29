import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@repos/user/user.service';

@ApiTags('User')
@Controller('/api/v1/user')
export class UserController {
    constructor(private readonly userService: UserService) {}
}
