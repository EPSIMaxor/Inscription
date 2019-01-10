var express = require('express');
var router = express.Router();
var Users = require('../bdd/Users.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(404).send(JSON.parse('{"error": "Not found !"}'))
});

router.post('/', function(req, res, next) {
    console.log(req.body)
    var user = new Users(req.body.email)
    user.search(function(us){
        if(us.length == 0) {
            return res.status(401).send(JSON.parse('{"erreur" : "Aucun utilisateur existe avec cet email"}'))
        } else {
            var result = JSON.parse(JSON.stringify(us))
            var user = new Users(result[0].email, result[0].password, result[0].userName, result[0].firstName, result[0].lastName)
            return res.send(user)
        }
    })

})

module.exports = router;