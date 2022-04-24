import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import User from "../models/user_model";


beforeAll(async () => {

})

afterAll(async () => {
    await User.deleteMany({email: email});
    mongoose.connection.close();
})
const email = "test@test.com"
const bademail = "test@bad.com"
const password = "1234"
const badpassword = "xxxx"
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


})