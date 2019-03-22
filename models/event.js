module.exports = function(sequelize, DataTypes) {
    //CREATE USER ONLY IF NAME IS NOT EMAIL && ALL FIELDS FILLED
    var Event = sequelize.define("Event", {
        venue: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // isAlphanumeric: true
            }
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // isAlphanumeric: true
            }
        },
        // date: {
        //     type: DataTypes.DATE,
        //     allowNull: false
        // },
        date: { // UPDATE TO DATETIME
            type: DataTypes.STRING,
            // allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // isAlphanumeric: true
            }
        },
        distance: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // isAlphanumeric: true
            }
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // isAlphanumeric: true
            }
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // isAlphanumeric: true
            }
        }
    });

    // const UserBoards = sequelize.define('UserBoards');

    //LINK USER TO LIST (USER HAS MANY LISTs) COMPLETELY BROKEN RIGHT NOW
    // Event.associate = function(models) {
    //     Event.hasMany(models.TimeSheet, {
    //         onDelete: "cascade",
    //         foreignKey: {
    //             name: "OwnerId"
    //         }
    //     });
    //     Event.belongsToMany(models.Task, {
    //         through: "EventTasks"
    //     });
    //     Event.belongsToMany(models.Save, {
    //         through: "EventSaves"
    //     });
    // };

    return Event;

};
