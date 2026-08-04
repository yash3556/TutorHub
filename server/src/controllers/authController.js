const userSchema = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res)=>{
    try {
        const {fullName,email,phone,password,confirmPassword,role } = req.body;
        if(!fullName || !email || !phone || !password || !confirmPassword || 
            !role){
               return res.status(400).json({
                message:"All field are required",
               });
            }
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"password miss-match",
            });
        }
        if(!email.includes('@')){
            return res.status(400).json({
                message:"Invalid email format",
            });
        }
        if(password.length < 6){
            return res.status(400).json({
                message:"Password must be at least 6 characters long",
            });
        }

        const userExists = await userSchema.findOne({email});
        if(userExists){
            return res.status(400).json({
                message:'user already exists',
            });
        }
         
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new userSchema({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role
        });
        await newUser.save();

        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            message:"User created successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        });
    }
}

exports.login = async (req,res)=>{
    try {
        const {email,password } = req.body;
        if( !email || !password ){
               return res.status(400).json({
                message:"All field are required",
               });
            }

        const userExists = await userSchema.findOne({email});
        if(!userExists){
            return res.status(400).json({
                message:'user not found',
            });
        } 
        const checkUser = await bcrypt.compare(password, userExists.password);
        if(!checkUser){
           return res.status(400).json({
            message:"Invalid credentials",
            });
        }

        const token = jwt.sign({id:userExists._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token,{
            httpOnly:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user:{
                id:userExists._id,
                fullName:userExists.fullName,
                email:userExists.email,
                phone:userExists.phone,
                role:userExists.role,
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        });
    }
}