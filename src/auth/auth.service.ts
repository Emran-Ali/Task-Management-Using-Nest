import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../interface/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async loginUser(credential: { email: string; password: string }) {
    const user = await this.validateUser(credential.email, credential.password);
    console.log(user, 'User');
    if (user) {
      return { access_token: this.jwtService.sign(user) };
    } else {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Invalid credential' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
      include: {
        UserHasPermission: {
          select: {
            permission: true,
          },
        },
        UserHasRole: {
          select: {
            role: true,
          },
        },
      },
    });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const roles = user.UserHasRole.map((role) => role.role);
        const permissions = user.UserHasPermission.map(
          (permission) => permission.permission,
        );
        const { id, email, name, ...result } = user;
        return {
          id,
          email,
          name,
          roles,
          permissions,
        };
      }
    }
    return null;
  }

  logoutUser() {
    return 'Logged out';
  }
}
