import sequelize from "./db.js";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

const User = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isVerified: {
    type: DataTypes.STRING,
    default: false,
    allowNull: false,
  },

},{
  hook:{
    beforeCreate: async (user) => {
      if(user.password){
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password,salt);
      }
    },
    beforeUpdate: async (user)=>{
      if(user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

User.prototype.comparePassword = async function(candidatePsssword){
  return await bcrypt.compare(candidatePsssword, this.password)
}

User.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.error("Error creating table", error);
  });

export default User;
