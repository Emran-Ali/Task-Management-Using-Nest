import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../interface/user.interface';
import { JwtPayloadInterface } from '../interface/jwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<User> {
    const permissions = await this.prisma.userHasPermission.findMany({
      where: { userId: payload.id },
      select: { permission: true },
    });
    const permissionArray = permissions.map(
      (permission) => permission.permission,
    );
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      permissions: permissionArray,
    };
  }
}
