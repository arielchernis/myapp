import {Request, Response} from "express"
import {StatusCodes} from 'http-status-code'
import User from '../models/user_model'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const generateTokens = (userId: string): [string, string] => {
    const accessToken = jwt.sign(
        {_id: userId},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: process.env.TOKEN_EXPIRATION}
    );
    const refreshToken = jwt.sign(
        {_id: userId},
        process.env.REFRESH_TOKEN_SECRET,
        {}
    );
    return [accessToken, refreshToken]
}

const register = async (req: Request, res: Response) => {
    console.log('register')

    //validate register

    const email = req.body.email
    const password = req.body.password

    if (email == null || email == undefined || password == null || password == undefined) {
        res.status(400)
    }
    // check if email not already taken

    //Encrypt password
    const salt = await bcrypt.genSalt(10)
    const encryptedpassword = await bcrypt.hash(password, salt)
    //save user in db

    const user = new User({
        'email': email,
        'password': encryptedpassword
    })
    try {
        const newUser = await user.save();
        //login - create access token
        const [accessToken, refreshToken] = generateTokens(newUser._id)
        newUser.refreshToken = refreshToken;
        await newUser.save();
        res.status(200).send({
            access_token: accessToken,
            refresh_token: refreshToken,
            _id: newUser._id,
        });
    } catch (err) {
        return res.status(400).send({error: err.message});
    }
}
const login = async (req: Request, res: Response) => {
    console.log("login");
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || password == null) {
        return res
            .status(400)
            .send({error: "wrong email or password"});
    }

    try {
        // check password match
        const user = await User.findOne({email: email})
        if (user == null) {
            return res
                .status(400)
                .send({error: "wrong email or password"});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res
                .status(400)
                .send({error: "wrong email or password"});
        }

        const [accessToken, refreshToken] = generateTokens(user._id)
        user.refreshToken = refreshToken;
        await user.save();
        res.status(200).send({
            access_token: accessToken,
            refresh_token: refreshToken,
            _id: user._id,
        });
    } catch (err) {
        return res.status(400).send({error: err.message});
    }
};
export = {
    register,
    login
}