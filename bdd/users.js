var connection = require('./connexion')
var bcrypt = require('bcryptjs')

class Users {

    constructor(mail, password, username, firstname, lastname) {
        this.mail = mail
        this.password = password
        this.username = username
        this.firstname = firstname
        this.lastname = lastname
    }
    
    getMail(){
        return this.mail
    }

    getPassword(){
        return this.password
    }

    getJson(){
        var struct = '{"email": "'+ this.mail +'", "userName": "'+ this.username +'", "firstName": "'+ this.firstname +'", "lastName": "'+ this.lastname +'"}';
        return struct;
    }

    search (cb) {
        connection.query('SELECT * FROM user WHERE email = ? limit 1',[this.mail], (err, result) => {
            if(err) {
                throw err
            }
            cb(result)
        })
    }
    
    create (cb) {
        this.password = bcrypt.hashSync(this.password, 10)
        connection.query('INSERT INTO user SET email = ?, password = ?, firstName = ?, lastName = ?, userName = ?',[this.mail, this.password, this.firstname, this.lastname, this.username], (err, result) => {
            if(err) {
                throw err
            }
            cb(result)
        })
    }

    searchAll (cb) {
        connection.query('SELECT * FROM user', (err, rows) => {
            if(err) throw err
            cb(rows)
        })
    }
    
    delete (cb){
        connection.query('DELETE FROM user WHERE email = ?' ,[this.mail], (err, result) => {
            if(err) {
                throw err
            }
            cb(result)
        })
    }

    Update (cb){
        this.password = bcrypt.hashSync(this.password, 10)
        connection.query('UPDATE user SET password = ? WHERE email = ?' ,[this.password, this.mail], (err, result) => {
            if(err) {
                throw err
            }
            cb(result)
        })
    }

}

module.exports = Users