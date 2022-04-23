const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')

beforeAll((done) => {
    done()
})

afterAll((done) => {
    mongoose.connection.close()

    done()
})

describe("POST API test", () => {
    const message = "this is my message"
    const sender = "12345678"
    let retId = ""
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
    test("test get post by id api", () => {
        const response = request(app).get('/post/' + retId)
        expect(response.statusCode).toEqual(200)
        const retMessage = response.body.message
        const retSender = response.body.sender
        const retId2 = response.body._id

        expect(retMessage).toEqual(message)
        expect(retSender).toEqual(sender)
        expect(retId2).toEqual(retId)
    })
})