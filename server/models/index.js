import sequelize from "./db.js";
import Sequelize from "sequelize"
import User from "./user.model.js"
import Activity from "./activity.model.js";
import VerificationToken from "./verificationToken.model.js";

const db = {};
// S ตัวเล็ก
db.sequelize = sequelize;
// S ตัวใหญ่
db.Sequelize = Sequelize;


db.User = User;
db.Activity = Activity;

db.VerificationToken = VerificationToken;

// Association
db.VerificationToken.belongsTo(db.User, {foreignkey: "userId"});
db.User.hasMany(db.VerificationToken, {foreignkey: "userId"})

export default db;
