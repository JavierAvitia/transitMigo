const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class User extends Model {}

module.exports = (sequelize, DataTypes) => {

    User.init({

        // attributes
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        }

    }, {

        sequelize,
        modelName: 'user'
        // options

    });
    
    User.hasMany(Save);

    return User;

};
