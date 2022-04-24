import {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'


const authMiddleware = async (req: Request, response: Response, next: NextFunction) => {
    let token = req.headers['authorization']
    if (token == undefined || token == null) {
        console.log("token == undefined || token == null")
        return response.status(400).send({err: "token == undefined || token == null"})
    }
    token = token.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
        if (err != null) {
            console.log("jwt.verify error: " + err.message)
            return response.status(400).send({err: err.message})
        }
        req.body._id = userId
        next()
    })
}

export = authMiddleware