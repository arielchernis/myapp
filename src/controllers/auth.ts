import {Request, Response} from "express"

const register = async (req: Request, res: Response) => {
    console.log('register')
    res.status(200).send('register')
}
const login = async (req: Request, res: Response) => {
    console.log('login')
    res.status(200).send('login')
}
export = {
    register,
    login
}