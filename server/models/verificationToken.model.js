import {DataTypes} from "sequelize"
import sequelize from "./db.js"

const VerificationToken = sequelize.define("verificationToken", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    token:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        referenc: {
            model: "user",
            key: "id",
        }
    },
    expiesAt:{
        type:DataTypes.DATE,
        allowNull:false
    }
});

export default VerificationToken;