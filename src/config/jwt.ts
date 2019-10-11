import jwt from 'jsonwebtoken';
import { User } from "../models/users/userModel";
import { SECRET } from '../util/secrets';
import { Request, Response } from 'express';

const jwtParsing = function (req: Request, res: Response, next: any) {
    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, SECRET, function (err: any, payload: any) {
            if (payload) {
                User.findById(payload.userId).then(
                    (doc) => {
                        req.user = doc;
                        next()
                    }
                )
            } else {
                next()
            }
        })
    } catch (e) {
        next()
    }
}

export default jwtParsing;