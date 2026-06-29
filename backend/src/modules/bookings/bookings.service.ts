import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from '../../prisma.service';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        room: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        startTime: 'asc',
      },
    });
  }

  async create(data: CreateBookingDto) {
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);

    if (endTime <= startTime) {
      throw new BadRequestException(
        'O horário final deve ser maior que o horário inicial.',
      );
    }

    const room = await this.prisma.room.findUnique({
      where: {
        id: data.roomId,
      },
    });

    if (!room || !room.active) {
      throw new BadRequestException(
        'Sala inexistente ou inativa.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });

    if (!user) {
      throw new BadRequestException(
        'Usuário não encontrado.',
      );
    }

    if (user.active === false) {
      throw new BadRequestException(
        'Usuário inativo não pode criar reservas.',
      );
    }

    const conflict =
      await this.prisma.booking.findFirst({
        where: {
          roomId: data.roomId,
          status: {
            in: ['PENDING', 'APPROVED'],
          },
          startTime: {
            lt: endTime,
          },
          endTime: {
            gt: startTime,
          },
        },
      });

    if (conflict) {
      throw new BadRequestException(
        'Esta sala já possui agendamento nesse horário.',
      );
    }

    const status =
      user.role === 'ADMIN'
        ? 'APPROVED'
        : 'PENDING';

    return this.prisma.booking.create({
      data: {
        title: data.title,
        purpose: data.purpose,
        startTime,
        endTime,
        roomId: data.roomId,
        userId: data.userId,
        status,
      },
    });
  }

  async update(id: string, data: UpdateBookingDto) {
    const booking =
      await this.prisma.booking.findUnique({
        where: {
          id,
        },
      });

    if (!booking) {
      throw new BadRequestException(
        'Reserva não encontrada.',
      );
    }

    const startTime = data.startTime
      ? new Date(data.startTime)
      : booking.startTime;

    const endTime = data.endTime
      ? new Date(data.endTime)
      : booking.endTime;

    const roomId = data.roomId || booking.roomId;

    if (endTime <= startTime) {
      throw new BadRequestException(
        'O horário final deve ser maior que o horário inicial.',
      );
    }

    const room = await this.prisma.room.findUnique({
      where: {
        id: roomId,
      },
    });

    if (!room || !room.active) {
      throw new BadRequestException(
        'Sala inexistente ou inativa.',
      );
    }

    const conflict =
      await this.prisma.booking.findFirst({
        where: {
          id: {
            not: id,
          },
          roomId,
          status: {
            in: ['PENDING', 'APPROVED'],
          },
          startTime: {
            lt: endTime,
          },
          endTime: {
            gt: startTime,
          },
        },
      });

    if (conflict) {
      throw new BadRequestException(
        'Esta sala já possui agendamento nesse horário.',
      );
    }

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        purpose: data.purpose,
        startTime,
        endTime,
        roomId,
      },
    });
  }

  async cancel(id: string) {
    const booking =
      await this.prisma.booking.findUnique({
        where: {
          id,
        },
      });

    if (!booking) {
      throw new BadRequestException(
        'Reserva não encontrada.',
      );
    }

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException(
        'Esta reserva já está cancelada.',
      );
    }

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: 'CANCELLED',
      },
    });
  }

  async approve(id: string) {
    const booking =
      await this.prisma.booking.findUnique({
        where: {
          id,
        },
      });

    if (!booking) {
      throw new BadRequestException(
        'Reserva não encontrada.',
      );
    }

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException(
        'Não é possível aprovar uma reserva cancelada.',
      );
    }

    if (booking.status === 'APPROVED') {
      throw new BadRequestException(
        'Esta reserva já está aprovada.',
      );
    }

    return this.prisma.booking.update({
      where: {
        id,
      },
      data: {
        status: 'APPROVED',
      },
    });
  }
}
