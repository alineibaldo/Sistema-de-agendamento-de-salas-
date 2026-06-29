import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    const [
      totalRooms,
      totalBookings,
      pendingBookings,
      approvedBookings,
      cancelledBookings,
      nextBookings,
    ] = await Promise.all([
      this.prisma.room.count(),
      this.prisma.booking.count(),
      this.prisma.booking.count({
        where: { status: 'PENDING' },
      }),
      this.prisma.booking.count({
        where: { status: 'APPROVED' },
      }),
      this.prisma.booking.count({
        where: { status: 'CANCELLED' },
      }),
      this.prisma.booking.findMany({
        where: {
          status: {
            in: ['PENDING', 'APPROVED'],
          },
          startTime: {
            gte: new Date(),
          },
        },
        include: {
          room: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          startTime: 'asc',
        },
        take: 5,
      }),
    ]);

    return {
      totalRooms,
      totalBookings,
      pendingBookings,
      approvedBookings,
      cancelledBookings,
      nextBookings,
    };
  }
}
