import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from '@/controllers/materials/dto/create-material.dto';
import { UpdateMaterialDto } from '@/controllers/materials/dto/update-material.dto';

@Injectable()
export class MaterialsService {
    create(createMaterialDto: CreateMaterialDto) {
        return 'This action adds a new material';
    }

    findAll() {
        return `This action returns all materials`;
    }

    findOne(id: number) {
        return `This action returns a #${id} material`;
    }

    update(id: number, updateMaterialDto: UpdateMaterialDto) {
        return `This action updates a #${id} material`;
    }

    remove(id: number) {
        return `This action removes a #${id} material`;
    }
}
