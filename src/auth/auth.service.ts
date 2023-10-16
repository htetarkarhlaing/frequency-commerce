import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';
import * as moment from 'moment';
import {
  CreateUserInput,
  Tokens,
  UserLoginInput,
  UpdateUserInput,
} from 'src/graphql';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async user(id: string): Promise<User | null> {
    try {
      return this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });
    } catch (err) {
      return null;
    }
  }

  async users(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        userStatus: {
          not: 'SUSPENDED',
        },
      },
    });
  }

  async createUser(user: CreateUserInput): Promise<User | null> {
    const salt = await bcrypt.genSalt();
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: await bcrypt.hash(user.password, salt),
        userRole: user.userRole,
      },
    });
  }

  async memberRegister(user: CreateUserInput): Promise<User | null> {
    const salt = await bcrypt.genSalt();
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: await bcrypt.hash(user.password, salt),
        userRole: 'MEMBER',
        userStatus: 'APPROVED',
      },
    });
  }

  async memberUpdateInfo(
    user: UpdateUserInput,
    id: string,
  ): Promise<User | null> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: user.email,
        username: user.username,
        address: user.address,
        dateOfBirth: moment(user.dateOfBirth).startOf('day').toISOString(),
      },
    });
  }

  async validateUser(data: UserLoginInput): Promise<User | null> {
    const targetUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (targetUser) {
      if (await bcrypt.compare(data.password, targetUser.password)) {
        return targetUser;
      }
    } else {
      return null;
    }
  }

  async userLogin(user: UserLoginInput): Promise<Tokens | null> {
    const validUser = await this.validateUser(user);

    if (validUser !== null) {
      return {
        accessToken: await this.jwtService.signAsync(
          {
            id: validUser.id,
          },
          { secret: process.env.JWT_SECRET },
        ),
        refreshToken: '',
      };
    } else {
      return null;
    }
  }
}
