import { PartialType } from '@nestjs/swagger';
import { CreateMaterialDto } from '@/controllers/materials/dto/create-material.dto';

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}
