var express = require('express');
var router = express.Router();
var Users = require('../bdd/Users.js')
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(404).send(JSON.parse('{"error": "Not found !"}'))
});

router.post('/', function(req, res, next) {
    console.log(req.body)
    var user = new Users(req.body.user.email, req.body.user.password, req.body.user.username, req.body.user.firstName, req.body.user.lastName)

    user.search(function(us) {
        if(us.length == 1) {
            console.log(us)
            return res.status(401).send(JSON.parse('{"erreur" : "Un utilisateur existe déjà avec cet email"}'))
        } else {
            user.create(function (us){
                request.post({
                    headers: {'content-type' : 'application/json'},
                    url:     'http://localhost:3020/auth',
                    body:    '{"email": "'+ req.body.user.email +'", "password": "'+ req.body.user.password +'"}'},
                    function(error, response, body){
                        var token = JSON.parse(body)
                        console.log("l'utilisateur : " + user.getMail() + " à bien été créer !")
                        return res.send(JSON.parse('{"success" : "'+ true +'", "token": "'+ token.token +'"}'))
                    }
                )
            })    
        }
    })

})

module.exports = router;
