import crypto from "crypto"
const algorithm = 'aes-256-cbc';
const ivLength = 16; // 16 bytes for AES

function getKeyFromPassword(password: string, salt: Buffer) {
    return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}

export function encrypt(passToEncrypt: string, passForDecryption: string) {
    const salt = crypto.randomBytes(16); 
    const key = getKeyFromPassword(passForDecryption, salt);
    const iv = crypto.randomBytes(ivLength);
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(passToEncrypt, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        salt: salt.toString('hex'),
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}

export function decrypt(encryptedText: string, password: string, saltHex: string, ivHex: string) {
    const salt = Buffer.from(saltHex, 'hex');
    const iv = Buffer.from(ivHex, 'hex');
    const key = getKeyFromPassword(password, salt);

    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}

