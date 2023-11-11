import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Settings, SettingsDocument } from '@/database/settings/settings.schema';

const defaultSettings: Settings = {
    userIdRange: {
        from: 10000,
        to: 99999,
    },
};

@Injectable()
export class SettingsRepository {
    constructor(@InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>) {}

    async getSettings() {
        const settings = await this.settingsModel.findOne().exec();
        if (settings === null) {
            return await new this.settingsModel(defaultSettings).save();
        }
        return settings;
    }

    async getUserIdRange() {
        const settings = await this.getSettings();
        return settings.userIdRange;
    }
}
