import jwt from "jsonwebtoken"
import authComfig from "../config/auth.config.js"
import db from "../models/index.js";
import VerificationToken from "../models/verificationToken.model.js";
import crypto from "crypto";

const User = db.User;
// const Admin = db.Admin;
// const Teacher = db.Teacher;
// const Judge = db.Judge;
// const VerificationToken = VerificationToken;

//Register 
const signUp = async (req, res) => {
    const {email,password,type,name,school,phone} = req.body;
    try{
        //Check validation request
        if(!email || !password || !type || !name){
            return res.status(400).send({message: "Email, password, type and name are requird !"});
        }
    //Validate user type
    const allowedType = ["admin","teacher","judge"];
        if(allowedType.includes(type)){
            return res
            .status(400)
            .send({ message: "In valid user type. Must be admin,teacher or judge"});
        }
        //Addition validation
        if(type === "teacher" && (school || phone)){
            return res.status(400).send({ message:"school and phone are required for teacher!"});
        }

        //check if user already exists
        const existingUser = await User.findOne({
            where:{
                email:email,
            }
        })
        if(existingUser){
            return res.status(400).send({message:"Email already in use!"})
        }
        //create user object base on type
        const userData = {
            name:name,
            email:email,
            password:password,
            type:type,
        };
        if(type === "teacher"){
            userData.school = school;
            userData.phone = phone;
        }

        //create new user
        const user = await User.create(userData);
        //if user is a teacher, create and send verification email
        if(type === "teacher"){
            try{
                //create verification token
                const token = crypto.randomBytes(32).toString("hex");
                const verification = await db.VerificationToken.create({
                    token:token,
                    userId:user.id,
                    existingUser: new Date(Data.now() + 24 *60*60+1000 ) //24h
                })
            }catch(error){

            }
        }
        res.status(201).send({message : user.type === "teacher" ? "Registration successfully! Please check your email to verify your account" : "User registered successfully!" ,
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                type: user.email,
                ...(user.type === "teacher" && { isVerified: user.isVerified}),
            },
         });
    }catch (error){
        return res.status(500).send({message:error.message || "Some error occurred"})
    }
};