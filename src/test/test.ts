import { MongoClient } from "mongodb"
import {addEncryptedPassToDb} from "../util/DbUtil"
import {decrypt, encrypt} from "../util/PasswordUtil"

let mongo = new MongoClient('mongodb://mongo:27017')

mongo.connect().then(async client => {
    let encryptedPasswordData: {salt: string, iv: string, encryptedData: string} = encrypt("password", "key")
    let decrypted = decrypt(encryptedPasswordData.encryptedData, "key", encryptedPasswordData.salt, encryptedPasswordData.iv)
    if (decrypted != "password") {
        throw new Error("Encryption Failed")
    } 

    await addEncryptedPassToDb(mongo, "test", "key", encryptedPasswordData.encryptedData, encryptedPasswordData.iv, encryptedPasswordData.salt)
    console.log(`[Encryption] Success`)
}).catch(error => {
    console.log(error)
})