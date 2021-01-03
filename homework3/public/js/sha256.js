function toSHA256(passwd){
    return CryptoJS.SHA256(passwd).toString()
}