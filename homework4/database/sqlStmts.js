sqlStmts={
    findUserByPhone : 'select username,phone,password,salt from user where phone = ?',
    insertUser : 'insert into user(username,phone,password,salt) values(?,?,?,?)'
}

module.exports = sqlStmts