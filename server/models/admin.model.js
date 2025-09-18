import User from "./user.model.js";

const Admin = User.init(
  {},
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
      hooks: {
      beforeCreate: (admin) => {
        admin.type = "admin";
      },
    },
  }
);

export default Admin;
