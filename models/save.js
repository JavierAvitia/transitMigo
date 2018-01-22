module.exports = function(sequelize, DataTypes) {
    var Save = sequelize.define("Save", {
        line: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        station: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        img:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        priority: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });
//
    // const UserEvents = sequelize.define('UserEvents');

    Save.associate = function(models) {
        //console.log(models.User);
        Save.belongsTo(models.User, {
            foreignKey: {
                name: "OwnerId"
            },
            as: "Owner"
        });
        Save.belongsToMany(models.User, {
            through: "UserSaves"
        });
    };

    return Save;
};
