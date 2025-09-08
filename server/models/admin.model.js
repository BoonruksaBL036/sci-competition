import { DataTypes } from "sequelize";
import User from "./user.model.js";

const Admin = User.init(
  {
    scopes: {
      defaultScopes: {
        where: {
          type: "admin",
        },
      },
    },
  },
  {
      hook: {
      beforeCreate: (admin) => {
        admin.type = "admin";
      },
    },
  }
);

export default Admin;
