var bcrypt = require("bcryptjs");

var db = require("../../models");

module.exports = {
//Get all saves or just one by ?id="X" query
    getSaves: function(req, res) {
        var query = {};
        if (req.query.id) {
            query.id = req.query.id;
        } else {
            query.OwnerId = req.cookies.userId;
        }

        db.Save.findAll({
            where: query,
            include: {
                    model: db.User,
                    as: "Users"
                }
        }).then(function(dbSaves) {
            res.json(dbSaves);
        });

    },
//Create new save using posted data and cookies
    createSave: function(req, res) {
        var userId = req.cookies.userId;
        req.body.OwnerId = userId;

        db.User.findById(userId).then(function(dbUser){
            db.Save.create(req.body).then(function(dbSave) {
                dbUser.addSave(dbSave);
                res.json(dbSave);
            });
        });        
    },
//Update an existing save with /:id params using passed req.body
    updateSave: function(req, res) {
        db.Save.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            }
        ).then(function(dbSaves) {
            res.json(dbSaves);
        });
    },
//Delete an existing save with /:id params
    deleteSave: function(req, res) {
        db.Save.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbSave) {
            res.json(dbSave);
        });
    }
}