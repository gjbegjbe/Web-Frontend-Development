const express = require('express')
const main = express()
const port = 3000

var router = require('./router/router')
var bodyParser = require('body-parser')

main.use(bodyParser.urlencoded({extended: false}));

main.use(bodyParser.json());

main.use(express.static('public'))

main.use('/', router)

main.listen(port, () => console.log(`登录界面为 http://127.0.0.1:3000/signin`))