import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { UsersService } from '@/controllers/users/users.service';
import { CreateUserDto } from '@/controllers/users/dto/create-user.dto';
import { UpdateUserDto } from '@/controllers/users/dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FindAllDto } from '@/controllers/commont/dto/findAllDto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAllUsers(@Res() response, @Body() findAllDto: FindAllDto) {
        const allUsersCount = this.usersService.countAll();
        const users = this.usersService.getBatch(findAllDto);
        return response.set({ 'x-access-token': await allUsersCount }).json(await users);
    }

    @Get(':id')
    findOneUser(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    updateOneUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
