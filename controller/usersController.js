const user = require("../model/userModel");
const bcrypt = require("bcrypt");
const User = require("../model/userModel");

module.exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    console.log(username);

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ status: false, message: "username already used" });
    }
    const emailChecker = await User.findOne({ email });
    if (emailChecker) {
      return res.json({ status: false, message: "email already used" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;
    return res
      .status(201)
      .json({
        status: true,
        message: "user is created successfully ",
        data: user,
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    console.log(username);

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ status: false, message: "username does not exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const PasswordChecker = bcrypt.compare(hashedPassword, user.password);

    if (!PasswordChecker) {
      return res.json({ status: false, message: "incorrect password" });
    }

    return res
      .status(200)
      .json({ status: true, message: "login successful", data: user });
  } catch (error) {
    console.log(error);
    next(error)
  }
};


module.exports.setAvatar = async (req, res, next) =>{
   
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userdata = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage
        });
        return res.json({isSet:userdata.isAvatarImageSet,image:userdata.avatarImage})
        
    } catch (error) {
        next(error)
    }

}

module.exports.getAllusers = async(req,res,next)=>{
    try {
      const users = await User.find({_id:{$ne:req.params.id}}).select([
        "email",
        "username",
        "avatarImage",
        "_id"
      ]);
      return res.json(users);
      

    } catch (error) {
        next(error); 
    }
};

module.exports.logout = (req,res,next)=>{
  try {
    if(!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id)
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
}