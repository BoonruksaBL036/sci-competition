import { DataTypes } from "sequelize";
import sequelize from "./db.js";

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Role.sync({ force: true })
//   .then(() => {
//     Role.create({ id: 1, roleName: "admin" });
//     Role.create({ id: 2, roleName: "manager" });
//     Role.create({ id: 3, roleName: "teacher" });
//     Role.create({ id: 4, roleName: "judge" });
//     console.log("create role table success");
//   })
//   .catch((error) => {
//     console.error("Error creating table", error);
//   });

export default Role;
