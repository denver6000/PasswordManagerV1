"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const algorithm = 'aes-256-cbc';
const ivLength = 16; // 16 bytes for AES
function getKeyFromPassword(password, salt) {
    return crypto_1.default.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}
function encrypt(passToEncrypt, passForDecryption) {
    const salt = crypto_1.default.randomBytes(16);
    const key = getKeyFromPassword(passForDecryption, salt);
    const iv = crypto_1.default.randomBytes(ivLength);
    const cipher = crypto_1.default.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(passToEncrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        salt: salt.toString('hex'),
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}
function decrypt(encryptedText, password, saltHex, ivHex) {
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const key = getKeyFromPassword(password, salt);
    const decipher = crypto_1.default.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
