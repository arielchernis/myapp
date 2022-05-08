import express from 'express'

const app = express();
import dotenv from 'dotenv'

dotenv.config()
import post_routes from './routes/post_routes'
import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection
db.on('error', (error) => {
    console.error(error)
})
db.once('open', () => {
    console.log('Connected to mongoDB')
})

import bodyparser from 'body-parser'

app.use(bodyparser.urlencoded({extended: true, limit: '1mb'}))
app.use(bodyparser.json())


app.use('/post', post_routes)

import auth_rotes from './routes/auth_routes'

app.use('/auth', auth_rotes)

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

if (process.env.NODE_ENV == "development") {
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Mine simple REST backend API",
                version: "1.0.0",
                description: "A simple REST backend API with JWT authentication using refresh token",
            },
            servers: [{url: "http://localhost:" + process.env.PORT}],
        },
        apis: ["./src/routes/*.ts"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}

export = app
