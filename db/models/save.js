const Sequelize = require('sequelize');
const Model = Sequelize.Model;
class Save extends Model {}

module.exports = (sequelize, DataTypes) => {

    Save.init({

        // attributes
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        dataId: {
            type: DataTypes.INTEGER(11).UNSIGNED
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }

    }, {

        sequelize,
        modelName: 'save'
        // options

    });
    
    Save.belongsTo(User);

    return Save;
};
