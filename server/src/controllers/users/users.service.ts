import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@/controllers/users/dto/create-user.dto';
import { UpdateUserDto } from '@/controllers/users/dto/update-user.dto';
import { Repository } from '@/database/repository.service';
import { KeyGeneratorService } from '@/modules/keyGenerator';
import * as bcrypt from 'bcrypt';
import { FindAllDto } from '@/controllers/commont/dto/findAllDto';

@Injectable()
export class UsersService {
    constructor(
        private readonly repo: Repository,
        private keyGenerator: KeyGeneratorService
    ) {}

    async create(user: CreateUserDto) {
        const salt = await bcrypt.genSalt();
        const hash = bcrypt.hash(user.password, salt);
        const _id = this.keyGenerator.newUserId();
        return this.repo.users().create({
            _id: await _id,
            email: user.email,
            passwordHash: await hash,
        });
    }

    findAll() {
        return this.repo.users().findAll();
    }

    findOne(id: number) {
        return this.repo.users().find(id);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    findByEmail(email: string) {
        return this.repo.users().findByEmail(email);
    }

    countAll() {
        return this.repo.users().count({});
    }

    getBatch({ pagination, sorters }: FindAllDto) {
        const size = pagination.pageSize;
        const from = pagination.current * size;
        return this.repo.users().getBatch(from, size, sorters);
    }
}
