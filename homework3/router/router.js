var express = require('express')
var router = express.Router()
var path = require('path');
var query = require('../database/database')
var crypto = require('crypto')
var sqlStmts = require('../database/sqlStmts')

router.get('/signin', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../public', 'SignIn.html'));
    console.log('2');
})

router.get('/signup', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../public', 'SignUp.html'));
    console.log('3');
})

router.get('/index', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../public', 'Index.html'));
    console.log('4');
})

router.get('/detail', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../public', 'Detail.html'));
    console.log('5');
})


router.post('/signin', function (req, res) {
    const phone = req.body.phone
    const password = req.body.password

    const re = /^\d{11}$/
    if (!re.test(phone)) {
        alert("不是正确的电话号码")
        return
    }

    query(sqlStmts.findUserByPhone, [phone,], function (err, result) {
        if (result.length !== 0) {
            const hash = crypto.createHash('sha256');// sha256
            const salt = result[0].salt;
            const re_encrypt_passwd = hash.update(salt + password).digest('hex');
            if (result[0].password !== re_encrypt_passwd) {
                res.send({success: false, msg: "密码错误"})
                return
            }
            res.send({success: true, msg: null})
        } else {
            res.send({success: false, msg: "账号未注册"})
        }
    })
})


router.post('/signup', function (req, res) {
    const username = req.body.username
    const phone = req.body.phone
    const password = req.body.password
    const password1 = req.body.password1

    query(sqlStmts.findUserByPhone, [phone,], function (err, result) {
        if (result.length === 0) {
            const salt = randomString(10, 20);
            const hash = crypto.createHash('sha256');
            const re_encrypt_passwd = hash.update(salt + password).digest('hex');
            const params = [username, phone, re_encrypt_passwd, salt];
            query(sqlStmts.insertUser, params, function (err, result) {
                res.send({success: true, msg: null})
            })
        } else {
            res.send({success: false, msg: "此账号已注册"})
        }
    })
})

function randomString(min, max) {
    let str = "",
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
            'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
            'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let range = Math.round(Math.random() * (max - min)) + min;
    let pos;
    for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

module.exports = router;