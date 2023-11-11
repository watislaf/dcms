import { Module } from '@nestjs/common';
import { User, UserSchema, UsersRepository } from '@/database/user';
import { MongooseModule } from '@nestjs/mongoose';
import { Repository } from '@/database/repository.service';
import { Settings, SettingsRepository, SettingsSchema } from '@/database/settings';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Settings.name, schema: SettingsSchema }]),
    ],
    providers: [SettingsRepository, UsersRepository, Repository],
    exports: [Repository],
})
export class RepositoryModule {}
