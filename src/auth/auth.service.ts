import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { find, NotFoundError, sample } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

constructor(@InjectRepository(User) private usersRepository :Repository<User> , private jwt : JwtService){}




 async register(createUserDto: RegisterUserDto) {
      const { email} = createUserDto

      const salt = await bcrypt.genSalt()
      const hash =await bcrypt.hash( createUserDto.password, salt)
      
      const newUser =  this.usersRepository.create({email , password :hash})



      try{

        const { password , ...user}= await this.usersRepository.save(newUser)
        return user
      }catch(error){
        return error.message
      }


      

  }


async validateUserCredentials(  loginUserDto: RegisterUserDto){
  const {password, email } = loginUserDto
  
  const findUser  = await this.usersRepository.findOne({where: {email}})
  if(!findUser) throw new  NotFoundException('user  does not exist')
  if(!await bcrypt.compare(loginUserDto.password,findUser.password) ){
    throw new UnauthorizedException('wrong credentials')
  }else { 
    const {password , ...user} = findUser
  
    return user
  }

}



async  login(user)  {
  const payload = {id :user.id}
  const token = this.jwt.sign(payload)
  
  return { user , token}

  }

 async validateUser( id : string) : Promise<User>{


    const findUser = await this.usersRepository.findOneBy({id})


    if(!findUser){
      throw new NotFoundException('user does not exist')
    }else { 
      const {password , ...user} = findUser
      return user as User 
    }
  }

}
