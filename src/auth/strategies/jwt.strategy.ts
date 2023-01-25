import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ExtractJwt, Strategy} from 'passport-jwt'
import { User } from "src/users/entities/user.entity";



@Injectable()
 export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService : AuthService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'secret2234'
        })
    }



   async validate(payload : {id : string}):Promise<User>{
    
        return await this.authService.validateUser(payload.id)
        
    }

} 