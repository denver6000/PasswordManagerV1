import mongo, {MongoClient, ObjectId} from "mongodb"

export let addEncryptedPassToDb = async function (mongo: MongoClient, userId: string, password: string, encryptedString: string,  iv: string, salt: string ): Promise<boolean> {
    return new Promise(async (res, rej) => {
        try {
            await mongo.db("saved-pass").collection("passwords").insertOne({
                userId: userId, password: password, encryptedString: encryptedString, iv: iv, salt: salt
            })
            res(true)
        } catch (e) {
            rej(e)
        }
    })
}

export let getEncryptedDataByUserID = async function (mongo: MongoClient, userId: string): Promise<boolean> {
    return new Promise(async (res, rej) => {
        try {
            let result = await mongo.db("saved-pass").collection("passwords").findOne({userId: userId})
            console.log(result)
            res(true)
        } catch (e) {
            rej(e)
        }
    })
}


