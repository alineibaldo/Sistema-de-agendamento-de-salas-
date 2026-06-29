import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.room.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async create(data: CreateRoomDto) {
    return this.prisma.room.create({
      data,
    });
  }

  async update(id: string, data: UpdateRoomDto) {
    const room =
      await this.prisma.room.findUnique({
        where: {
          id,
        },
      });

    if (!room) {
      throw new BadRequestException(
        'Sala não encontrada.',
      );
    }

    return this.prisma.room.update({
      where: {
        id,
      },
      data,
    });
  }
}