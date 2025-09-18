import User from "./user.model.js";

const Judge = User.init(
    {},
  {
    scopes: {
      defaultScopes: {
        where: {
          type: "judge",
        },
      },
    },
  },
  {
    hooks: {
      beforeCreate: (judge) => {
        judge.type = "judge";
      },
    },
  }
);

export default Judge;
