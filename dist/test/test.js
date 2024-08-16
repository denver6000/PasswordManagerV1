"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const DbUtil_1 = require("../util/DbUtil");
const PasswordUtil_1 = require("../util/PasswordUtil");
let mongo = new mongodb_1.MongoClient('mongodb://mongo:27017');
mongo.connect().then((client) => __awaiter(void 0, void 0, void 0, function* () {
    let encryptedPasswordData = (0, PasswordUtil_1.encrypt)("password", "key");
    let decrypted = (0, PasswordUtil_1.decrypt)(encryptedPasswordData.encryptedData, "key", encryptedPasswordData.salt, encryptedPasswordData.iv);
    if (decrypted != "password") {
        throw new Error("Encryption Failed");
    }
    yield (0, DbUtil_1.addEncryptedPassToDb)(mongo, "test", "key", encryptedPasswordData.encryptedData, encryptedPasswordData.iv, encryptedPasswordData.salt);
    console.log(`[Encryption] Success`);
})).catch(error => {
    console.log(error);
});
