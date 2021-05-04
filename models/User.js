const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//CREATE USER MODEL
class User extends Model {}

//DEFINE TABLE COLUMNS AND CONFIGS
User.init(
    {
        // TABLE COLUMN DEFINITIONS GO HERE
        //define an id coulumn
        id: {
            //use the special Sequelize DataTytpes object provide what type of data it is
            type: DataTypes.INTEGER,
            //this is equivalent to SQL's 'NOT NULL' option
            allowNull: false,
            //instruct that this is the primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there can't be any duplicate email values
            unique: true,
            // if allowNull is set to false, we can run our data through a validator before creating the table data
            validate: {
                isEmail: true
            }
        },
        //define a password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //this means the password must be at least four characters long
                len: [4]
            }
        }
    },
    {
        // TABLE CONFIG OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        // PASS IN OUR IMPORTED SEQUELIZE CONNECTION (THE DIRECT CONNECTION TO DB)
        sequelize,
        //DONT AUTOMATICALLY CREATE CREATEDAT/UPDATEDAT TIMESTAMP FIELDS
        timestamps: false,
        // DONT PLURALIZE NAME OF DB TABLE
        freezeTableName: true,
        // USE UNDERSCORES INSTEAD OF CAMEL-CASING (I.E. 'COMMENT_TEXT)
        underscored: true,
        //MAKE IT SO OUR MODEL NAME STAYS LOWERCASE IN THE DB
        modelName: 'user'
    }
);

module.exports = User;