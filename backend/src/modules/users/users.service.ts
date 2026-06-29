import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        mustChangePassword: true,
        createdAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async create(data: CreateUserDto) {
    const userExists =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (userExists) {
      throw new BadRequestException(
        'Já existe um usuário com este e-mail.',
      );
    }

    const hashedPassword =
      await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        active: true,
        mustChangePassword: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        mustChangePassword: true,
        createdAt: true,
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    const user =
      await this.prisma.user.findUnique({
        where: { id },
      });

    if (!user) {
      throw new BadRequestException(
        'Usuário não encontrado.',
      );
    }

    const updateData: any = {
      name: data.name,
      email: data.email,
      role: data.role,
      active: data.active,
    };

    if (data.temporaryPassword) {
      updateData.password = await bcrypt.hash(
        data.temporaryPassword,
        10,
      );

      updateData.mustChangePassword = true;
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        mustChangePassword: true,
        createdAt: true,
      },
    });
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!user) {
      throw new BadRequestException(
        'Usuário não encontrado.',
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        currentPassword,
        user.password,
      );

    if (!passwordMatch) {
      throw new BadRequestException(
        'Senha atual inválida.',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10,
      );

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
        mustChangePassword: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        active: true,
        mustChangePassword: true,
      },
    });
  }
}