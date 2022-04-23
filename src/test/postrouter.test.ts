import request from 'supertest'
import app from '../server'
import mongoose from 'mongoose'
import Post from '../models/postmodel'

const message = "this is my message"
const sender = "12345678"
let retId = "";

beforeAll(async () => {
    await Post.remove()

})

afterAll((done) => {
    mongoose.connection.close()

    done()
})

describe("POST API test", () => {

    test("test post get api", async () => {
        const response = await request(app).get("/post")
        expect(response.statusCode).toEqual(200)
    })

    test("test post post api", async () => {
        const response = await request(app).post("/post").send({
            'message': message,
            'sender': sender
        })
        expect(response.statusCode).toEqual(200)
        const retMessage = response.body.message
        const retSender = response.body.sender
        retId = response.body.id

        expect(retMessage).toEqual(message)
        expect(retSender).toEqual(sender)
        expect(retMessage).not.toEqual(null)
    })
    test("test get post by id api", async () => {
        const response = await request(app).get('/post/' + retId)
        expect(response.statusCode).toEqual(200)
        const retMessage = response.body.message
        const retSender = response.body.sender
        const retId2 = response.body._id
        expect(retMessage).toEqual(message)
        expect(retSender).toEqual(sender)
        expect(retId2).toEqual(retId)
    })

    test("Test get Post by sender API", async () => {
        const response = await request(app).get("/post?sender=" + sender);
        expect(response.statusCode).toEqual(200);
        const retMessage = response.body[0].message;
        const retSender = response.body[0].sender;
        const retId2 = response.body[0]._id;
        expect(retMessage).toEqual(message);
        expect(retSender).toEqual(sender);
        expect(retId2).toEqual(retId);
    });
    test("Test Delete post by id API", async () => {
        const response = await request(app).delete('/post/' + retId)
        expect(response.statusCode).toEqual(200)

        // @ts-ignore
        const response2 = await request(app).get('/post' / +retId)
        expect(response2.statusCode).toEqual(400)

    })


})