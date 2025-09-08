import sequelize from "./db.js";
import Sequelize from "sequelize"
import User from "./user.model.js"
import Activity from "./activity.model.js";
import Judge from "./judge.model.js";
import Admin from "./admin.model.js";
import Teacher from "./teacher.model.js";
import VerificationToken from "./verificationToken.model.js";

const db = {};
// S ตัวเล็ก
db.sequelize = sequelize;
// S ตัวใหญ่
db.Sequelize = Sequelize;


db.User = User;
db.Activity = Activity;
db.Admin = Admin;
db.Judge = Judge;
db.Teacher = Teacher;
db.VerificationToken = VerificationToken;

// Association
db.VerificationToken.belongTo(db.User, {foreignkey: "userId"});
db.User.belongTo(db.VerificationToken, {foreignkey: "userId"})

export default db;
