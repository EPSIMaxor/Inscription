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

    user.search(function(us) {
        if(us.length == 0) {
            console.log(us)
            return res.status(401).send(JSON.parse('{"erreur" : "Aucun utilisateur existe avec cet email"}'))
        } else {
            user.delete(function (us){
                console.log("l'utilisateur : " + user.getMail() + " à bien été suprimmer !")
                return res.send(JSON.parse('{"success" : "l\'utilisateur à bien été suprimmer !"}'))
            })  
        }  
    })

})

module.exports = router;