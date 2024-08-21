import express from "express"
import * as bodyParser from "body-parser"
import { createServer } from "https"
import path from "path"
import { readFileSync } from "fs"
console.log(__dirname)
const expressApp = express()
const httpServer = createServer({key: readFileSync(path.join(process.env.KEY_PEM)), cert: readFileSync(path.join(process.env.CERT_PEM)), ca: readFileSync(path.join(process.env.CA_CERT))}, expressApp)
expressApp.use(bodyParser.urlencoded({ extended: false }))

expressApp.get("/", (req, res) => {
    res.send("GG")
})

httpServer.listen(443)