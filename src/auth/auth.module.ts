import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports : [TypeOrmModule.forFeature([User]), 
  PassportModule.register({defaultStrategy : 'jwt'}),
  JwtModule.register({
    secret : 'secret2234',
    signOptions : {expiresIn: '4000s'}
  })
],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy ,LocalStrategy]
})
export class AuthModule {}
