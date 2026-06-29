import {
  BookingStatus,
  PrismaClient,
  Role,
} from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function findOrCreateRoom(data: {
  name: string;
  block: string;
  capacity: number;
  resources: string;
}) {
  const existingRoom = await prisma.room.findFirst({
    where: {
      name: data.name,
    },
  });

  if (existingRoom) {
    return prisma.room.update({
      where: {
        id: existingRoom.id,
      },
      data,
    });
  }

  return prisma.room.create({
    data,
  });
}

async function main() {
  const password = await bcrypt.hash('Admin@123', 10);

  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@ifrs.edu.br',
    },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@ifrs.edu.br',
      password,
      role: Role.ADMIN,
      active: true,
      mustChangePassword: false,
    },
  });

  const servidor = await prisma.user.upsert({
    where: {
      email: 'servidor@ifrs.edu.br',
    },
    update: {},
    create: {
      name: 'Servidor Teste',
      email: 'servidor@ifrs.edu.br',
      password,
      role: Role.SERVIDOR,
      active: true,
      mustChangePassword: false,
    },
  });

  const sala101 = await findOrCreateRoom({
    name: 'Sala 101',
    block: 'A',
    capacity: 30,
    resources: 'Projetor, TV',
  });

  await findOrCreateRoom({
    name: 'Sala 102',
    block: 'A',
    capacity: 25,
    resources: 'Projetor',
  });

  await findOrCreateRoom({
    name: 'Laboratório 201',
    block: 'B',
    capacity: 20,
    resources: '20 computadores',
  });

  await findOrCreateRoom({
    name: 'Auditório',
    block: 'Central',
    capacity: 120,
    resources: 'Projetor, som',
  });

  await findOrCreateRoom({
    name: 'Sala de Reuniões',
    block: 'Administrativo',
    capacity: 12,
    resources: 'TV',
  });

  const existingBooking = await prisma.booking.findFirst({
    where: {
      title: 'Reunião de Planejamento',
      roomId: sala101.id,
    },
  });

  if (!existingBooking) {
    await prisma.booking.create({
      data: {
        title: 'Reunião de Planejamento',
        purpose: 'Reserva criada pelo seed',
        startTime: new Date('2026-07-10T09:00:00'),
        endTime: new Date('2026-07-10T11:00:00'),
        status: BookingStatus.APPROVED,
        roomId: sala101.id,
        userId: admin.id,
      },
    });
  }

  const existingServidorBooking = await prisma.booking.findFirst({
    where: {
      title: 'Aula teste',
      userId: servidor.id,
    },
  });

  if (!existingServidorBooking) {
    await prisma.booking.create({
      data: {
        title: 'Aula teste',
        purpose: 'Reserva pendente criada pelo seed',
        startTime: new Date('2026-07-11T14:00:00'),
        endTime: new Date('2026-07-11T16:00:00'),
        status: BookingStatus.PENDING,
        roomId: sala101.id,
        userId: servidor.id,
      },
    });
  }

  console.log('Seed executado com sucesso!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });