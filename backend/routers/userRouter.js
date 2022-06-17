import express from "express";
import User from "../UserModel.js";

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill all the required field" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
        
      return res.status(400).json({ error: "Email already exists" });
    }
    const user = new User({ name, email, password });
    await user.save();
    res.status(200).json("User registered successfully");
  } catch (err) {
    console.log(err);
  }
});


userRouter.post('/signin', async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password ){
            return res.status(400).json("Plz fill all the details");
        }
        const userLogin = await User.findOne({email: email});
        
        if(userLogin)
        {
            if(req.body.email === userLogin.email && req.body.password === userLogin.password) 
            return res.status(200).json({message:"successfully signed in"});
            else if(req.body.email !== userLogin.email)
           return  res.status(400).json({error: "Invalid credentials"});
           else{
            return  res.status(400).json({error: "Invalid credentials"});
           }
        }
        else{
            return res.status(400).json({error: "User not exist"});
        }
    }catch(err){
        console.log(err);
    }
})

export default userRouter;
