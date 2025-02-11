import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

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

  private async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: email },
    });

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const { password, ...result } = user;
        console.log(result, 'User Registered');
        return result;
      }
    }
    return null;
  }

  logoutUser() {
    return 'Logged out';
  }
}
