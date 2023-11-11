import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@/database/user';
import { SettingsRepository } from '@/database/settings';

@Injectable()
export class Repository {
    constructor(
        private userRepo: UsersRepository,
        private settingsRepo: SettingsRepository
    ) {}

    users() {
        return this.userRepo;
    }

    settings() {
        return this.settingsRepo;
    }
}
