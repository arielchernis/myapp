import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import User from "../models/user_model";
import jest from 'jest'


beforeAll(async () => {
    process.env.TOKEN_EXPIRATION = '3s'
})

afterAll(async () => {
    await User.deleteMany({email: email});
    mongoose.connection.close();
})
const email = "test@test.com"
const bademail = "test@bad.com"
const password = "1234"
const badpassword = "xxxx"
let accessToken = "";
let refreshToken = "";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
describe("Auth API test", () => {

    test("test register api", async () => {
        let response = await request(app).post("/auth/register")
            .send({
                "email": email,
                "password": password
            })
        expect(response.statusCode).toEqual(200)
    })

    test("test login api", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                'email': email,
                'password': password
            })
        expect(response.statusCode).toEqual(200)
    })
    test("test register taken email api", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                'email': email,
                'password': password
            })
        expect(response.statusCode).not.toEqual(200)
    })
    test("test wrong email api", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                'email': bademail,
                'password': password
            })
        expect(response.statusCode).not.toEqual(200)
    })
    test("test wrong password api", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({
                'email': email,
                'password': badpassword
            })
        expect(response.statusCode).not.toEqual(200)
    })
    test("test refresh token", async () => {
        await sleep(3000);
        let response = await request(app)
            .get("/auth/test")
            .set({authorization: "barer " + accessToken});
        expect(response.statusCode).not.toEqual(200);

        response = await request(app)
            .get("/auth/refresh")
            .set({authorization: "barer " + refreshToken});
        expect(response.statusCode).toEqual(200);

        accessToken = response.body.access_token;
        refreshToken = response.body.refresh_token;
        expect(accessToken).not.toBeNull();
        expect(refreshToken).not.toBeNull();

        console.log("new access token " + accessToken)
        response = await request(app)
            .get("/auth/test")
            .set({authorization: "barer " + accessToken});
        expect(response.statusCode).toEqual(200);
    })
})