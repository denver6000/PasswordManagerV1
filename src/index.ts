import express from "express"
import * as bodyParser from "body-parser"
import { createServer } from "http"

const expressApp = express()
const httpServer = createServer(expressApp)
expressApp.use(bodyParser.urlencoded({ extended: false }))

expressApp.get("/", (req, res) => {
    res.send("GG")
})

httpServer.listen(80)