import express from "express"
import * as bodyParser from "body-parser"
import { Server, createServer } from "https"
import path from "path"
import { readFileSync } from "fs"
import dotenv from "dotenv"
// dotenv.config()
// if (process.env.NODE_ENV == "development") {
    
// } 

const expressApp = express()
let httpServer: Server;

httpServer = createServer({key: readFileSync(
    path.join(process.env.KEY_PEM)), 
    cert: readFileSync(path.join(process.env.CERT_PEM)), 
    ca: readFileSync(path.join(process.env.CA_CERT))}, 
    expressApp)


expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.get("/", (req, res) => {
    res.send('gg')
})
httpServer.listen(process.env.PORT)