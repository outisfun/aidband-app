import sha512 from "crypto-js/sha512";

export class Hasher {
    createHash(text, salt) {
        return sha512(text + salt);
    }
}