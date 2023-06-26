require('dotenv').config()
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer');
const randonString = require('randomstring');

//REGISTER
const registerC = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};

//LOGIN

const loginC = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};

// forget password

const passwordToMail = async (name,email,token)=>{

  try {
    const tanspoter = nodeMailer.createTransport({
      host:"sobuz6666@gmail.com",
      port:3000,
      secure:false,
      requireTLS:true,
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
      }
    });

    const mailOption = {
      from:process.env.EMAIL_USER,
      to:email,
      subject:"for reset your password",
      html:"<p>hi "+name+"this is for you copy the link & reset your password <a href='http://localhost:3002/api/user/maileSended?token"+token+"'></a> now </p>"
    };

    tanspoter.sendMail(mailOption, function (err,info) {

      if (err) {
        console.log(err)
      } else {
        console.log("mail has send" + info.response)
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during email sending.' })
  }
};

const passwordForget = async (req, res) => {
  try {

    const email = req.body.email

  const user =  await User.findOne({email:email});

  if (user) {

  const ransdomstring  =   randonString.generate();

  const data = await User.updateOne({email:email},{$set:{token:ransdomstring}});

  passwordToMail(user.username, user.email, ransdomstring);

  res.status(200).json({ error: "check your email inbox" });


    
  } else {
    res.status(200).json({ error: "this email dosn't exist" })
  }
    
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during email sending.' })
  }
};


// reset password

const passwordReset = async (req, res) => {

try {

  const token = req.query.token;

  const data = await User.findOne({token:token});

  if (data) {

    const password = req.body.password;
    const newPassword = await bcrypt.hash(password, 10);

  const userData =  User.findByIdAndUpdate({_id:data._id},{$set:{password:newPassword,token:""}},{new:true})
  res.status(200).json({ error: 'you password updated', data:userData })
  } else {
    res.status(200).json({ error: 'you have recive worng token' })
  }
  
} catch (error) {

  res.status(500).json({ error: 'An error occurred during token reciving.' })

}
};


// social login sucesss

const success = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
};


// social login failer

const failed = (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
};

const logoutC = (req, res) => {
  // Clear any session data or tokens here
  res.json({ message: 'User logged out successfully.' });
};

module.exports = {registerC,loginC,logoutC,passwordForget,passwordReset, success,failed};