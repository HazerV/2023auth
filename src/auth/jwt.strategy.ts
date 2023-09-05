import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class JwtStragy extends PassportStrategy(Strategy) {
    constructor () {
        super ({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken (),
            ignoreExpiration: false,
            secretOrKey: 'secrete'
        })
    }

    async validate(payload) {
        return {
            userId: payload.id,
            userName: payload.userName
        }
    }
}