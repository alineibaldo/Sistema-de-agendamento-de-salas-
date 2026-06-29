import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../../prisma.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const userExists =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (userExists) {
      throw new BadRequestException(
        'Usuário já existe.',
      );
    }

    const hashedPassword =
      await bcrypt.hash(data.password, 10);

    const user =
      await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
      });

    return user;
  }

  async login(data: LoginDto) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

    if (!user) {
      throw new UnauthorizedException(
        'Credenciais inválidas.',
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        data.password,
        user.password,
      );

    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Credenciais inválidas.',
      );
    }

    const token =
      await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        role: user.role,
      });
   
    return {
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        mustChangePassword:
        user.mustChangePassword,
      },
    };
  }
}
