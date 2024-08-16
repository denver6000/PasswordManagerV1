import { MongoClient } from "mongodb"
import * as PUtil from "../util/PasswordUtil"
import * as DBUtil from "../util/DbUtil"
import { NextFunction, Router } from "express"

let APIRouter = Router()


export default async function (): Promise<Router> {

    let mongo = new MongoClient('mongodb://mongo:27017')
    await mongo.connect()

    APIRouter.post("/getPass", async (req, res) => {
        let userId = req.body.userId
        let result = DBUtil.getEncryptedDataByUserID(mongo, userId)
        res.send(result)
    })

    APIRouter.get("/", (req, res) => {
        res.send(200)
    })

    APIRouter.post("/savePass", async (req, res) => {
        try {
            let encryptedPasswordData = PUtil.encrypt(req.body.passToEncrypt, req.body.passwordForDecryption)
            await DBUtil.addEncryptedPassToDb(mongo, req.body.userId, req.body.passwordForDecryption, encryptedPasswordData.encryptedData, encryptedPasswordData.iv, encryptedPasswordData.salt)
            res.sendStatus(200)
        } catch (e) {
            console.log(e)
            res.sendStatus(403)
        }
    })

    return APIRouter
}