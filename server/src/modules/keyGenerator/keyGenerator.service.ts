import { Injectable } from '@nestjs/common';
import { Repository } from '@/database';
import { ResponseService, UNABLE_TO_GENERATE_USER_ID } from '@/modules/message';

const MAX_TRIES = 10;

const getRandomArbitrary = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

@Injectable()
export class KeyGeneratorService {
    constructor(
        private readonly repo: Repository,
        private readonly response: ResponseService
    ) {}

    async newUserId() {
        const range = await this.repo.settings().getUserIdRange();
        return this.findUnusedUserId(range, MAX_TRIES);
    }

    private async findUnusedUserId(range, triesLeft) {
        if (triesLeft === 0) {
            this.response.internalServerError(UNABLE_TO_GENERATE_USER_ID);
        }
        const newId = getRandomArbitrary(range.from, range.to);
        if (await this.repo.users().notExists(newId)) {
            return newId;
        }
        return this.findUnusedUserId(range, triesLeft - 1);
    }
}
