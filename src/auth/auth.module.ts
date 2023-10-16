import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/lib/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      signOptions: {
        expiresIn: '60m',
      },
    }),
    PassportModule,
  ],
  providers: [AuthService, AuthResolver, PrismaService, JWTStrategy],
})
export class AuthModule {}
