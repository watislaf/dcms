import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from '@/database/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SorterDto } from '@/controllers/commont/dto/sortersDto';

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    findByEmail(email: string) {
        return this.userModel.findOne({ email }).exec();
    }

    create(reqBody: { _id: number; passwordHash: string; email: string }) {
        const newUser = new this.userModel(reqBody);
        return newUser.save();
    }

    findAll() {
        return this.userModel.find().exec();
    }

    find(_id: number) {
        return this.userModel.findOne({ _id }).exec();
    }

    exists(_id: number) {
        return this.userModel.exists({ _id }).exec();
    }

    async notExists(_id: number) {
        return (await this.exists(_id)) === null;
    }

    count(filter) {
        return this.userModel.count(filter).exec();
    }

    getBatch(from: number, size: number, sorters: Array<SorterDto>) {
        const mongoSorters = {};
        sorters.forEach((sorter) => {
            mongoSorters[sorter.field] = sorter.order;
        });
        return this.userModel.find({}).skip(from).limit(size).sort(mongoSorters).exec();
    }
}
